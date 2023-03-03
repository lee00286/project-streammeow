import { Router } from "express";
import { Stripe } from "stripe";
import dotenv from "dotenv";

export const paymentsRouter = Router();
dotenv.config();

// Stripe API key
const publicSampleTestKey = "sk_test_Hrs6SAopgFPF0bZXSN3f6ELN";
const stripe = Stripe(process.env.STRIPE_API_KEY || publicSampleTestKey, {
  stripeAccount: process.env.STRIPE_ACCOUNT_ID || null,
});

// Calculate the order total on the server
// to prevent people from directly manipulating the amount on the client
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  return 1400;
};

/**
 * Create a PaymentIntent.
 * One PaymentIntent is created for each order or customer session.
 * */
paymentsRouter.post("/paymentintent", async (req, res) => {
  const { items } = req.body;
  // if any of the arguments is missing, return an error
  if (items === undefined) {
    return res.status(422).json({ error: "Invalid arguments" });
  }

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "cad", // "usd"
      payment_method_types: ["card"],
      // automatic_payment_methods: {
      //   enabled: true, // Enable cards and other common payment methods
      // },
    });
    // Finish the payment
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    switch (e.type) {
      case "StripeCardError":
        console.log(`A payment error occurred: ${e.message}`);
        break;
      case "StripeInvalidRequestError":
        console.log("An invalid request occurred.");
        break;
      default:
        console.log("Another problem occurred, maybe unrelated to Stripe.");
        break;
    }
  }
});
