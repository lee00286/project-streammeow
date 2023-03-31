import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import module from "../../ApiService";
import calculations from "../calculations";
import { ResponsiveBar } from "@nivo/bar";
// Components
import PageTitle from "../Texts/PageTitle";
import SubTitle from "../Texts/SubTitle";
import ColorButton from "../Buttons/ColorButton";
// Style
import "./UserPage.css";

let menuList = ["User Information", "Purchase History", "Creator's Menu"];

/**
 * Creator's Tab Component that displays user's history as a creator.
 * @param {Object} creator: creator information of current user
 * @returns Creator's Tab Component
 */
function CreatorsTab({ creator }) {
  const navigate = useNavigate();

  const [Creator, setCreator] = useState(null);
  const [NivoData, setNivoData] = useState([]);

  useEffect(() => {
    if (!creator) return;
    setCreator(creator);
    module
      .getAllMemberships(creator.id)
      .then((res) => {
        if (res.error) return console.log(res.error);
        const memberships = res.data.memberships;
        let data = [];
        // Set up membership data
        for (let i = 0; i < memberships.length; i++) {
          data.push({
            membership: memberships[i].name,
            price: memberships[i].price,
            subscriber: memberships[i].subscribers
              ? memberships[i].subscribers.length
              : 0,
            subscriberColor: "hsl(66, 70%, 50%)",
          });
        }
        setNivoData(data);
      })
      .catch((e) => console.log(e));
  }, [creator]);

  if (Creator) {
    return (
      <div className="user-tab creator-history col-auto col">
        <SubTitle text="Subscription Count" />
        <div>
          <div className="nivo-graph">
            <ResponsiveBar
              data={NivoData}
              keys={["subscriber"]}
              indexBy="membership"
              margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "membership",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "number of subscribers",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              role="application"
            />
          </div>
        </div>
      </div>
    );
  }

  // Become the creator and navigate to creator's page
  const onCreator = () => {
    navigate("/becomecreator");
  };

  return (
    <div className="user-tab col-auto col">
      <SubTitle text="Creator's Menu" />
      <div className="flex-center">
        <ColorButton
          buttonColor="var(--yellow4)"
          textColor="#fff"
          text="Become a Creator"
          buttonFunction={onCreator}
        />
      </div>
    </div>
  );
}

/**
 * User History Tab Component that displays user's purchase history.
 * @returns User History Tab Component
 */
function UserHistoryTab() {
  const [UserHistory, setUserHistory] = useState(null);
  const [Subscription, setSubscription] = useState([]);

  // Get user information
  useEffect(() => {
    if (Subscription.length > 0) return;
    // Get userId
    module
      .getUserId()
      .then((res) => {
        if (res.error) return console.log(res.error);
        if (!res.data.user) return console.log("Failed to load user data");
        setUserHistory(res.data.user);
        // Subscription
        if (!res.data?.user?.subscription) return;
        return res.data.user.subscription;
      })
      .then((subscription) => {
        const subscriptionList = [];
        for (let i = 0; i < subscription.length; i++) {
          const splittedText = subscription[i].split("+");
          subscriptionList.push({
            membershipId: splittedText[0],
            date: splittedText[1],
          });
          // // Get membership detail
          // const detail = module.getMembershipById(splittedText[0]).then((res) => {
          //   if (res.error) return console.log(res.error);
          //   return res;
          // }).then((data) => {
          //   if (!data?.name || !data.description || !data.price) return;
          //   const variables = {
          //     membershipId: splittedText[0],
          //     date: splittedText[1],
          //     name: data.name,
          //     description: data.description,
          //     price: data.price,
          //   };
          //   subscriptionList.push(variables);
          // }).catch((e) => console.log(e));
        }
        setSubscription(subscriptionList);
      });
  }, []);

  const subscriptions =
    Subscription && Subscription.length > 0 ? (
      Subscription.map((subscription, index) => {
        return (
          <div key={`subscribing-${index}`} className="history-subscript row">
            <div>{calculations.convertDate(parseInt(subscription.date))}</div>
          </div>
        );
      })
    ) : (
      <div></div>
    );

  if (UserHistory) {
    return (
      <div className="user-tab user-history col-auto col">
        <SubTitle text="Subscriptions" />
        <div>{subscriptions}</div>
      </div>
    );
  }

  return (
    <div className="user-tab col-auto col">
      <SubTitle text="User History" />
      <div className="flex-center">Empty</div>
    </div>
  );
}

/**
 * User Information Tab Component that displays user's information.
 * User can modify their personal information after clicking the edit button.
 * @returns User Information Tab Component
 */
