import React, { useState } from "react";

import PageTitle from "../Texts/PageTitle";
import Membership from "../Membership/Membership";

// TODO: replace with actual membership data
const TEMP_MEMBERSHIP_DATA = {
  name: "Basic",
  price: "2.99",
  description: "Every little bit helps! Thank you for your support!",
  benefits: ["Access to all videos", "Access to all posts", "Comment on posts"],
};

// TODO: replace with actual id when database is setup
const creatorId = 1;

export default function CreatorPage() {
  return (
    <div className="page center">
      <PageTitle text="CREATOR's Membership Plans" />
      <div className="memberships-container">
        <Membership {...TEMP_MEMBERSHIP_DATA} />
      </div>
    </div>
  );
}
