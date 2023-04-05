import React, { useEffect, useState } from "react";
import module from "../../../ApiService";
// Components
import ColorButton from "../../Buttons/ColorButton";
import Alert from "../../Alert/Alert";
// Style
import "../PurchasePage.css";

/**
 * Subscribe button component to checkout.
 * @param {string} props.membershipId: membership id that the user is purchasing for
 * @param {string} props.priceId: price id that the user is purchasing for
 * @param {boolean} props.isChecked: if Terms & Conditions and Privacy Policy are agreed
 * @returns Subscribe button component
 */
function SubscribeButton(props) {
  const [PriceId, setPriceId] = useState(null);

  let [Success, setSuccess] = useState(false);
  let [SessionId, setSessionId] = useState("");
  const [ErrorLog, setErrorLog] = useState("");

  /* Set priceId of the membership */
  useEffect(() => {
    // If null priceId
    if (!props || props.priceId === null || props.priceId === undefined) {
      setPriceId(null);
      return;
    }
    // If price is already saved in membership
    if (props.priceId !== "") {
      setPriceId(props.priceId);
      return;
    }
  }, [props]);

  /* After checkout */
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      setSessionId(query.get("session_id"));
    }

    if (query.get("canceled")) {
      setSuccess(false);
      setErrorLog(
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
        if (res.error) return setErrorLog(res.error);
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
  };

  /* Checkout membership subscription */
  const onCheckOut = (e) => {
    e.preventDefault();
    if (!props.isChecked) {
      setErrorLog(
        "To continue, you must agree to the Terms & Conditions and Privacy Policy."
      );
      return;
    }

    // Create a checkout-session using priceId
    module
      .addCheckoutSession(PriceId, props.membershipId)
      .then((res) => {
        if (res.error) return setErrorLog(res.error);
        // Payment (replace with my own payment page)
        window.open(res.data.url, "_self");
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
  };

  if (Success && SessionId !== "") {
    return (
      <section>
        <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
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
    <div>
      <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
      <ColorButton
        buttonColor="var(--yellow4)"
        textColor="#fff"
        text="Subscribe"
        buttonFunction={onCheckOut}
        disabled={PriceId === null}
      />
    </div>
  );
}

export default SubscribeButton;
