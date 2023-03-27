import { Router } from "express";
import { Stripe } from "stripe";
import dotenv from "dotenv";
import { isValidArgument, stripeCatchError } from "../error_check.js";

export const pricesRouter = Router();
dotenv.config();

// Stripe API key
const publicSampleTestKey = "sk_test_Hrs6SAopgFPF0bZXSN3f6ELN";
const stripe = Stripe(process.env.STRIPE_API_KEY || publicSampleTestKey, {
  stripeAccount: process.env.STRIPE_ACCOUNT_ID || null,
});

// Round to 2 decimal places
const roundNum = (num, digits, base) => {
  var pow = Math.pow(base || 10, digits);
  return Math.round(num * pow) / pow;
};

const calculateTax = (price, taxRate) => {
  if (!price || !taxRate) return;
  return (price * taxRate) / 100;
};

/**
 * Create a price for a membership in Stripe.
 * */
pricesRouter.post("/", async (req, res) => {
  const reqBody = req.body;
  // Check validity of arguments
  if (
    !isValidArgument(reqBody.currency, "string") ||
    !isValidArgument(reqBody.membershipName, "string") ||
    !isValidArgument(reqBody.price, "number")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  const taxPrice = calculateTax(reqBody.price, 12.5);
  try {
    // Create a price
    // TODO: For recurring, think about year interval as well
    const price = await stripe.prices.create({
      product_data: {
        name: reqBody.membershipName,
      },
      currency: reqBody.currency,
      unit_amount_decimal: roundNum(taxPrice, 2),
      recurring: { interval: "month" },
    });
    return res.status(200).json({ price });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Retrieve all prices from Stripe.
 * */
pricesRouter.get("/", async (req, res) => {
  try {
    const prices = await stripe.prices.list();
    if (prices === null || prices === undefined)
      return res.status(404).json({ error: "Prices don't exist." });
    return res.status(200).json({ prices });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Retrieve a price from Stripe, using priceId.
 * */
pricesRouter.get("/:priceId/", async (req, res) => {
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

/**
 * Update attributes of a price.
 * */
pricesRouter.patch("/:priceId/", async (req, res) => {
  const priceId = req.params.priceId;
  const variables = req.body.variables;
  // Check validity of arugments
  if (
    !isValidArgument(priceId, "string") ||
    !isValidArgument(variables, "object")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Update a price
    const price = await stripe.prices.update(priceId, variables);
    if (!price) return res.status(404).json({ error: "Price doesn't exist." });
    return res.status(200).json({ price });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Delete a price from Stripe.
 * */
pricesRouter.delete("/:priceId/", async (req, res) => {
  const priceId = req.params.priceId;
  // Check validity of priceId
  if (!isValidArgument(priceId, "string"))
    return res.status(422).json({ error: "Invalid priceId." });
  try {
    // Delete a price
    const price = await stripe.prices.delete(priceId);
    return res.status(200).json();
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});
