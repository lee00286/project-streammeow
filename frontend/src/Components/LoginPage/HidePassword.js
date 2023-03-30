import React from "react";
import { useState } from "react";

import "./LoginPage.css";

function HidePassword() {
  const [isVisible, setVisible] = useState(false);
  const toggle = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="login-input row">
      <input
        className="input-password col-10"
        type={!isVisible ? "password" : "text"}
        label="PASSWORD"
        placeholder="Password"
        required
      />
      <div className="icon col-2" onClick={toggle}>
        {isVisible ? <button className="show" /> : <button className="hide" />}
      </div>
    </div>
  );
}

export default HidePassword;
