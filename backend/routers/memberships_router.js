import { Router } from "express";
import { Stripe } from "stripe";
import dotenv from "dotenv";

export const membershipsRouter = Router();
dotenv.config();

// Stripe API key
const publicSampleTestKey = "sk_test_Hrs6SAopgFPF0bZXSN3f6ELN";
const stripe = Stripe(process.env.STRIPE_API_KEY || publicSampleTestKey, {
  stripeAccount: process.env.STRIPE_ACCOUNT_ID || null,
});

/**
 * Create a membership.
 * */
membershipsRouter.post("/", async (req, res) => {
  const reqBody = req.body;
  if (
    !reqBody?.name ||
    !reqBody.description ||
    !reqBody.default_price_data ||
    !reqBody.creatorId
  )
    return res.status(422).json({ error: "Invalid arguments" });
  const defaultPrice = reqBody.default_price_data;
  if (!defaultPrice.currency || !defaultPrice.unit_amount_decimal)
    return res.status(422).json({ error: "Invalid arguments" });
  // Create a new membership
  const membership = await stripe.products.create({
    name: reqBody.name,
    description: reqBody.description,
    default_price_data: {
      currency: defaultPrice.currency,
      unit_amount_decimal: defaultPrice.unit_amount_decimal,
    },
    metadata: {
      creatorId: reqBody.creatorId,
      // TODO: Save tier level (i.e. reqBody.tierLevel)
    },
  });
  return res.status(200).json({ membership });
});

/**
 * Retrieve all memberships.
 * */
membershipsRouter.get("/", async (req, res) => {
  const memberships = await stripe.products.list();
  if (!memberships?.data)
    return res.status(404).json({ error: "Failed to load memberships." });
  // Get creator's memberships
  const { creatorId } = req.query;
  if (creatorId) {
    // TODO: pass `ids` parameter after user model is constructed
    //       (user can save ids of memberships)

    // Get memberships with creatorId
    let creatorMemberships = memberships.data.filter(
      (membership) =>
        membership?.metadata?.creatorId &&
        membership.metadata.creatorId === creatorId
    );

    // TODO: Sort memberships by tier level

    return res.status(200).json({ memberships: creatorMemberships });
  }
  // Get all existing memberships
  return res.status(200).json({ memberships: memberships.data });
});

/**
 * Retrieve one membership using membershipId.
 * */
membershipsRouter.get("/:membershipId", async (req, res, next) => {
  const membershipId = req.params.membershipId;
  if (!membershipId)
    return res.status(422).json({ error: "Invalid membershipId" });
  else if (membershipId === "prices") return next();
  const membership = await stripe.products.retrieve(membershipId);
  if (!membership)
    return res.status(404).json({ error: "Membership not found" });
  return res.status(200).json({ membership });
});

/**
 * Create a price for a membership.
 * */
membershipsRouter.post("/prices", async (req, res) => {
  const reqBody = req.body;
  if (!reqBody?.currency || !reqBody.product || !reqBody.unit_amount_decimal)
    return res.status(422).json({ error: "Invalid arguments" });
  // Create a price
  const price = await stripe.prices.create({
    currency: reqBody.currency,
    product: reqBody.product,
    unit_amount_decimal: reqBody.unit_amount_decimal,
    recurring: { interval: "month" },
  });
  return res.status(200).json({ price });
});

/**
 * Retrieve all prices.
 * */
membershipsRouter.get("/prices", async (req, res) => {
  const prices = await stripe.prices.list();
  console.log(prices);

  if (prices === null)
    return res.status(404).json({ error: "Prices not found" });
  console.log(prices);
  return res.status(200).json({ prices });
});

/**
 * Retrieve one price using priceId.
 * */
membershipsRouter.get("/prices/:priceId", async (req, res) => {
  const priceId = req.params.priceId;
  if (!priceId) return res.status(422).json({ error: "Invalid priceId" });
  const price = await stripe.prices.retrieve(priceId);
  if (!price) return res.status(404).json({ error: "Price not found" });
  return res.status(200).json({ price });
});
