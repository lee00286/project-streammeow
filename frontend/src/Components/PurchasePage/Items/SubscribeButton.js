import React, { useEffect, useState } from "react";
import axios from "axios";
// Components
import ColorButton from "../../Buttons/ColorButton";
// Style
import "../PurchasePage.css";

/**
 * Subscribe button component to checkout.
 * @param {string} currency: Currency
 * @param {string} membership: Membership id that the user is purchasing for
 * @param {*} price: Total cost of the payment
 * @returns Subscribe button component
 */
function SubscribeButton({ currency, membership, price }) {
  let [Success, setSuccess] = useState(false);
  let [SessionId, setSessionId] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      setSessionId(query.get("session_id"));
    }

    if (query.get("canceled")) {
      setSuccess(false);
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [SessionId]);

  /* Create portal session */
  const onManage = (e) => {
    e.preventDefault();
    axios.post("/api/payments/create-portal-session", {}).then((res) => {
      console.log(res);
    });
  };

  /* Checkout membership subscription */
  const onCheckOut = (e) => {
    e.preventDefault();
    const variables = {
      currency: currency,
      product: membership,
      unit_amount_decimal: price,
    };
    axios
      .post("/api/memberships/prices", variables)
      .then((res) => {
        if (res.error) return console.log(res.error);
        const priceId = res.data.price.id;
        return priceId;
      })
      .then((priceId) => {
        const variable = { priceId: priceId };
        axios.patch(`/api/memberships/${membership}`, variable).then((res) => {
          if (res.error) return console.log(res.error);
        });
        return variable;
      })
      .then((variable) => {
        axios.post("/api/payments/checkout-session", variable).then((res) => {
          console.log(res);
          // Payment (replace with my own payment page)
          window.open(res.data.url, "_self");
        });
      });
  };

  if (Success && SessionId !== "") {
    return (
      <section>
        <div className="product Box-root">
          <div className="description Box-root">
            <h3>Subscription to starter plan successful!</h3>
          </div>
        </div>
        <form onSubmit={onManage}>
          <input
            type="hidden"
            id="session-id"
            name="session_id"
            value={SessionId}
          />
          <button id="checkout-and-portal-button" type="submit">
            Manage your billing information
          </button>
        </form>
      </section>
    );
  }

  return (
    <ColorButton
      buttonColor="var(--yellow4)"
      textColor="#fff"
      text="Subscribe"
      buttonFunction={onCheckOut}
    />
  );
}

export default SubscribeButton;
