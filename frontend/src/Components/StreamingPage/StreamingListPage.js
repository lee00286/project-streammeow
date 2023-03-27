import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import module from "../../ApiService";
// Components
import SubTitle from "../Texts/SubTitle";
import "./StreamingPage.css";

function StreamingCard({ streaming }) {
  const navigate = useNavigate();

  const [Streaming, setStreaming] = useState(streaming);

  useEffect(() => {
    setStreaming(streaming);
  }, [streaming]);

  const onStreaming = () => {
    navigate(`/streaming/${Streaming.creatorId}`);
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
 * Streaming list page component that displays all streamings.
 * @returns Streaming list page component
 */
function StreamingListPage() {
  const [LiveList, setLiveList] = useState([]);
  const [LiveReplayList, setLiveReplayList] = useState([]);
  const [StreamingList, setStreamingList] = useState([]);

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

  // List of streamings that are currently on live
  const liveList =
    LiveList && LiveList.length > 0 ? (
      LiveList.map((streaming, index) => {
        if (streaming.isEnded === null || streaming.isEnded === false)
          return (
            <StreamingCard key={`streaming-${index}`} streaming={streaming} />
          );
      })
    ) : (
      <div className="streaming-empty">No live streaming</div>
    );

  // List of streamings that are ended
  const liveReplayList =
    LiveReplayList && LiveReplayList.length > 0 ? (
      LiveReplayList.map((streaming, index) => (
        <StreamingCard key={`streaming-${index}`} streaming={streaming} />
      ))
    ) : (
      <div className="streaming-empty">No live replay</div>
    );

  return (
    <div className="grid-body page all-streaming">
      <div className="streaming-slide row">
        <div className="slide-card row">
          <div className="slide-thumbnail col-auto"></div>
          <div className="slide-text col col-8">
            <div className="slide-title">title</div>
            <div className="slide-description">description</div>
          </div>
        </div>
      </div>
      <SubTitle text="On Live" />
      {LiveList && LiveList.length > 0 ? (
        <div className="streaming-list">{liveList}</div>
      ) : (
        <div className="streaming-empty">No live streaming</div>
      )}
      <SubTitle text="Live Replay" />
      {LiveReplayList && LiveReplayList.length > 0 ? (
        <div className="streaming-list">{liveReplayList}</div>
      ) : (
        <div className="streaming-empty">No live replay</div>
      )}
    </div>
  );
}

export default StreamingListPage;
