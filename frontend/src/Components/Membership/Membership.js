import React, { useState } from "react";

import ColorButton from "../Buttons/ColorButton";
import "./Membership.css";

// TODO decide if parent is responsible for the action buttons (select, edit, etc) or make this component expose those options
/**
 *
 * @param {string} name the membership name
 * @param {string} price the membership price. for example "2.99"
 * @param {string} description the membership description
 * @param {string[]} benefits the list of membership benefits
 * @returns
 */
export default function Membership({ name, price, description, benefits }) {
  // TODO IMPLEMENT
  function onSelect() {
    console.log("selected membership");
  }

  return (
    <div className="membership">
      <MembershipName name={name} />
      <MembershipContent
        price={price}
        description={description}
        benefits={benefits}
      />
      {/* TODO: direct to purchase or signin page */}
      <ColorButton
        buttonColor="var(--yellow3)"
        text="Select"
        textColor="white"
        buttonFunction={onSelect}
      />
    </div>
  );
}

function MembershipName({ name }) {
  return (
    <div className="membership-name">
      <h3>{name}</h3>
    </div>
  );
}

function MembershipContent({ price, description, benefits }) {
  return (
    <div className="membership-content">
      <MembershipPrice price={price} />
      <MembershipDescription description={description} />
      <MembershipBenefits benefits={benefits} />
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

function MembershipBenefits({ benefits }) {
  const allBenefits = benefits.map((benefit, index) => {
    // TODO: use a better key
    return (
      <li key={`benefit-${index}`}>
        <p>{benefit}</p>
      </li>
    );
  });

  return (
    <div className="membership-benefits">
      <ul>{allBenefits}</ul>
    </div>
  );
}
