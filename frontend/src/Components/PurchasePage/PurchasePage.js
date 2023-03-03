import React from "react";
// Components
import PageTitle from "../Texts/PageTitle";
import Payment from "./Items/Payment";
// Style
import "./PurchasePage.css";

/**
 * Purchase page.
 * @returns Purchase page
 */
function PurchasePage() {
  return (
    <div className="grid-body page">
      <PageTitle text="Purchase membership" />
      <div className="purchase">
        <div className="purchase-left">
          {/* Membership Plan */}
          {/* Payment Details */}
          <Payment />
        </div>
        <div className="purchase-right">{/* Order Summary */}</div>
      </div>
    </div>
  );
}

export default PurchasePage;
