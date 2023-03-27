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
  const [StreamingList, setStreamingList] = useState([]);

  useEffect(() => {
    // Retrieve all streamings
    module
      .getAllStreamings()
      .then((res) => {
        if (res.error) return console.log(res.error);
        const streamingList = res.data.streamings;
        setStreamingList(streamingList);
      })
      .catch((e) => console.log(e));
  }, []);

  const streamingList = StreamingList.map((streaming, index) => (
    <StreamingCard key={`streaming-${index}`} streaming={streaming} />
  ));

  return (
    <div className="grid-body page all-streaming">
      <div className="streaming-slide row">
        <div className="slide-card row">
          <div className="slide-thumbnail col-auto"></div>
          <div className="slide-text col col-7">
            <div className="slide-title">title</div>
            <div className="slide-description">description</div>
          </div>
        </div>
      </div>
      <SubTitle text="On Live" />
      <div className="streaming-list">{streamingList}</div>
      <SubTitle text="Live Replay" />
      <div className="streaming-list">{streamingList}</div>
    </div>
  );
}

export default StreamingListPage;
