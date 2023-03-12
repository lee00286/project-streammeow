import React, { useEffect, useState } from "react";
import module from "../../ApiService";
// Components
import PageTitle from "../Texts/PageTitle";
import SubTitle from "../Texts/SubTitle";
import Subscription from "./Items/Subscription";
import InvoiceTable from "./Items/InvoiceTable";
import CheckBox from "../Texts/CheckBox";
import SubscribeButton from "./Items/SubscribeButton";
// Style
import "./PurchasePage.css";

// TODO: Replace
const creatorId = "1";

/**
 * Purchase page component.
 * @param {string} plan: plan to purchase
 * @returns Purchase page component
 */
function PurchasePage({ plan }) {
  const [Memberships, setMemberships] = useState([]);
  const [SelectPlan, setSelectPlan] = useState(null);
  const [BuyList, setBuyList] = useState(null);
  const [PriceId, setPriceId] = useState(null);
  const [TotalCost, setTotalCost] = useState(null);
  const [IsChecked, setIsChecked] = useState(false);

  /* Get membership of the creator */
  useEffect(() => {
    module
      .getAllMemberships(creatorId)
      .then((res) => {
        if (res.error) return console.log(res.error);
        setMemberships(res.data.memberships);
      })
      .catch((e) => console.log(e));
  }, [SelectPlan]);

  /* Update inherited SelectPlan */
  useEffect(() => {
    if (Memberships && SelectPlan === null && plan) setSelectPlan(plan);
  }, [Memberships, plan]);

  // Set selected membership plan
  const onSelect = (membershipId, priceId, price) => {
    setSelectPlan(membershipId);
    setPriceId(priceId);
    for (let i = 0; i < Memberships.length; i++) {
      if (Memberships[i].id === membershipId) {
        const variable = {
          membershipId: Memberships[i].id,
          item: Memberships[i].name,
          quantity: 1,
          price: price,
        };
        setBuyList(variable);
        return;
      }
    }
  };

  // Set total cost
  const onInvoice = (total) => {
    setTotalCost(total);
  };

  // Check if agreement checkbox is checked
  const onCheck = (isChecked) => {
    setIsChecked(isChecked);
  };

  const memberships =
    Memberships && Memberships.length > 0
      ? Memberships.map((membership, index) => {
          const isSelected =
            SelectPlan !== undefined &&
            SelectPlan !== null &&
            SelectPlan === membership.id;
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
          {Memberships && (
            <div className="purchase-membership row no-select">
              {memberships}
            </div>
          )}
          {/* {SelectPlan && <SubTitle text="Payment Details" />}
          {SelectPlan && <Payment totalCost={TotalCost} currency="cad" />} */}
        </div>
        {SelectPlan && BuyList ? (
          <div className="purchase-right col-auto">
            <InvoiceTable buyList={BuyList} totalCost={onInvoice} />
            <CheckBox
              text={
                <p>
                  I agree to the <span>Terms & Conditions</span> and{" "}
                  <span>Privacy Policy</span>.
                </p>
              }
              onCheck={onCheck}
            />
            <SubscribeButton
              membershipId={BuyList.membershipId}
              membershipName={BuyList.item}
              priceId={PriceId ?? ""}
              price={TotalCost}
              currency={"cad"}
              isChecked={IsChecked}
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
