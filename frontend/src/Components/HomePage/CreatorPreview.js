import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function CreatorPreview({ creatorId, userId, name, classname }) {
  const navigate = useNavigate();

  const onCreator = () => {
    navigate(`/creators/${creatorId}`);
  };

  return (
    <div className={classname} onClick={onCreator}>
      <div className="col-2">
        <img
          className="creator-img"
          // src="samples/tintin@2x.png"
          src={`/api/users/${userId}/picture`}
        />
      </div>
      <div className="creator-info col-10">
        <p>{`Creator-${creatorId}`}</p>
      </div>
    </div>
  );
}

export default CreatorPreview;
