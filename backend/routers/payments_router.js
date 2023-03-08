import express, { Router } from "express";
import { Stripe } from "stripe";
import dotenv from "dotenv";
import { isValidArgument, stripeCatchError } from "../error_check.js";

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

/**
 * Calculate the order total on the server
 * to prevent people from directly manipulating the amount on the client.
 * @param {number} totalCost: total cost of the order
 */
const calculateOrderAmount = (totalCost) => {
  // TODO: Replace this constant with a calculation of the order's amount
  return 1400;
};

/**
 * Summarize invoice data to send to the client.
 * @param {Object} invoice: invoice of the payment
 */
const summarizeInvoice = (invoice) => {
  if (invoice === undefined) return;
  const newInvoice = {
    invoiceNum: invoice.number,
    receiptNum: invoice.receipt_number,
    currency: invoice.currency,
    customer: invoice.customer,
    customerInfo: {
      account: invoice.account_name,
      name: invoice.customer_name,
      address: invoice.customer_address,
      email: invoice.customer_email,
      phone: invoice.customer_phone,
    },
    payment: {
      collectionMethod: invoice.collection_method,
      amountDue: invoice.amount_due,
      amountPaid: invoice.amount_paid,
      amountRemaining: invoice.amount_remaining,
      balance: invoice.ending_balance,
      attemptCount: invoice.attempt_count,
      billingReason: invoice.billing_reason,
      dateFinalized: invoice.status_transitions.finalized_at,
      datePaid: invoice.status_transitions.paid_at,
    },
    subscription: invoice.subscription,
    invoicePDF: invoice.invoice_pdf,
  };
  return newInvoice;
};

/**
 * Create a PaymentIntent.
 * One PaymentIntent is created for each order or customer session.
 * */
paymentsRouter.post("/payment-intent", async (req, res) => {
  const reqBody = req.body;
  // Check validity of argument
  if (
    !isValidArgument(reqBody.totalCost, "number") ||
    !isValidArgument(reqBody.currency, "string")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(reqBody.totalCost),
      currency: reqBody.currency,
      payment_method_types: ["card"],
    });
    // Finish the payment
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Checkout current session.
 */
paymentsRouter.post("/checkout-session", async (req, res) => {
  const priceId = req.body.priceId;
  // Check validity of argument
  if (!isValidArgument(priceId, "string"))
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      // metadata: { user_id: req.body.userId },
      // subscription_data: {
      //   metadata: { user_id: current_user.id },
      // },
      success_url: `http://localhost:3000/purchase/confirm?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/purchase/confirm?canceled=true`,
    });
    return res.status(200).json({ url: session.url });
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});

/**
 * Get a session by sessionId.
 */
paymentsRouter.get("/session/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  // Check validity of sessionId
  if (!isValidArgument(sessionId, "string"))
    return res.status(422).json({ error: "Invalid sessionId." });
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (!session) return res.status(404).send("Session not found");
  return res.status(200).json(session);
});

/**
 * Create a customer portal session.
 * Customers can manage their subscriptions and billing details.
 */
paymentsRouter.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  // Check validity of sessionId
  if (!isValidArgument(session_id, "string"))
    return res.status(422).json({ error: "Invalid sessionId." });
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // URL where the customer will be redirected after the payment
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
  (req, res) => {
    let event = req.body;
    // Verify the event if endpoint secret is defined
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers["stripe-signature"];
      try {
        // Event object
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
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
    return res.status(200);
  }
);

/**
 * Summarize the payment method details and get invoice.
 */
paymentsRouter.post("/summarize", async (req, res) => {
  const invoiceId = req.body.invoiceId;
  // Check validity of invoiceId
  if (!isValidArgument(invoiceId, "string"))
    return res.status(422).json({ error: "Invalid invoiceId." });
  try {
    // Retrieve invoice
    const invoice = await stripe.invoices.retrieve(invoiceId);
    // Send the response to the client
    res.status(200).json(summarizeInvoice(invoice));
  } catch (e) {
    const errorMsg = stripeCatchError(e);
    console.log(errorMsg);
  }
});
