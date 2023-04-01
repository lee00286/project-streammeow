import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import module from "../../ApiService";
// Components
import StreamVideo from "./Items/StreamVideo";
import ColorButton from "../Buttons/ColorButton";
import Select from "react-select";
// Style
import "./StreamingPage.css";

/**
 * Streaming information input component that the creator can input.
 * @param {Function} props.onTitle: title of the streaming
 * @param {Function} props.onDescription: description of the streaming
 * @param {Array} props.membershipList: list of memberships
 * @param {Function} props.onPermission: memberships with permission to watch the streaming
 * @param {Function} props.onGSD: session description for streaming
 * @returns Streaming information input component
 */
function StreamInfo(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [PermissionOptions, setPermissionOptions] = useState([]);
  const [GSD, setGSD] = useState("");

  useEffect(() => {
    if (!props.membershipList) return;
    const membershipList = props.membershipList;
    if (membershipList.length === 0) membershipList.push("Everyone");
    // Set permission options for the dropdown menu
    let permissionOptions = [];
    for (let i = 0; i < membershipList.length; i++) {
      permissionOptions.push({
        value: i,
        label: membershipList[i].name,
      });
    }
    setPermissionOptions(permissionOptions);
  }, [props]);

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

  // Limit the permission to specific membership
  const onPermission = (permissions) => {
    // Send the change to parent component
    if (!props.onPermission) return;
    props.onPermission(permissions);
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
      <Select options={PermissionOptions} onChange={onPermission} isMulti />
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
  const { creatorId } = useParams();

  // Streaming Information
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Permission, setPermission] = useState([]);
  const [MembershipList, setMembershipList] = useState(["Everyone"]);
  // Video Streaming
  const [ScreenCapture, setScreenCapture] = useState(false);
  const [GSD, setGSD] = useState("");
  const [SendGSD, setSendGSD] = useState("");
  const [StartVideo, setStartVideo] = useState(false);
  const [StartSession, setStartSession] = useState(false);

  // Prevent creator from leaving the page
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  // Make sure all previous lives are ended
  useEffect(() => {
    if (creatorId === undefined || StartSession) return;
    module
      .getAllStreamings(creatorId)
      .then((res) => {
        if (res.error) return console.log(res.error);
        const streamings = res.data.streamings;
        return streamings;
      })
      .then((streamings) => {
        if (!streamings || streamings.length === 0) return;
        for (let i = 0; i < streamings.length; i++) {
          if (
            streamings[i].isEnded === null ||
            streamings[i].isEnded === false
          ) {
            // Modify all streamings to be ended
            const update = module.updateStreaming(streamings[i].id, {
              isEnded: true,
            });
            if (update.error) return console.log(update.error);
            console.log(update);
          }
        }
      })
      .catch((e) => console.log(e));
  }, [creatorId]);

  // Get creator's membership list
  useEffect(() => {
    if (creatorId === undefined || creatorId === null || creatorId === "")
      return;
    // Get creator's membership list from database
    module.getAllMemberships(creatorId).then((res) => {
      if (res.error) return console.log(res.error);
      setMembershipList(res.data.memberships);
    });
  }, [creatorId]);

  // Save streaming title
  const onTitle = (title) => {
    setTitle(title);
  };

  // Save streaming description
  const onDescription = (description) => {
    setDescription(description);
  };

  // Save membership permissions
  const onPermission = (permissions) => {
    let modifiedList = [];
    // Modify the array to contain membership id
    for (let i = 0; i < permissions.length; i++) {
      const index = permissions[i].value;
      modifiedList.push(MembershipList[index].id);
    }
    setPermission(modifiedList);
  };

  // Save session description
  const onGSD = (gsd) => {
    setGSD(gsd);
  };

  // Start video
  const onStartVideo = () => {
    setStartVideo(true);
  };

  // Start screen capturing
  const onStartScreenCapture = () => {
    setStartVideo(true);
    setScreenCapture(true);
  };

  // Start streaming
  const onStartStreaming = () => {
    // Save streaming information to database
    const response = module
      .addStreaming(Title, Description, Permission)
      .catch((e) => console.log(e));
    console.log(response);
    if (response.error) return console.log(response.error);
    // Start streaming session
    setStartSession(true);
    setSendGSD(GSD);
  };

  return (
    <div className="stream grid-body page col">
      <div className="stream-top row">
        <StreamVideo
          isCreator={true}
          isScreenCapture={ScreenCapture}
          hasStartVideo={StartVideo}
          hasStartSession={StartSession}
          gsd={SendGSD}
        />
        <StreamInfo
          onTitle={onTitle}
          onDescription={onDescription}
          membershipList={MembershipList}
          onPermission={onPermission}
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
          text="Start Screen Capture"
          textColor="var(--yellow4)"
          buttonColor="#fff"
          buttonFunction={onStartScreenCapture}
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
