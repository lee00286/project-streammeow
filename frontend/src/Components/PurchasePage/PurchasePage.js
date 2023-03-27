import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

/**
 * Purchase page component.
 * @param {string} plan: plan to purchase
 * @returns Purchase page component
 */
function PurchasePage({ plan }) {
  const { creatorId } = useParams();

  const [Memberships, setMemberships] = useState([]);
  const [SelectPlan, setSelectPlan] = useState(null);
  const [BuyList, setBuyList] = useState(null);
  const [PriceId, setPriceId] = useState(null);
  const [IsChecked, setIsChecked] = useState(false);

  /* Get memberships of the creator */
  useEffect(() => {
    if (!creatorId) return;
    module
      .getAllMemberships(creatorId)
      .then((res) => {
        if (res.error) return console.log(res.error);
        const memberships = res.data.memberships;
        setMemberships(memberships);
        for (let i = 0; i < memberships.length; i++) {
          loadPriceId(memberships[i]);
        }
      })
      .catch((e) => console.log(e));
  }, [creatorId, SelectPlan]);

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

  // Create a new price model if membership doesn't have one
  const loadPriceId = (membership) => {
    if (!membership) return;
    if (membership.priceId !== null && membership.priceId !== "") return;
    // Create a new price with total price
    module
      .addPrice(membership.name, membership.currency, membership.price)
      .then((res) => {
        if (res.error) return console.log(res.error);
        // Add a priceId to membership
        return module.updateMembership(membership.id, {
          priceId: res.data.price.id,
        });
      })
      .catch((e) => {
        console.log(e);
      });
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
            <InvoiceTable buyList={BuyList} />
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
              priceId={PriceId ?? ""}
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
