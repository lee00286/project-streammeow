import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StreamVideo from "./Items/StreamVideo";
import ColorButton from "../Buttons/ColorButton";
import "./StreamingPage.css";

const creatorId = "1";

/**
 * Streaming information input component that the creator can input.
 * @param {Function} props.onTitle: title of the streaming
 * @param {Function} props.onDescription: description of the streaming
 * @param {array} props.membershipList: list of memberships
 * @param {Function} props.onMembership: memberships that can watch the streaming
 * @returns Streaming information input component
 */
function StreamInfo(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [MembershipList, setMembershipList] = useState(["Everyone"]);
  const [Membership, setMembership] = useState(0);

  useEffect(() => {
    if (!props.membershipList) return;
    console.log(props.membershipList);
    setMembershipList(props.membershipList);
  }, [props]);

  // Membership options for the dropdown menu
  const membershipSelect =
    MembershipList && MembershipList.length > 0 ? (
      MembershipList.map((membership, index) => {
        return (
          <option key={index} value={index}>
            {membership}
          </option>
        );
      })
    ) : (
      <option key={0} value={0}>
        Everyone
      </option>
    );

  const onTitle = (title) => {
    setTitle(title);
    if (!props.onTitle) return;
    props.onTitle(title);
  };

  const onDescription = (description) => {
    setDescription(description);
    if (!props.onDescription) return;
    props.onDescription(description);
  };

  // Limit the streaming to specific membership
  const onMembership = (membership) => {
    setMembership(membership);
    if (!props.onMembership) return;
    props.onMembership(membership);
  };

  return (
    <div className="stream-info-input col col-auto">
      <p>Title of the Streaming</p>
      <input value={Title} onChange={(e) => onTitle(e.target.value)} />
      <p>Description of the Streaming</p>
      <input
        value={Description}
        onChange={(e) => onDescription(e.target.value)}
      />
      <p>Permission</p>
      <select value={Membership} onChange={(e) => onMembership(e.target.value)}>
        {membershipSelect}
      </select>
    </div>
  );
}

/**
 * Streaming page component that shows the streaming page.
 * @returns Streaming page component
 */
function ReadyPage() {
  const navigate = useNavigate();

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Membership, setMembership] = useState(0);
  const [MembershipList, setMembershipList] = useState(["Everyone"]);

  useEffect(() => {
    const membershipList = ["Everyone"];
    // TODO: Get creator's membership list from backend
    membershipList.push("Membership 1");
    setMembershipList(membershipList);
  }, []);

  // Save streaming title
  const onTitle = (title) => {
    setTitle(title);
  };

  // Save streaming description
  const onDescription = (description) => {
    setDescription(description);
  };

  const onMembership = (membership) => {
    setMembership(membership);
  };

  // Start streaming
  const onStartStreaming = () => {
    const variables = {
      title: Title,
      description: Description,
    };
    console.log(variables);
    navigate(`/streaming/${creatorId}`);
  };

  return (
    <div className="stream grid-body page col">
      <div className="stream-top row">
        <StreamVideo />
        <StreamInfo
          onTitle={onTitle}
          onDescription={onDescription}
          membershipList={MembershipList}
          onMembership={onMembership}
        />
      </div>
      <div className="stream-bottom">
        <ColorButton
          text="Start Streaming"
          textColor="#fff"
          buttonColor="var(--yellow4)"
          buttonFunction={onStartStreaming}
        />
      </div>
    </div>
  );
}

export default ReadyPage;
