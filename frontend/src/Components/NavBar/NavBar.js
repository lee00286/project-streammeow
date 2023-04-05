import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import module from "../../ApiService";
// Components
import MenuButton from "../Buttons/MenuButton";
import ColorButton from "../Buttons/ColorButton";
import Alert from "../Alert/Alert";
// Style
import "./NavBar.css";

/**
 * Navigation bar component that directs users to different pages.
 * @param {number} userId: id of the user
 * @param {number} creatorId: id of the streamer
 * @returns Navigation bar component
 */
function NavBar({ userId, creatorId }) {
  const navigate = useNavigate();
  const { logout, user, isAuthenticated, isLoading } = useAuth0();

  const [UserId, setUserId] = useState("");
  const [CreatorId, setCreatorId] = useState("");
  const [IsCreator, setIsCreator] = useState(false);
  const [UserHover, setUserHover] = useState(false);
  const [ErrorLog, setErrorLog] = useState("");

  useEffect(() => {
    setUserId(userId);
    setCreatorId(creatorId);
    setIsCreator(creatorId !== null);
  }, [userId, creatorId]);

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
    module.UserLogout().then((res) => {
      if (res.data.success) {
        setTimeout(function () {
          setErrorLog("Successfully signed out.");
          setUserHover(false);
          setUserId("");
          navigate(0);
        }, 500);
      }
    });
  };

  // Navigate to mypage (user page)
  const onMyPage = () => {
    navigate("/mypage");
  };

  const onCreatorPage = () => {
    navigate(`/creators/${CreatorId}`);
  };

  // Become the creator and navigate to creator's page
  const onCreator = () => {
    navigate("/becomecreator");
  };

  // Navigate to user streaming page
  const onStartLive = () => {
    if (UserId === "") return;
    navigate(`/streaming/${UserId}`);
  };

  return (
    <div className="navigation row align-items-center no-select">
      <Alert text={ErrorLog} isSuccess={true} hide={ErrorLog === ""} />
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
      {UserId || isAuthenticated ? (
        <div className="nav-buttons row col-3">
          {IsCreator ? (
            <ColorButton
              buttonColor="#fff"
              border="1px solid var(--yellow4)"
              textColor="var(--yellow4)"
              text="Start Live"
              buttonFunction={onStartLive}
            />
          ) : (
            <ColorButton
              buttonColor="#fff"
              border="1px solid var(--yellow4)"
              textColor="var(--yellow4)"
              text="Become a Creator"
              buttonFunction={onCreator}
            />
          )}
          <div
            onMouseEnter={() => setUserHover(true)}
            onMouseLeave={() => setUserHover(false)}
            className="nav-user-menu row"
          >
            <img
              src={`/api/users/${UserId}/picture`}
              // alt="/icons/user.png"
              className="user-icon"
            />
          </div>
        </div>
      ) : (
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
        <div
          onMouseEnter={() => setUserHover(true)}
          onMouseLeave={() => setUserHover(false)}
          className={`nav-submenu row ${UserHover ? "" : "hidden"}`}
        >
          <div className="submenu-button" onClick={onMyPage}>
            My Page
          </div>
          {IsCreator && CreatorId && (
            <div className="submenu-button" onClick={onCreatorPage}>
              Creator's Page
            </div>
          )}
          <div className="submenu-button" onClick={onSignOut}>
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
