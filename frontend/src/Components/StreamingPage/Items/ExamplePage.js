import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../StreamingPage.css";
const STREAMING_HOST = process.env.STREAMING_HOST || "localhost";
const STREAMING_PORT = process.env.STREAMING_PORT || 8080;

function ExamplePage() {
  const videoRef = useRef(null);

  const [PeerConnection, setPeerConnection] = useState(null);
  const [AutoPlay, setAutoPlay] = useState(true);
  const [Controls, setControls] = useState(true);
  const [HideSignal, setHideSignal] = useState(true);
  const [HideButton, setHideButton] = useState(false);
  const [Log, setLog] = useState("");
  // Browser base64 Session Description
  const [SessionDescription, setSessionDescription] = useState("");
  // Golang base64 Session Description
  const [GSD, setGSD] = useState("");

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    pc.oniceconnectionstatechange = (e) => log(pc.iceConnectionState);
    pc.onicecandidate = async (event) => {
      if (event.candidate === null) {
        const sessionDescription = btoa(JSON.stringify(pc.localDescription));
        setSessionDescription(sessionDescription);
        // Send local session description to get golang session description
        const response = await axios.post(
          `http://${STREAMING_HOST}:${STREAMING_PORT}/sdp`,
          sessionDescription,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (
          response.status === 200 &&
          response.data !== null &&
          response.data !== ""
        ) {
          // Remove "done"
          const gsd = response.data.slice(4);
          setGSD(gsd);
          console.log(gsd);
        }
      }
    };
    setPeerConnection(pc);
  }, []);

  const log = (msg) => {
    setLog(msg + "<br>");
  };

  const createSession = (isPublisher) => {
    if (PeerConnection === null) return;
    if (isPublisher) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          stream
            .getTracks()
            .forEach((track) => PeerConnection.addTrack(track, stream));
          videoRef.current.srcObject = stream;
          PeerConnection.createOffer()
            .then((d) => PeerConnection.setLocalDescription(d))
            .catch(log);
        })
        .catch(log);
    } else {
      PeerConnection.addTransceiver("video");
      PeerConnection.createOffer()
        .then((d) => PeerConnection.setLocalDescription(d))
        .catch(log);
      PeerConnection.ontrack = function (event) {
        videoRef.current.srcObject = event.streams[0];
        setAutoPlay(true);
        setControls(true);
      };
    }

    setHideButton(true);
    setHideSignal(false);
  };

  const startSession = () => {
    console.log(GSD);
    const sd = GSD;
    if (sd === "") {
      return alert("Session Description must not be empty");
    }

    try {
      PeerConnection.setRemoteDescription(JSON.parse(atob(sd)));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <div className={HideSignal ? "display-none" : "display-block"}>
        Browser base64 Session Description
        <textarea
          id="localSessionDescription"
          value={SessionDescription}
          readOnly={true}
        ></textarea>
        Golang base64 Session Description
        <textarea id="remoteSessionDescription"></textarea>
        <button onClick={startSession}> Start Session </button>
      </div>
      <div className="stream-video col col-8">
        <video
          id="video1"
          width="160"
          height="120"
          autoPlay={AutoPlay}
          muted
          controls={Controls}
          ref={videoRef}
        ></video>
      </div>
      <button
        className={`createSessionButton ${
          HideButton ? "display-none" : "display-block"
        }`}
        onClick={() => createSession(true)}
      >
        Publish a Broadcast
      </button>
      <button
        className={`createSessionButton ${
          HideButton ? "display-none" : "display-block"
        }`}
        onClick={() => createSession(false)}
      >
        Join a Broadcast
      </button>
      Logs
      <div id="logs">{Log}</div>
    </div>
  );
}

export default ExamplePage;
