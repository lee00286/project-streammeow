import React, { useEffect, useState } from "react";
import Alert from "../../Alert/Alert";
// Stripe
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

// Client URL
const CLIENT_HOST = process.env.REACT_APP_CLIENT_HOST || "localhost:3000";

/**
 * CheckOutForm component.
 * @returns CheckOutForm component
 */
function CheckOutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [ErrorLog, setErrorLog] = useState("");
  const [IsError, setIsError] = useState(true);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) return;

    // Show a payment status message
    stripe.retrievePaymentIntent(clientSecret).then((res) => {
      // If error occurs
      if (res.error) return setErrorLog(res.error.message);
      // paymentIntent is retrieved
      const paymentIntent = res.paymentIntent;
      switch (paymentIntent.status) {
        case "succeeded":
          setErrorLog("Payment succeeded!");
          setIsError(false);
          break;
        case "processing":
          setErrorLog("Your payment is processing.");
          setIsError(false);
          break;
        case "requires_payment_method":
          setErrorLog("Your payment was not successful, please try again.");
          break;
        default:
          setErrorLog("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  // Set the payment method via tabs
  const paymentElementOptions = {
    layout: "tabs",
  };

  // Checkout payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Stripe.js has not yet loaded
    if (!stripe || !elements) return;

    // Process the payment
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://${CLIENT_HOST}/purchase/confirm`, // redirected after the payment
        receipt_email: Email, // stripe only sends in live mode
      },
    });

    // If there is an immediate error when confirming the payment
    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorLog(error.message);
    } else {
      setErrorLog("An unexpected error occurred.");
    }

    // Payment finished
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Alert
        text={ErrorLog}
        isError={IsError}
        isSuccess={!IsError}
        hide={ErrorLog === ""}
      />
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e?.target?.value ?? "")}
      />
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
