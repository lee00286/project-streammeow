import React, { useEffect, useState } from "react";
import module from "../../../ApiService";
// Components
import ColorButton from "../../Buttons/ColorButton";
// Style
import "../PurchasePage.css";

/**
 * Subscribe button component to checkout.
 * @param {string} currency: currency
 * @param {string} membership: membership id that the user is purchasing for
 * @param {number} price: total cost of the payment
 * @param {boolean} isChecked: if Terms & Conditions and Privacy Policy are agreed
 * @returns Subscribe button component
 */
function SubscribeButton({ currency, membership, price, isChecked }) {
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
    module
      .addPortalSession()
      .then((res) => {
        if (res.error) return console.log(res.error);
      })
      .catch((e) => console.log(e));
  };

  /* Checkout membership subscription */
  const onCheckOut = (e) => {
    e.preventDefault();
    if (!isChecked) {
      console.log(
        "To continue, you must agree to the Terms & Conditions and Privacy Policy."
      );
      return;
    }
    module
      .addPrice(currency, membership, price)
      .then((res) => {
        // Create a new price with total price
        if (res.error) return console.log(res.error);
        const priceId = res.data.price.id;
        return priceId;
      })
      .then((priceId) => {
        // Update memberships to have new priceId
        module
          .updateMembership(membership, { priceId: priceId })
          .then((res) => {
            if (res.error) return console.log(res.error);
          });
        return priceId;
      })
      .then((priceId) => {
        // Create a checkout-session using priceId
        module
          .addCheckoutSession(priceId)
          .then((res) => {
            if (res.error) return console.log(res.error);
            // Payment (replace with my own payment page)
            window.open(res.data.url, "_self");
          })
          .catch((e) => {
            console.log(e);
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
