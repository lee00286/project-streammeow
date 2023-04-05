import React from "react";
import "./Alert.css";

function Alert({ text, isError, isSuccess, hide = true }) {
  if (hide) return <div></div>;

  return (
    <div className={`alert row popup`}>
      {isError ? (
        <div className="alert-element alert-error flex-center">
          <img src="/icons/caution.png" />
          <p>{text}</p>
        </div>
      ) : isSuccess ? (
        <div className="alert-element alert-success flex-center">
          <img src="/icons/complete.png" />
          <p>{text}</p>
        </div>
      ) : (
        <div className="alert-element flex-center">
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

export default Alert;
