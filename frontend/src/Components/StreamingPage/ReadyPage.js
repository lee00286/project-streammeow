import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StreamVideo from "./Items/StreamVideo";
import ColorButton from "../Buttons/ColorButton";
import "./StreamingPage.css";

// TODO: Change
const creatorId = "1";

/**
 * Streaming information input component that the creator can input.
 * @param {Function} props.onTitle: title of the streaming
 * @param {Function} props.onDescription: description of the streaming
 * @param {Array} props.membershipList: list of memberships
 * @param {Function} props.onMembership: memberships that can watch the streaming
 * @param {Function} props.onGSD: session description for streaming
 * @returns Streaming information input component
 */
function StreamInfo(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [MembershipList, setMembershipList] = useState(["Everyone"]);
  const [Membership, setMembership] = useState(0);
  const [GSD, setGSD] = useState("");

  useEffect(() => {
    if (!props.membershipList) return;
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

  // Set title of the streaming
  const onTitle = (title) => {
    setTitle(title);
    if (!props.onTitle) return;
    props.onTitle(title);
  };

  // Set description of the streaming
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

  // Set session description of the streaming
  const onGSD = (gsd) => {
    setGSD(gsd);
    if (!props.onGSD) return;
    props.onGSD(gsd);
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
      <p>Session Description</p>
      <textarea value={GSD} onChange={(e) => onGSD(e.target.value)}></textarea>
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
  // Video Streaming
  const [GSD, setGSD] = useState("");
  const [StartVideo, setStartVideo] = useState(false);
  const [StartSession, setStartSession] = useState(false);

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

  // Save membership permission
  const onMembership = (membership) => {
    setMembership(membership);
  };

  // Save session description
  const onGSD = (gsd) => {
    setGSD(gsd);
  };

  // Start video
  const onStartVideo = () => {
    setStartVideo(true);
  };

  // Start streaming
  const onStartStreaming = () => {
    const variables = {
      title: Title,
      description: Description,
      membership: Membership,
    };
    // TODO: Save streaming information to database
    setStartSession(true);
  };

  return (
    <div className="stream grid-body page col">
      <div className="stream-top row">
        <StreamVideo
          isCreator={true}
          hasStartVideo={StartVideo}
          hasStartSession={StartSession}
          gsd={GSD}
        />
        <StreamInfo
          onTitle={onTitle}
          onDescription={onDescription}
          membershipList={MembershipList}
          onMembership={onMembership}
          onGSD={onGSD}
        />
      </div>
      <div className="stream-bottom">
        <ColorButton
          text="Start Video"
          textColor="var(--yellow4)"
          buttonColor="#fff"
          buttonFunction={onStartVideo}
          border="1px solid var(--yellow4)"
        />
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
