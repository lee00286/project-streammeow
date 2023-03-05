import React, { useEffect, useState } from "react";
import axios from "axios";

function Subscription() {
  let [message, setMessage] = useState("");
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState("");

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

  const onCheckOut = (e) => {
    e.preventDefault();
    const variable = { lookupKey: e.target[0].value };
    axios.post("/api/payments/checkout-session", variable).then((res) => {
      console.log(res);
    });
  };

  const onManage = (e) => {
    e.preventDefault();
    console.log(e.target);
    axios.post("/api/payments/create-portal-session", {}).then((res) => {
      console.log(res);
    });
  };

  const productDisplay = () => {
    return (
      <div>
        <div className="product">
          <div className="description">
            <h3>Standard</h3>
            <h5>$2.99 / month</h5>
          </div>
        </div>
        <form onSubmit={onCheckOut}>
          {/* Add a hidden field with the lookup_key of your Price */}
          <input type="hidden" name="lookup_key" value="standard" />
          <button id="checkout-and-portal-button" type="submit">
            Checkout
          </button>
        </form>
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
    return productDisplay();
  } else if (success && sessionId !== "") {
    return successDisplay(sessionId);
  } else {
    return messageBlock(message);
  }
}

export default Subscription;
