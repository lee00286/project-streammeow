import React, { useEffect, useState } from "react";
import module from "../../../ApiService";
import Alert from "../../Alert/Alert";
// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Configure the Stripe library with publishable API key
const publicSampleTestAPIKey = "pk_test_A7jK4iCYHL045qgjjfzAfPxu";
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_API_KEY || publicSampleTestAPIKey
);

/**
 * Payment component that allows paying for a membership.
 * @param {number} totalCost: total cost to pay
 * @param {string} currency: currency of the cost
 * @returns Payment component
 */
function Payment({ totalCost, currency }) {
  const [ClientSecret, setClientSecret] = useState(null);
  const [ErrorLog, setErrorLog] = useState("");

  useEffect(() => {
    if (!totalCost || !currency) return;
    // Create a new PaymentIntent
    module
      .addPaymentIntent(totalCost, currency)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
  }, [totalCost, currency]);

  // Customize the appearance of the payment form
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#c7530f",
      colorBackground: "#fff",
      colorText: "#000",
    },
  };

  // Pass the client secret obtained from the PaymentIntent
  const options = {
    clientSecret: ClientSecret,
    appearance: appearance,
  };

  return (
    <div>
      <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
      {ClientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
