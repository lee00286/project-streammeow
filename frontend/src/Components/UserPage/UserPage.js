import React, { useEffect, useState } from "react";
import module from "../../ApiService";
// Components
import PageTitle from "../Texts/PageTitle";
import SubTitle from "../Texts/SubTitle";
// Style
import "./UserPage.css";

/**
 * User History Tab Component that displays user's purchase history.
 * @returns User History Tab Component
 */
function UserHistoryTab() {
  const [UserHistory, setUserHistory] = useState(null);

  if (UserHistory) {
    return (
      <div className="user-tab user-history col-auto col">
        <SubTitle text="User History" />
        <div>
          <div>User History</div>
        </div>
      </div>
    );
  }

  return <div className="user-tab user-history col-auto col">Empty tab</div>;
}

/**
 * User Information Tab Component that displays user's information.
 * User can modify their personal information after clicking the edit button.
 * @returns User Information Tab Component
 */
function UserInfoTab() {
  const [UserInfo, setUserInfo] = useState(null);

  // Get user information
  useEffect(() => {
    // Get userId
    module.getUserId().then((res) => {
      if (res.error) return console.log(res.error);
      if (!res.data.user) return console.log("Failed to load user data");
      setUserInfo(res.data.user);
      console.log(res.data.user);
    });
  }, []);

  if (UserInfo) {
    return (
      <div className="user-tab user-info col-auto col">
        <SubTitle text="User Information" />
        <div>
          <div>Email: {UserInfo.email}</div>
        </div>
      </div>
    );
  }

  return <div className="user-tab user-info col-auto col">Empty tab</div>;
}

function SideBar({ onClickMenu }) {
  const [ClickedPage, setClickedPage] = useState(0);

  // Select user menu
  const onMenu = (menu) => {
    if (!onClickMenu) return;
    setClickedPage(menu);
    onClickMenu(menu);
  };

  return (
    <div className="user-sidebar col-2">
      <div
        className={`sidebar-menu ${ClickedPage === 0 ? "clicked-menu" : ""}`}
        onClick={() => onMenu(0)}
      >
        Menu 1
      </div>
      <div
        className={`sidebar-menu ${ClickedPage === 1 ? "clicked-menu" : ""}`}
        onClick={() => onMenu(1)}
      >
        Menu 2
      </div>
    </div>
  );
}

function UserPage() {
  const [ClickedPage, setClickedPage] = useState(0);
  const [CurrentMenu, setCurrentMenu] = useState(null);

  useEffect(() => {
    switch (ClickedPage) {
      case 0:
        setCurrentMenu(<UserInfoTab />);
        break;
      case 1:
        setCurrentMenu(<UserHistoryTab />);
      default:
        setCurrentMenu(<div>Empty Tab</div>);
    }
  }, [ClickedPage]);

  // Change user menu when the button is clicked
  const onClickMenu = (menu) => {
    setClickedPage(menu);
  };

  return (
    <div className="grid-body page user-page">
      <PageTitle text="My Page" />
      <div className="user-tabs row">
        <SideBar onClickMenu={onClickMenu} />
        {CurrentMenu ?? <div>Empty Tab</div>}
      </div>
    </div>
  );
}

export default UserPage;
