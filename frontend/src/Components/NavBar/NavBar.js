import React from "react";
import { useNavigate } from "react-router-dom";
// Style
import "./NavBar.css";
import MenuButton from "../Buttons/MenuButton";
import ColorButton from "../Buttons/ColorButton";

const isAuth = false; // Temporary variable that should be replaced after auth implementation

/**
 * Navigation bar component that directs users to different pages.
 * @returns Navigation bar component
 */
function NavBar() {
  const navigate = useNavigate();

  // Navigate to home
  const onLogo = () => {
    navigate("/");
  };

  // Navigate to login
  const onLogIn = () => {
    navigate("/signin");
  };

  // Navigate to register
  const onRegister = () => {
    navigate("/signup");
  };

  return (
    <div className="navigation row align-items-center">
      <div className="logo-img col-2">
        <img src="logo2.png" onClick={onLogo} />
      </div>
      <div className="nav-menu row col-auto">
        <MenuButton text="About" textColor="var(--yellow4)" />
        <MenuButton text="Streaming" textColor="var(--yellow4)" />
        <MenuButton text="Artworks" textColor="var(--yellow4)" />
      </div>
      <div className="nav-buttons col-3">
        {!isAuth && (
          <ColorButton
            buttonColor="#fff"
            border="1px solid var(--yellow4)"
            textColor="var(--yellow4)"
            text="Log In"
            buttonFunction={onLogIn}
          />
        )}
        {!isAuth && (
          <ColorButton
            buttonColor="var(--yellow4)"
            textColor="#fff"
            text="Register"
            buttonFunction={onRegister}
          />
        )}
      </div>
    </div>
  );
}

export default NavBar;
