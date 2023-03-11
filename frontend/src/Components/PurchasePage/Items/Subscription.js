import React, { useEffect, useState } from "react";

/**
 * Subscription component that displays membership.
 * @param {Object} membership: membership object
 * @param {boolean} isSelected: if the membership plan is selected
 * @param {Function} onSelect: function to operate if the membership is selected
 * @returns Subscription component
 */
function Subscription({ membership, isSelected, onSelect }) {
  const [MembershipPrice, setMembershipPrice] = useState(null);

  useEffect(() => {
    // If plan is selected, send information
    if (isSelected) onSelectPlan();
  }, [isSelected]);

  /* Set price of the membership */
  useEffect(() => {
    if (!membership?.price) return;
    const price = parseFloat(membership.price);
    setMembershipPrice(price);
  }, [membership]);

  /* Select membership plan */
  const onSelectPlan = () => {
    if (onSelect) onSelect(membership.id, membership.priceId, MembershipPrice);
  };

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
    </div>
  );
}

export default Subscription;
