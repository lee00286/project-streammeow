import React, { useEffect, useState } from "react";
import axios from "axios";
// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Configure the Stripe library with publishable API key
const publicSampleTestAPIKey = "pk_test_A7jK4iCYHL045qgjjfzAfPxu";
const stripePromise = loadStripe(
  process.env.STRIPE_API_KEY || publicSampleTestAPIKey
);

function Payment() {
  const [ClientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const reqBody = { items: [{ id: "xl-tshirt" }] };
    // Create a new PaymentIntent
    axios
      .post("/api/payments/paymentintent", reqBody)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(`Error: ${err.response.data.error}`);
      });
  }, []);

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
      {ClientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
