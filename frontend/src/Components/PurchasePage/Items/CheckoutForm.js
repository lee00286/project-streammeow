import React, { useEffect, useState } from "react";
// Stripe
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

function CheckOutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [Message, setMessage] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) return;

    // Show a pyament status message
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  // Set the payment method via tabs
  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Stripe.js has not yet loaded
    if (!stripe || !elements) return;

    // Process the payment
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "/" }, // redirected after the payment
    });

    // If there is an immediate error when confirming the payment
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    // Payment finished
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={IsLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {IsLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Subscribe"
          )}
        </span>
      </button>
    </form>
  );
}

export default CheckOutForm;
