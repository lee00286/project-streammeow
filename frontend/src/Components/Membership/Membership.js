import React from "react";

import ColorButton from "../Buttons/ColorButton";
import "./Membership.css";

// TODO decide if parent is responsible for the action buttons (select, edit, etc) or make this component expose those options
/**
 *
 * @param {number} membershipId membership id
 * @param {string} name membership name
 * @param {string} price membership price, for example "2.99"
 * @param {string} description membership description
 * @param {string[]} benefits list of membership benefits
 * @param {function} onSelectMembership callback when the Select button is pressed
 * @returns
 */
export default function Membership({
  membershipId,
  name,
  price,
  description,
  benefits,
  onSelectMembership,
}) {
  const onSelect = () => {
    if (onSelectMembership) onSelectMembership(membershipId);
  };

  return (
    <div className="membership rounded">
      <MembershipName name={name} />
      <MembershipContent
        membershipId={membershipId}
        price={price}
        description={description}
        benefits={benefits}
      />
      {/* TODO: direct to purchase or signin page */}
      <div className="membership-bottom">
        <ColorButton
          buttonColor="var(--yellow3)"
          text="Select"
          textColor="white"
          buttonFunction={onSelect}
        />
      </div>
    </div>
  );
}

function MembershipName({ name }) {
  // TODO minor fix: tiny curve by the corners not being filled by the background colour
  return (
    <div className="membership-name">
      <h3>{name}</h3>
    </div>
  );
}

// TODO make it fixed height and hide details if the content is long. then
// make it expandable to show all details
function MembershipContent({ membershipId, price, description, benefits }) {
  return (
    <div className="membership-content">
      <MembershipPrice price={price} />
      <MembershipDescription description={description} />
      <MembershipBenefits membershipId={membershipId} benefits={benefits} />
    </div>
  );
}

function MembershipPrice({ price }) {
  // TODO: make it flexible to currency symbol
  return (
    // TODO make horizontal, superscript the currency, make price bigger
    <div className="price row">
      <div className="currency">$</div>
      <p className="price-num">{price}</p>
      <p>/ month</p>
    </div>
  );
}

function MembershipDescription({ description }) {
  return (
    <div className="membership-description">
      <p>{description}</p>
    </div>
  );
}

function MembershipBenefits({ membershipId, benefits }) {
  const allBenefits = benefits.map((benefit, index) => {
    // TODO: use a better key
    return (
      <li key={`${membershipId}-${index}`}>
        <p>{benefit}</p>
      </li>
    );
  });

  // todo use a different icon for bullet points. maybe checkmarks
  return (
    <div className="membership-benefits">
      <ul>{allBenefits}</ul>
    </div>
  );
}
