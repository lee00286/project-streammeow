import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import module from "../../ApiService";
// Components
import PageTitle from "../Texts/PageTitle";
import SubTitle from "../Texts/SubTitle";
import InvoiceTable from "./Items/InvoiceTable";
import CheckBox from "../Texts/CheckBox";
import SubscribeButton from "./Items/SubscribeButton";
// Style
import "./PurchasePage.css";
import "../Membership/Membership.css";

/**
 * Subscription Detail Component that displays membership details.
 * @param {string} props.name: name of the membership
 * @param {string} props.description: description of the membership
 * @param {double} props.price: price of the membership
 * @param {Array} props.benefits: benefits of the membership
 * @param {string} props.currency: currency of the membershipp price
 * @returns Subscription Detail Component
 */
function SubscriptionDetail(props) {
  const [Membership, setMembership] = useState(null);

  useEffect(() => {
    if (!props) return;
    const membership = {
      name: props.name,
      description: props.description,
      price: props.price,
      benefits: props.benefits,
      currency: props.currency,
    };
    setMembership(membership);
  }, [props]);

  const allBenefits = Membership?.benefits ? (
    Membership.benefits.map((benefit, index) => {
      return (
        <li key={`purchase-membership-${index}`}>
          <p>{benefit}</p>
        </li>
      );
    })
  ) : (
    <div></div>
  );

  return (
    <div className="membership rounded">
      <div className="membership-name">
        <h3>{Membership?.name ?? ""}</h3>
      </div>
      <div className="membership-content">
        <div className="price row">
          <div className="currency">$</div>
          <p className="price-num">{Membership?.price ?? ""}</p>
          <p>/ month</p>
        </div>
        <div className="membership-description">
          <p>{Membership?.description ?? ""}</p>
        </div>
        <div className="membership-benefits">
          <ul>{allBenefits}</ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Subscription component that displays membership.
 * @param {Object} membership: membership object
 * @param {boolean} isSelected: if the membership plan is selected
 * @param {Function} onSelect: function to operate if the membership is selected
 * @returns Subscription component
 */
function Subscription({ membership, isSelected, onSelect }) {
  const [MembershipPrice, setMembershipPrice] = useState(null);
  const [IsDetail, setIsDetail] = useState(false);

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

  /* Show membership detail modal */
  const onDetail = (e) => {
    e.stopPropagation();
    setIsDetail(!IsDetail);
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
      <button onClick={onDetail}>See Details</button>
      <div
        className={`purchase-detail flex-center ${IsDetail ? "" : "hidden"}`}
        onClick={onDetail}
      >
        <div className="backdrop"></div>
        <SubscriptionDetail
          name={membership.name}
          description={membership.description}
          price={membership.price}
          benefits={membership.benefits}
          currency={membership.currency}
        />
      </div>
    </div>
  );
}

/**
 * Purchase page component.
 * @param {string} plan: plan to purchase
 * @returns Purchase page component
 */
function PurchasePage({ plan }) {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [Memberships, setMemberships] = useState([]);
  const [SelectPlan, setSelectPlan] = useState(null);
  const [BuyList, setBuyList] = useState(null);
  const [PriceId, setPriceId] = useState(null);
  const [IsChecked, setIsChecked] = useState(false);

  /* Navigate to creator's page if current user is creator */
  useEffect(() => {
    if (!creatorId) return;
    module.getUserId().then((res) => {
      if (res.data.user === undefined) return;
      // If the user is creator
      module
        .getCreatorByUserId(res.data.user.id)
        .then((res) => {
          if (res.error) return console.log(res.error);
          if (res.data.creator && `${res.data.creator.id}` === creatorId)
            navigate("/");
        })
        .catch((e) => console.log(e));
    });
  }, [creatorId]);

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
    if (Memberships && SelectPlan === null) {
      if (plan) setSelectPlan(plan);
      else if (location?.state?.membershipId) {
        const selected = Memberships.find(
          (m) => m.id === location.state.membershipId
        );
        if (selected) setSelectPlan(selected);
      }
    }
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
