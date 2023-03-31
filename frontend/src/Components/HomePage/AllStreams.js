import React from "react";
import "./HomePage.css";

function AllStreams() {
  return (
    <div className="all-streams page col">
      <div className="title-container row">
        <div className="title col-10">
          <p>STREAMS</p>
        </div>
      </div>
      <div className="videos-box col">
        <div className="video-box row">
          <div className="col-4">
            <div className="video-image">
              <div className="live-tag"></div>
              <img
                className="video-img"
                src="samples/IMG_2564.webp"
                alt="video"
              />
            </div>
          </div>
          <div className="info-box col-6">
            <div className="title-name">video title</div>
            <div className="author-box row">
              <div className="author col-2">
                <img
                  className="author-img"
                  src="samples/tintin@2x.png"
                  alt="author"
                />
              </div>
              <div className="author-name col-10">author name</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllStreams;
