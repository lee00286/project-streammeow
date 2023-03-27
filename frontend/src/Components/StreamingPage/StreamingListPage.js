import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import module from "../../ApiService";
// Components
import SubTitle from "../Texts/SubTitle";
import "./StreamingPage.css";

/**
 * Streaming card component that displays streaming information.
 * @param {Object} streaming: streaming object
 * @param {boolean} isLive: true if the streaming is live
 * @returns Streaming card component
 */
function StreamingCard({ streaming, isLive }) {
  const navigate = useNavigate();

  const [Streaming, setStreaming] = useState(streaming);

  useEffect(() => {
    setStreaming(streaming);
  }, [streaming]);

  // When the card is clicked
  const onStreaming = () => {
    if (isLive) navigate(`/streaming/${Streaming.creatorId}`);
    else navigate(`/streaming/replay?streaming=${Streaming.id}`);
    // TODO: Make a page for replay (use save-to-disk in Pion)
  };

  return (
    <div className="streaming-card col" onClick={onStreaming}>
      <div className="card-thumbnail"></div>
      <div className="card-title">{Streaming.title}</div>
      <div className="card-description">{Streaming.description}</div>
    </div>
  );
}

/**
 * Streaming list component that displays streaming cards.
 * @param {Array} streamingList: list of streamings
 * @param {boolean} isLive: true if the streaming is live
 * @returns Streaming list component
 */
function StreamingList({ streamingList, isLive }) {
  const [StreamingList, setStreamingList] = useState([]);
  const [EmptyString, setEmptyString] = useState("");

  useEffect(() => {
    // Set message when there is no streaming to display
    if (isLive) setEmptyString("No live streaming");
    else setEmptyString("No live replay");
    // Set streaming list
    if (!streamingList) return;
    setStreamingList(streamingList);
  }, [streamingList, isLive]);

  // List of streamings
  const liveList = StreamingList.map((streaming, index) => (
    <StreamingCard
      key={`streaming-${index}`}
      streaming={streaming}
      isLive={isLive}
    />
  ));

  // If streaming list is not empty
  if (StreamingList && StreamingList !== [] && StreamingList.length > 0) {
    return <div className="streaming-list">{liveList}</div>;
  }

  // If there is no streaming to display
  return <div className="streaming-empty">{EmptyString}</div>;
}

/**
 * Streaming slide component that displays a few streamings in header.
 * @returns Streaming list component
 */
function StreamingSlide() {
  // TODO: Get a few streamings that are live or live replay
  // TODO: Re-design UI

  return (
    <div className="streaming-slide row">
      <div className="slide-card row">
        <div className="slide-thumbnail col-auto"></div>
        <div className="slide-text col col-8">
          <div className="slide-title">title</div>
          <div className="slide-description">description</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Streaming list page component that displays all streamings.
 * @returns Streaming list page component
 */
function StreamingListPage() {
  const [LiveList, setLiveList] = useState([]);
  const [LiveReplayList, setLiveReplayList] = useState([]);

  useEffect(() => {
    // Retrieve all streamings
    module
      .getAllStreamings()
      .then((res) => {
        if (res.error) return console.log(res.error);
        const streamingList = res.data.streamings;
        // Set streaming list by live and live replay
        const liveList = [];
        const liveReplayList = [];
        // TODO: Change this to use the backend with pagination
        streamingList.forEach((streaming) => {
          if (streaming.isEnded === null || streaming.isEnded === false)
            liveList.push(streaming);
          else liveReplayList.push(streaming);
        });
        setLiveList(liveList);
        setLiveReplayList(liveReplayList);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="grid-body page all-streaming">
      <StreamingSlide />
      <SubTitle text="On Live" />
      <StreamingList streamingList={LiveList} isLive={true} />
      <SubTitle text="Live Replay" />
      <StreamingList streamingList={LiveReplayList} isLive={false} />
    </div>
  );
}

export default StreamingListPage;
