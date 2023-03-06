import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Subscription component that displays membership.
 * @param {*} membership
 * @param {boolean} isSelected
 * @param {*} onSelect
 * @returns Subscription component
 */
function Subscription({ membership, isSelected, onSelect }) {
  let [message, setMessage] = useState("");
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState("");

  const [MembershipPrice, setMembershipPrice] = useState(null);

  useEffect(() => {
    // If plan is selected, send information
    if (isSelected) onSelectPlan();
  }, [isSelected]);

  useEffect(() => {
    if (!membership) return;
    // Get price of the membership
    axios
      .get(`/api/memberships/prices/${membership.default_price}`)
      .then((res) => {
        if (res.error) console.log(res.error);
        const price = parseFloat(res.data.price.unit_amount_decimal);
        setMembershipPrice(price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [membership]);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      setSessionId(query.get("session_id"));
    }

    if (query.get("canceled")) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  /* Select membership plan */
  const onSelectPlan = () => {
    if (onSelect) onSelect(membership.id, MembershipPrice);
  };

  /* Checkout membership subscription */
  const onCheckOut = (e) => {
    e.preventDefault();
    const variable = { lookupKey: e.target[0].value };
    axios.post("/api/payments/checkout-session", variable).then((res) => {
      console.log(res);
      // Payment (replace with my own payment page)
      window.open(res.data.url, "_self");
    });
  };

  const onManage = (e) => {
    e.preventDefault();
    axios.post("/api/payments/create-portal-session", {}).then((res) => {
      console.log(res);
    });
  };

  const membershipDisplay = () => {
    return (
      <div
        onClick={onSelectPlan}
        className={`membership-box ${isSelected ? "selected-plan" : ""}`}
      >
        <p className="title">{membership.name}</p>
        <div className="price row">
          <div className="currency">$</div>
          <p className="price-num">{MembershipPrice}</p>
          <p>/ month</p>
        </div>
        <button>See Details</button>
        {/* <form onSubmit={onCheckOut}>
          <input type="hidden" name="lookup_key" value="standard" />
          <button id="checkout-and-portal-button" type="submit">
            Checkout
          </button>
        </form> */}
      </div>
    );
  };

  const successDisplay = (sessionId) => {
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
            value={sessionId}
          />
          <button id="checkout-and-portal-button" type="submit">
            Manage your billing information
          </button>
        </form>
      </section>
    );
  };

  const messageBlock = (message) => (
    <section>
      <p>{message}</p>
    </section>
  );

  if (!success && message === "") {
    return membershipDisplay();
  } else if (success && sessionId !== "") {
    return successDisplay(sessionId);
  } else {
    return messageBlock(message);
  }
}

export default Subscription;
