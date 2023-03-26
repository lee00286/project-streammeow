import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StreamVideo from "./Items/StreamVideo";
import ColorButton from "../Buttons/ColorButton";
import "./StreamingPage.css";

// TODO: Check if the streaming has started
// TODO: Streaming permission

/**
 * Streamer information component that shows information about the streamer.
 * @param {Object} streamer: streamer information
 * @returns Streamer information component
 */
function StreamerInfo({ streamer }) {
  const navigate = useNavigate();

  const onCreator = () => {
    // TODO: Navigate to creator's page
    // navigate("/creators/:creatorId");
  };

  const onMembership = () => {
    // TODO: Navigate to creator's membership page
    // navigate("/membership/:creatorId");
  };

  // TODO: Replace streamer info to the information in { streamer }
  //       It should include: creatorId, profileImg, name, etc.
  return (
    <div className="streamer-container row">
      <div className="streamer-info row">
        <img src="/logo1.png" className="streamer-profile" />
        <div className="streamer-name">Streamer's Name</div>
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
  // TODO: Replace title/description to the information in { info }

  return (
    <div className="stream-info col">
      <h2>Title of the Streaming</h2>
      <p>Description of the Streaming</p>
      <p>Session Description</p>
    </div>
  );
}

/**
 * Streaming page component that shows the streaming page.
 * @returns Streaming page component
 */
function StreamingPage() {
  const { streamId } = useParams();

  const [Stream, setStream] = useState(null);
  const [Streamer, setStreamer] = useState(null);
  // Video Streaming
  const [GSD, setGSD] = useState("");
  const [SendGSD, setSendGSD] = useState("");
  const [StartSession, setStartSession] = useState(false);

  useEffect(() => {
    if (!streamId || StartSession) return;
    // TODO: GET request to get stream information
    setStream(null);
    // TODO: GET request to get streamer information
    setStreamer(null);
  }, [StartSession]);

  // Save session description
  const onGSD = (gsd) => {
    setGSD(gsd);
  };

  // If session started
  const onStartSession = () => {
    setSendGSD(GSD);
    setStartSession(true);
  };

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
        <StreamerInfo streamer={Streamer} />
        <StreamInfo info={Stream} onGSD={onGSD} />
      </div>
    </div>
  );
}

export default StreamingPage;
