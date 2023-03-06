import React, { useEffect, useState } from "react";
import axios from "axios";
// Components
import PageTitle from "../Texts/PageTitle";
import SubTitle from "../Texts/SubTitle";
import Payment from "./Items/Payment";
import Subscription from "./Items/Subscription";
import InvoiceTable from "./Items/InvoiceTable";
import CheckBox from "../Texts/CheckBox";
import ColorButton from "../Buttons/ColorButton";
// Style
import "./PurchasePage.css";

// TODO: Replace
const creatorId = "1";

/**
 * Purchase page component.
 * @param {string} plan
 * @returns Purchase page component
 */
function PurchasePage({ plan }) {
  const [Memberships, setMemberships] = useState([]);
  const [SelectPlan, setSelectPlan] = useState(null);
  const [BuyList, setBuyList] = useState(null);

  useEffect(() => {
    if (Memberships && SelectPlan === null && plan) setSelectPlan(plan);
  }, [Memberships, plan]);

  useEffect(() => {
    axios.get(`/api/memberships?creatorId=${creatorId}`).then((res) => {
      if (res.error) return console.log(res.error);
      setMemberships(res.data.memberships);
    });
  }, []);

  const onSelect = (membershipId, price) => {
    setSelectPlan(membershipId);
    for (let i = 0; i < Memberships.length; i++) {
      if (Memberships[i].id === membershipId) {
        const variable = {
          membershipId: Memberships[i].id,
          item: Memberships[i].name,
          quantity: 1,
          priceId: Memberships[i].default_price,
          price: price,
        };
        setBuyList(variable);
      }
    }
  };

  const memberships =
    Memberships && Memberships.length > 0
      ? Memberships.map((membership, index) => {
          const isSelected = SelectPlan && SelectPlan === membership.id;
          return (
            <div className="tier" key={`tier-${index}`}>
              <Subscription
                membership={membership}
                isSelected={isSelected}
                onSelect={onSelect}
              />
            </div>
          );
        })
      : "Membership empty";

  return (
    <div className="grid-body page">
      <PageTitle text="Purchase membership" />
      <div className="purchase">
        <div className="purchase-left col-7">
          <SubTitle text="Membership Plan" />
          {Memberships && <div className="membership row">{memberships}</div>}
          <SubTitle text="Payment Details" />
          <Payment />
        </div>
        {SelectPlan && BuyList ? (
          <div className="purchase-right col-auto">
            <InvoiceTable buyList={BuyList} />
            <CheckBox
              text={
                <p>
                  I agree to the <span>Terms & Conditions</span> and{" "}
                  <span>Privacy Policy</span>.
                </p>
              }
            />
            <ColorButton
              buttonColor="var(--yellow4)"
              textColor="#fff"
              text="Subscribe"
              // buttonFunction={}
            />
          </div>
        ) : (
          <div className="purchase-right col-auto">No plan selected</div>
        )}
      </div>
    </div>
  );
}

export default PurchasePage;
