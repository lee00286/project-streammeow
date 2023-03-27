import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import module from "../../ApiService";
import PageTitle from "../Texts/PageTitle";
import SubTitle from "../Texts/SubTitle";
import Membership from "../Membership/Membership";
import "./CreatorPage.css";

// TODO: cleanup
// const TEMP_MEMBERSHIP_DATA = [
//   {
//     id: 0,
//     name: "Basic",
//     price: "2.49",
//     description: "Every little bit helps! Thank you for your support!",
//     benefits: [
//       "Access to all videos",
//       "Access to all posts",
//       "Comment on all posts",
//     ],
//   },
//   {
//     id: 1,
//     name: "Standard",
//     price: "4.99",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
//     benefits: ["Everything in the previous tiers"],
//   },
//   {
//     id: 2,
//     name: "Maneki-neko",
//     price: "7.77",
//     description:
//       "Thank you so so much for your generosity!! You can use exclusive emotes in streams!",
//     benefits: [
//       "Access exclusive emotes during streams",
//       "Direct message the creator",
//       "Everything in the previous tiers",
//     ],
//   },
// ];

// TODO: replace with actual id when database is setup
const creatorId = 1;

export default function CreatorPage() {
  const [memberships, setMemberships] = useState([]);

  // retrieve data for the creator page
  useEffect(() => {
    // From Fetching data with Effects in the useEffects React docs
    // Used to prevent a race condition when multiple requests are made
    let ignore = false;
    setMemberships([]);
    module
      .getAllMemberships(creatorId)
      .then((res) => {
        if (!ignore) {
          if (res.error) return console.log(res.error);
          setMemberships(res.data.memberships);
        }
      })
      .catch((e) => console.log(e));
    return () => {
      ignore = true;
    };
    // TODO removing this constant causes an infinite loop of database requests
  }, [creatorId]);

  // TODO: consider what behaviour to do with medium, small, xs screen widths
  // TODO: make memberships horizontally scrollable or add next/prev arrows when
  // more memberships than the screen width (probably more than 3)
  const navigate = useNavigate();

  function goToPurchase() {
    navigate("/purchase");
  }

  return (
    <div className="page center">
      <PageTitle text="Creator" />
      <SubTitle text="Memberships" />
      <div className="memberships-container">
        {memberships.map((membership) => {
          return (
            <Membership
              key={membership.id}
              {...membership}
              onSelect={goToPurchase}
            />
          );
        })}
      </div>
    </div>
  );
}