function UserInfoTab() {
  const [UserInfo, setUserInfo] = useState(null);
  const [IsModify, setIsModify] = useState(false);
  // Modify
  const [ModifyName, setModifyName] = useState(null);
  const [ModifyEmail, setModifyEmail] = useState(null);

  // Get user information
  useEffect(() => {
    // Get userId
    module.getUserId().then((res) => {
      if (res.error) return console.log(res.error);
      if (!res.data.user) return console.log("Failed to load user data");
      setUserInfo(res.data.user);
    });
  }, [IsModify]);

  // Set up initial data for editing user information
  useEffect(() => {
    if (!UserInfo) return;
    // Set up initial data for user
    if (UserInfo.name) setModifyName(UserInfo.name);
    if (UserInfo.email) setModifyEmail(UserInfo.email);
  }, [IsModify]);

  const onInfoEdit = () => {
    // Start modifying user information
    setIsModify(true);
  };

  const onModifyUser = () => {
    if (!UserInfo) return;
    // Variables to modify
    const variables = {
      name: ModifyName,
      email: ModifyEmail,
    };
    // Modify user information
    module
      .updateUser(UserInfo.id, variables)
      .then((res) => {
        if (res.error) return console.log(res.error);
        // Remove modifying forms
        setIsModify(false);
      })
      .catch((e) => console.log(e));
  };

  const onChangePassword = () => {
    // TODO: Change password
  };

  if (UserInfo && IsModify) {
    return (
      <div className="user-tab user-info col-auto col">
        <div className="info-header row">
          <SubTitle text="User Information" />
        </div>
        <div className="info-list info-modify col">
          <p className="info-title">Name</p>
          <input
            value={ModifyName ?? ""}
            onChange={(e) => setModifyName(e.target.value)}
          />
          <p className="info-title">Email</p>
          <input
            value={ModifyEmail ?? ""}
            onChange={(e) => setModifyEmail(e.target.value)}
          />
          <p className="info-title">Date Registered</p>
          <p className="info-detail">
            {UserInfo.createdAt
              ? calculations.convertDate(UserInfo.createdAt)
              : "N/A"}
          </p>
          <div className="user-modify-buttons row">
            <ColorButton
              text="Modify"
              textColor="#fff"
              buttonColor="var(--yellow4)"
              buttonFunction={onModifyUser}
            />
            <ColorButton
              text="Cancel"
              textColor="var(--yellow4)"
              border="1px solid var(--yellow4)"
              buttonFunction={() => setIsModify(false)}
            />
          </div>
        </div>
        <SubTitle text="Password" />
        <ColorButton
          text="Change Password"
          border="1px solid var(--yellow4)"
          buttonColor="#fff"
          textColor="var(--yellow4)"
          buttonFunction={onChangePassword}
        />
      </div>
    );
  }

  if (UserInfo && !IsModify) {
    return (
      <div className="user-tab user-info col-auto col">
        <div className="info-header row">
          <SubTitle text="User Information" />
          <button onClick={onInfoEdit}>Edit</button>
        </div>
        <div className="info-list col">
          <p className="info-title">Name</p>
          <p className="info-detail">{UserInfo.name ?? "N/A"}</p>
          <p className="info-title">Email</p>
          <p className="info-detail">{UserInfo.email ?? "N/A"}</p>
          <p className="info-title">Date Registered</p>
          <p className="info-detail">
            {UserInfo.createdAt
              ? calculations.convertDate(UserInfo.createdAt)
              : "N/A"}
          </p>
        </div>
        <SubTitle text="Password" />
        <ColorButton
          text="Change Password"
          border="1px solid var(--yellow4)"
          buttonColor="#fff"
          textColor="var(--yellow4)"
          buttonFunction={onChangePassword}
        />
      </div>
    );
  }

  return <div className="user-tab col-auto flex-center">Empty</div>;
}

function SideBar({ onClickMenu }) {
  const [ClickedPage, setClickedPage] = useState(0);

  // Select user menu
  const onMenu = (menu) => {
    if (!onClickMenu) return;
    setClickedPage(menu);
    onClickMenu(menu);
  };

  // List of menu items in the sidebar
  const menuItems = menuList.map((menu, index) => {
    return (
      <div
        key={index}
        className={`sidebar-menu ${
          ClickedPage === index ? "clicked-menu" : ""
        }`}
        onClick={() => onMenu(index)}
      >
        {menu}
      </div>
    );
  });

  return (
    <div className="user-sidebar col-2">
      {menuList && menuList.length > 0 ? menuItems : <div></div>}
    </div>
  );
}

function UserPage() {
  const [ClickedPage, setClickedPage] = useState(0);
  const [CurrentMenu, setCurrentMenu] = useState(null);
  const [Creator, setCreator] = useState(null);

  useEffect(() => {
    module.getUserId().then((res) => {
      // If the user is not authenticated
      if (!res.data.user?.id) return;
      // If the user is creator
      module
        .getCreatorByUserId(res.data.user.id)
        .then((res) => {
          if (res.error) return console.log(res.error);
          setCreator(res.data.creator);
        })
        .catch((e) => console.log(e));
    });
  }, [ClickedPage]);

  useEffect(() => {
    switch (ClickedPage) {
      case 0:
        setCurrentMenu(<UserInfoTab />);
        break;
      case 1:
        setCurrentMenu(<UserHistoryTab />);
        break;
      case 2:
        setCurrentMenu(<CreatorsTab creator={Creator} />);
        break;
      default:
        setCurrentMenu(
          <div className="user-tab col-auto flex-center">Empty tab</div>
        );
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
        {CurrentMenu ?? (
          <div className="user-tab col-auto flex-center">Empty tab</div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
