import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../StreamingPage.css";
const STREAMING_HOST = process.env.REACT_APP_STREAMING_HOST || "localhost";
const STREAMING_PORT = process.env.REACT_APP_STREAMING_PORT || 8080;

function ExamplePage() {
  const videoRef = useRef(null);

  // Golang base64 Session Description
  const [GSD, setGSD] = useState("");
  const [PeerConnection, setPeerConnection] = useState(null);
  const [Controls, setControls] = useState(true);
  const [Log, setLog] = useState("");

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    pc.oniceconnectionstatechange = (e) => onLog(pc.iceConnectionState);
    onIceCandidate(pc);
    setPeerConnection(pc);
  }, []);

  const onIceCandidate = (pc) => {
    pc.onicecandidate = async (event) => {
      if (event.candidate === null) {
        // Browser base64 Session Description
        const sessionDescription = btoa(JSON.stringify(pc.localDescription));
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
        }
      }
    };
  };

  // Write log
  const onLog = (msg) => {
    setLog(msg);
  };

  // Create session
  const createSession = (isCreator) => {
    if (PeerConnection === null) return;
    onIceCandidate(PeerConnection);
    // If user is creator
    if (isCreator) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          stream
            .getTracks()
            .forEach((track) => PeerConnection.addTrack(track, stream));
          videoRef.current.srcObject = stream;
          PeerConnection.createOffer()
            .then((d) => PeerConnection.setLocalDescription(d))
            .catch(onLog);
        })
        .catch(onLog);
    } else {
      // If user is subscriber
      PeerConnection.addTransceiver("video");
      PeerConnection.createOffer()
        .then((d) => PeerConnection.setLocalDescription(d))
        .catch(onLog);
      PeerConnection.ontrack = function (event) {
        videoRef.current.srcObject = event.streams[0];
        setControls(true);
      };
    }
  };

  // Start streaming session
  const startSession = () => {
    const sessionDescription = GSD;
    // If session description is empty
    if (sessionDescription === "") {
      return alert("Session Description must not be empty");
    }
    try {
      // Set sessionDescription of remote peer
      PeerConnection.setRemoteDescription(JSON.parse(atob(sessionDescription)));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <div className="stream-video col col-8">
        <video controls={Controls} muted ref={videoRef}></video>
      </div>
      <button onClick={() => createSession(true)}>Publish a live</button>
      <button onClick={() => createSession(false)}>Join live</button>
      <button onClick={startSession}>Start Session</button>
      <div id="logs">Logs: {Log}</div>
    </div>
  );
}

export default ExamplePage;
