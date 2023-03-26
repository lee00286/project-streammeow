import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import module from "../../ApiService";
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
    <div className="streaming-card col col-3" onClick={onStreaming}>
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
        setStreamingList(res.data.streamings);
      })
      .catch((e) => console.log(e));
  }, []);

  const streamingList = StreamingList.map((streaming, index) => (
    <StreamingCard key={`streaming-${index}`} streaming={streaming} />
  ));

  return (
    <div className="grid-body page streaming-list row">{streamingList}</div>
  );
}

export default StreamingListPage;
