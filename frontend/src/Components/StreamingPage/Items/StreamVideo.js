import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../StreamingPage.css";

const STREAMING_HOST = process.env.REACT_APP_STREAMING_HOST || "localhost";
const STREAMING_PORT = process.env.REACT_APP_STREAMING_PORT || 8080;

const config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

/**
 * Stream video component, which uses Pion WebRTC.
 * @param {boolean} isCreator: if streaming is accessed by the creator
 * @param {boolean} hasStartVideo: if video is started
 * @param {boolean} hasStartSession: if streaming is started
 * @param {string} gsd: Golang base64 session description
 * @param {function} onStartSession: function to start watching streaming
 * @returns Stream video component
 */
function StreamVideo({
  isCreator = false,
  hasStartVideo = false,
  hasStartSession = false,
  gsd = "",
  onStartSession,
}) {
  const videoRef = useRef(null);

  const [PeerConnection, setPeerConnection] = useState(null);
  const [GSD, setGSD] = useState("");
  const [Controls, setControls] = useState(true);
  const [Log, setLog] = useState("");

  useEffect(() => {
    // Set GSD manually
    // TODO: Fix main.go and http.go to get GSD from request
    if (!gsd && gsd !== "") setGSD(gsd);
  }, [gsd]);

  useEffect(() => {
    const pc = new RTCPeerConnection(config);
    pc.oniceconnectionstatechange = (e) => onLog(pc.iceConnectionState);
    onIceCandidate(pc);
    setPeerConnection(pc);
    // If video is started, create session
    if (hasStartVideo) {
      if (isCreator) createCreatorSession(pc);
      else createSubscriberSession(pc);
      console.log(GSD);
      // If session is started, start streaming
      if (hasStartSession && GSD !== "") {
        console.log(GSD);
        startSession();
      }
    }
  }, [isCreator, hasStartVideo, hasStartSession]);

  const onIceCandidate = (pc) => {
    pc.onicecandidate = async (event) => {
      if (event.candidate === null) {
        // Browser base64 Session Description
        const sessionDescription = btoa(JSON.stringify(pc.localDescription));
        console.log(sessionDescription);
        // Send local session description to get golang session description
        const response = await axios.post(
          // `http://${STREAMING_HOST}:${STREAMING_PORT}/sdp`,
          `http://localhost:${STREAMING_PORT}/sdp`,
          sessionDescription,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(response);
        if (
          response.status === 200 &&
          response.data !== null &&
          response.data !== ""
        ) {
          // Remove "done"
          // const gsd = response.data;
          // const gsd = response.data.slice(4);
          const gsd = response.data.slice(0, -4);
          setGSD(gsd);
        }
      }
    };
  };

  // Create session for creator
  const createCreatorSession = (pc) => {
    if (pc === null || !isCreator) return;
    onIceCandidate(pc);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        videoRef.current.srcObject = stream;
        pc.createOffer()
          .then((d) => pc.setLocalDescription(d))
          .catch(onLog);
      })
      .catch(onLog);
  };

  // Create session for subscriber
  const createSubscriberSession = (pc) => {
    console.log("?");
    if (pc === null || isCreator) return;
    console.log("??");
    onIceCandidate(pc);
    pc.addTransceiver("video");
    pc.createOffer()
      .then((d) => pc.setLocalDescription(d))
      .catch(onLog);
    pc.ontrack = function (event) {
      videoRef.current.srcObject = event.streams[0];
      setControls(true);
    };
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
      if (onStartSession) onStartSession();
    } catch (e) {
      alert(e);
    }
  };

  // Write log
  const onLog = (msg) => {
    console.log(msg);
    setLog(msg);
  };

  return (
    <div className="stream-video col col-8">
      <video controls={Controls} muted ref={videoRef}></video>
    </div>
  );
}

export default StreamVideo;
