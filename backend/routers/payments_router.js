import express, { Router } from "express";
import { Stripe } from "stripe";
import dotenv from "dotenv";

export const paymentsRouter = Router();
dotenv.config();

// Stripe API key
const publicSampleTestKey = "sk_test_Hrs6SAopgFPF0bZXSN3f6ELN";
const stripe = Stripe(process.env.STRIPE_API_KEY || publicSampleTestKey, {
  stripeAccount: process.env.STRIPE_ACCOUNT_ID || null,
});
// Endpoint's unique secret
const endpointSecret =
  process.env.STRIPE_ENDPOINT_SECRET ||
  process.env.STRIPE_ENDPOINT_SECRET_CLI ||
  null;

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

paymentsRouter.post("/checkout-session", async (req, res) => {
  // Get price from lookup_key (which will be creatorId)
  const prices = await stripe.prices.list({
    // lookup_keys: [req.body.lookupKey],
    expand: ["data.product"],
  });
  const priceData = prices.data;
  if (priceData && priceData.length > 0) {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: priceData[0].id,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      // metadata: { user_id: userId },
      // subscription_data: {
      //   metadata: { user_id: current_user.id },
      // },
      success_url: `http://localhost:3000/purchase/confirm?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/purchase/confirm?canceled=true`,
    });
    // console.log(session);
    return res.redirect(303, session.url);
    // return res.status(200).json({ url: session.url });
  }
  res.send();
});

/**
 * Create a customer portal session.
 * Customers can manage their subscriptions and billing details.
 */
paymentsRouter.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = "http://localhost:3000/purchase/confirm";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
});

/**
 * Receives requests from Stripe.
 * Notifies if the payment was successful.
 */
paymentsRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;
    console.log(event);
    // Verify the event if endpoint secret is defined
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        // Event object
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
      }
    } // Otherwise, use the basic event

    // Handle the event
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case "customer.subscription.trial_will_end":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "customer.subscription.deleted":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case "customer.subscription.updated":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    return response.status(200);
  }
);
