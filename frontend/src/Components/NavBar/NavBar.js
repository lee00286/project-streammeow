import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import module from "../../ApiService";
// Components
import MenuButton from "../Buttons/MenuButton";
import ColorButton from "../Buttons/ColorButton";
// Style
import "./NavBar.css";

const isAuth = false; // Temporary variable that should be replaced after auth implementation

/**
 * Navigation bar component that directs users to different pages.
 * @returns Navigation bar component
 */
function NavBar({ userId }) {
  const navigate = useNavigate();

  const [UserId, setUserId] = useState("");
  const [IsCreator, setIsCreator] = useState(false);

  useEffect(() => {
    // Get user id
    module.getUserId().then((res) => {
      if (res.data.user === undefined) return;
      setUserId(res.data.user.id);
      // TODO: Change after creator field is created in User
      setIsCreator(res.data.user.id === 1);
    });
  }, [userId]);

  // Navigate to home
  const onLogo = () => {
    navigate("/");
  };

  // Navigate to credit
  const onCredit = () => {
    navigate("/credits");
  };

  // Navigate to streaming
  const onStreaming = () => {
    navigate("/streaming");
  };

  // Navigate to login
  const onLogIn = () => {
    navigate("/signin");
  };

  // Navigate to register
  const onRegister = () => {
    navigate("/signup");
  };

  // Sign out
  const onSignOut = () => {
    // Signout
    module
      .UserLogout()
      .then((res) => {
        if (res.data.success) {
          setTimeout(function () {
            alert("Successfully signed out.");
            setUserId("");
            navigate("/");
          }, 500);
        }
      })
      .catch((e) => console.log(e));
  };

  // Navigate to user streaming page
  const onStartLive = () => {
    if (UserId === "") return;
    navigate(`/streaming/${UserId}`);
  };

  return (
    <div className="navigation row align-items-center no-select">
      <div className="logo-img col-2">
        <img src="/logo2.png" onClick={onLogo} />
      </div>
      <div className="nav-menu row col-auto">
        <MenuButton text="About" textColor="var(--yellow4)" />
        <MenuButton
          text="Streaming"
          textColor="var(--yellow4)"
          buttonFunction={onStreaming}
        />
        <MenuButton
          text="Credits"
          textColor="var(--yellow4)"
          buttonFunction={onCredit}
        />
      </div>
      {!UserId && (
        <div className="nav-buttons row col-3">
          <ColorButton
            buttonColor="#fff"
            border="1px solid var(--yellow4)"
            textColor="var(--yellow4)"
            text="Log In"
            buttonFunction={onLogIn}
          />
          <ColorButton
            buttonColor="var(--yellow4)"
            textColor="#fff"
            text="Register"
            buttonFunction={onRegister}
          />
        </div>
      )}
      {UserId && (
        <div className="nav-buttons row col-3">
          <ColorButton
            buttonColor="#fff"
            border="1px solid var(--yellow4)"
            textColor="var(--yellow4)"
            text="Start Live"
            buttonFunction={onStartLive}
          />
          <ColorButton
            buttonColor="var(--yellow4)"
            textColor="#fff"
            text="Sign Out"
            buttonFunction={onSignOut}
          />
        </div>
      )}
    </div>
  );
}

export default NavBar;
