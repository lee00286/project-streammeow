import React from "react";
// import { useNavigate } from "react-router-dom";
import module from "../../ApiService";
// Components
import PageTitle from "../Texts/PageTitle";
import ColorButton from "../Buttons/ColorButton";
// Style
import "./UserPage.css";

function NewCreator() {
  // const navigate = useNavigate();

  const onNewCreator = () => {
    module
      .addCreator()
      .then((res) => {
        if (res.error) return console.log(res.error);
        // TODO: Replace window.location.assign with navigate
        // navigate("/");
        window.location.assign("http://localhost:3000/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="grid-body page flex-center col become-creator">
      <PageTitle text="Become a Creator and Share Your Life" />
      <div className="new-description flex-center col">
        <h3>Benefits you will enjoy</h3>
        <div className="new-benefits flex-center">
          <div className="new-benefit flex-center col-3">
            Start a live streaming
          </div>
          <div className="new-benefit flex-center col-3">
            Make posts to your own page
          </div>
          <div className="new-benefit flex-center col-3">
            Provide memberships to subscribers
          </div>
        </div>
        <ColorButton
          text="Become a Creator!"
          textColor="#fff"
          buttonColor="var(--yellow4)"
          buttonFunction={onNewCreator}
        />
      </div>
    </div>
  );
}

export default NewCreator;
