import React from "react";
import { useNavigate } from "react-router-dom";

import PageTitle from "../Texts/PageTitle";
import Membership from "../Membership/Membership";
import "./CreatorPage.css";

// TODO: replace with actual membership data
const TEMP_MEMBERSHIP_DATA = [
  {
    id: 0,
    name: "Basic",
    price: "2.49",
    description: "Every little bit helps! Thank you for your support!",
    benefits: [
      "Access to all videos",
      "Access to all posts",
      "Comment on all posts",
    ],
  },
  {
    id: 1,
    name: "Standard",
    price: "4.99",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    benefits: ["Everything in the previous tiers"],
  },
  {
    id: 2,
    name: "Maneki-neko",
    price: "7.77",
    description:
      "Thank you so so much for your generosity!! You can use exclusive emotes in streams!",
    benefits: [
      "Access exclusive emotes during streams",
      "Direct message the creator",
      "Everything in the previous tiers",
    ],
  },
];

// TODO: replace with actual id when database is setup
const creatorId = 1;

export default function CreatorPage() {
  // TODO: consider what behaviour to do with medium, small, xs screen widths
  // TODO: make memberships horizontally scrollable or add next/prev arrows when
  // more memberships than the screen width (probably more than 3)
  const navigate = useNavigate();

  function goToPurchase() {
    navigate("/purchase");
  }

  return (
    <div className="page center">
      <PageTitle text="CREATOR's Membership Plans" />
      <div className="memberships-container">
        {TEMP_MEMBERSHIP_DATA.map((membership) => {
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
