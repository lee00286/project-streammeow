import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import module from "../../ApiService";
// Components
import ReadyPage from "./ReadyPage";
import StreamVideo from "./Items/StreamVideo";
import ColorButton from "../Buttons/ColorButton";
import "./StreamingPage.css";

// TODO: Streaming permission

/**
 * Streamer information component that shows information about the streamer.
 * @param {string} creatorId: id of the streamer
 * @returns Streamer information component
 */
function StreamerInfo() {
  const { creatorId } = useParams();
  const navigate = useNavigate();

  const [CreatorInfo, setCreatorInfo] = useState(null);

  useEffect(() => {
    if (!creatorId) return;
    // TODO: GET streamer information
    module.getUserById(creatorId).then((res) => {
      if (res.error) return console.log(res.error);
      setCreatorInfo(res.data.user);
    });
  }, [creatorId]);

  // Navigate to creator's page
  const onCreator = () => {
    navigate(`/creators/${creatorId}`);
  };

  // Navigate to creator's membership page
  const onMembership = () => {
    navigate(`/memberships/${creatorId}`);
  };

  // TODO: Replace streamer info to the information in { streamer }
  //       It should include: creatorId, profileImg, name, etc.
  return (
    <div className="streamer-container row">
      <div className="streamer-info row">
        <img src="/logo1.png" className="streamer-profile" />
        <div className="streamer-name">
          {CreatorInfo && CreatorInfo.name ? CreatorInfo.name : ""}
        </div>
      </div>
      <div className="streamer-button">
        <ColorButton
          text="Visit Creator's Page"
          textColor="#fff"
          buttonColor="var(--yellow4)"
          buttonFunction={onCreator}
        />
        <ColorButton
          text="Subscribe"
          textColor="#fff"
          buttonColor="var(--yellow4)"
          buttonFunction={onMembership}
        />
      </div>
    </div>
  );
}

/**
 * Streaming information component that shows information about the stream.
 * @param {Object} info: information about stream
 * @returns Streaming information component
 */
function StreamInfo({ info }) {
  const [StreamingInfo, setStreamingInfo] = useState(null);

  useEffect(() => {
    if (!info) return;
    setStreamingInfo(info);
  }, [info]);

  if (!StreamingInfo)
    return (
      <div className="stream-info col">No streaming information loaded</div>
    );

  return (
    <div className="stream-info col">
      <h2>{StreamingInfo.title}</h2>
      <p>{StreamingInfo.description ?? ""}</p>
    </div>
  );
}

/**
 * Streaming page component that shows the streaming page.
 * @returns Streaming page component
 */
function StreamingPage() {
  const { creatorId } = useParams();

  const [UserId, setUserId] = useState(null);
  const [CreatorId, setCreatorId] = useState(null);
  const [Stream, setStream] = useState(null);
  // Video Streaming
  const [GSD, setGSD] = useState("");
  const [SendGSD, setSendGSD] = useState("");
  const [StartSession, setStartSession] = useState(false);

  // Check if user is the creator
  useEffect(() => {
    module.getUserId().then((res) => {
      if (res.data.user === undefined) {
        setUserId(undefined);
        return;
      }
      // If the user is creator
      module
        .getCreatorByUserId(res.data.user.id)
        .then((res) => {
          if (res.error) return console.log(res.error);
          if (
            !res.data.creator?.id ||
            !creatorId ||
            `${res.data.creator.id}` !== creatorId
          )
            return setCreatorId(undefined);
        })
        .catch((e) => console.log(e));
    });
  }, [creatorId]);

  useEffect(() => {
    if (!creatorId || !StartSession) return;
    // Get stream information
    module
      .getAllStreamings(creatorId)
      .then((res) => {
        if (res.error) return console.log(res.error);
        if (!res.data || res.data.streamings.length < 1)
          return console.log("No streaming found");
        setStream(res.data.streamings[0]);
      })
      .catch((e) => console.log(e));
  }, [creatorId, StartSession]);

  // Save session description
  const onGSD = (gsd) => {
    setGSD(gsd);
  };

  // If session started
  const onStartSession = () => {
    setSendGSD(GSD);
    setStartSession(true);
  };

  // TODO:
  if (UserId && `${CreatorId}` === creatorId) {
    return <ReadyPage />;
  }

  return (
    <div className="stream grid-body page col">
      {!StartSession && (
        <div className="streaming-before col">
          <h2>Creator's Streaming</h2>
          <textarea
            value={GSD}
            onChange={(e) => onGSD(e.target.value)}
          ></textarea>
          <ColorButton
            text="Watch Streaming"
            textColor="#fff"
            buttonColor="var(--yellow4)"
            buttonFunction={onStartSession}
          />
        </div>
      )}
      <div className={`stream-top row ${!StartSession ? "hidden" : ""}`}>
        <StreamVideo
          isCreator={false}
          hasStartVideo={true}
          hasStartSession={StartSession}
          gsd={SendGSD}
        />
        <div className="stream-chat col-auto"></div>
      </div>
      <div className={`stream-bottom col ${!StartSession ? "hidden" : ""}`}>
        <StreamerInfo streamer={creatorId} />
        <StreamInfo info={Stream} onGSD={onGSD} />
      </div>
    </div>
  );
}

export default StreamingPage;
