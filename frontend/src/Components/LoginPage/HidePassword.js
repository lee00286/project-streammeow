import React from "react";
import { useState } from "react";

import "./LoginPage.css";

function HidePassword(props) {
  const [isVisible, setVisible] = useState(false);
  const [Password, setPassword] = useState("");

  const onPassword = (password) => {
    setPassword(password);
    if (!props.onPassword) return;
    props.onPassword(password);
  };

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
        value={Password}
        onChange={(e) => onPassword(e.target.value)}
        required
      />
      <div className="icon col-2" onClick={toggle}>
        {isVisible ? <button className="show" /> : <button className="hide" />}
      </div>
    </div>
  );
}

export default HidePassword;
