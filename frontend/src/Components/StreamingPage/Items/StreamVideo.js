import React from "react";

function StreamVideo() {
  return (
    <div className="stream-video col col-8">
      <div></div>
      <div className="setting-bar row">
        <img src="/icons/sound.png" className="setting-icon" />
        <img src="/icons/settings.png" className="setting-icon" />
        <img src="/icons/fullscreen.png" className="setting-icon" />
        {/* <img src="/icons/fullscreen_exit.png" className="setting-icon" /> */}
      </div>
    </div>
  );
}

export default StreamVideo;
