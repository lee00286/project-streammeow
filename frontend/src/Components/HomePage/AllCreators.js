import React from "react";
import "./HomePage.css";

function AllCreators() {
  return (
    <div className="all-creators page col">
      <div className="title-container row">
        <div className="title col-10">
          <p>CREATORS</p>
        </div>
      </div>
      <div className="creators-box col">
        <div className="creator-box row">
          <div className="col-2">
            <img
              className="creator-img"
              src="samples/tintin@2x.png"
              alt="tintin"
            />
          </div>
          <div className="creator-info col-10">
            <p>Tin tin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCreators;
