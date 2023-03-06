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

const creatorId = "1";

/**
 * Purchase page.
 * @returns Purchase page
 */
function PurchasePage() {
  const [Memberships, setMemberships] = useState([]);

  useEffect(() => {
    axios.get(`/api/memberships?creatorId=${creatorId}`).then((res) => {
      if (res.error) return console.log(res.error);
      setMemberships(res.data.memberships);
      console.log(res.data.memberships);
    });
  }, []);

  const memberships =
    Memberships && Memberships.length > 0
      ? Memberships.map((membership, index) => {
          return (
            <div className="tier" key={`tier-${index}`}>
              <Subscription membership={membership} />
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
        <div className="purchase-right col-auto">
          <InvoiceTable />
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
            // buttonFunction={onRegister}
          />
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
