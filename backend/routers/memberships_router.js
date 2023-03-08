import { Router } from "express";
import { Stripe } from "stripe";
import dotenv from "dotenv";
import { isValidArgument, stripeCatchError } from "../error_check.js";

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
  const defaultPrice = reqBody.default_price_data;
  // Check validity of arguments
  if (
    !isValidArgument(reqBody.name, "string") ||
    !isValidArgument(reqBody.decription, "string") ||
    !isValidArgument(defaultPrice, "Object") ||
    !isValidArgument(reqBody.creatorId, "string") ||
    !isValidArgument(defaultPrice.currency, "string") ||
    !isValidArgument(defaultPrice.unit_amount_decimal, "number")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
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
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Retrieve all memberships.
 * */
membershipsRouter.get("/", async (req, res) => {
  try {
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
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Retrieve one membership using membershipId.
 * */
membershipsRouter.get("/:membershipId", async (req, res, next) => {
  const membershipId = req.params.membershipId;
  if (membershipId === "prices") return next();
  // Check validity of membershipId
  if (!isValidArgument(membershipId, "string"))
    return res.status(422).json({ error: "Invalid membershipId." });
  try {
    const membership = await stripe.products.retrieve(membershipId);
    if (!membership)
      return res.status(404).json({ error: "Membership not found" });
    return res.status(200).json({ membership });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Update attributes of a membership.
 * */
membershipsRouter.patch("/:membershipId", async (req, res) => {
  const membershipId = req.params.membershipId;
  const defaultPrice = req.params.defaultPrice;
  // Check validity of params
  if (
    !isValidArgument(membershipId, "string") ||
    !isValidArgument(defaultPrice, "string")
  )
    return res.status(422).json({ error: "Invalid params." });
  const update = { defaultPrice };
  // Update
  try {
    const product = await stripe.products.update(membershipId, update);
    if (!product)
      return res.status(404).json({ error: "Membership not found" });
    return res.status(200).json({ product });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Create a price for a membership.
 * */
membershipsRouter.post("/prices", async (req, res) => {
  const reqBody = req.body;
  // Check validity of arguments
  if (
    !isValidArgument(reqBody.currency, "string") ||
    !isValidArgument(reqBody.product, "string") ||
    !isValidArgument(reqBody.unit_amount_decimal, "number")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Create a price
    const price = await stripe.prices.create({
      currency: reqBody.currency,
      product: reqBody.product,
      unit_amount_decimal: reqBody.unit_amount_decimal.toFixed(2),
      recurring: { interval: "month" },
    });
    return res.status(200).json({ price });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Retrieve all prices.
 * */
membershipsRouter.get("/prices", async (req, res) => {
  try {
    const prices = await stripe.prices.list();
    if (prices === null || prices === undefined)
      return res.status(404).json({ error: "Prices not found" });
    return res.status(200).json({ prices });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Retrieve one price using priceId.
 * */
membershipsRouter.get("/prices/:priceId", async (req, res) => {
  const priceId = req.params.priceId;
  // Check validity of priceId
  if (!isValidArgument(priceId, "string"))
    return res.status(422).json({ error: "Invalid priceId." });
  // Retrieve a price
  try {
    const price = await stripe.prices.retrieve(priceId);
    if (price === null || price === undefined)
      return res.status(404).json({ error: "Price not found" });
    return res.status(200).json({ price });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});
