import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import module from "../../ApiService";
// Components
import PageTitle from "../Texts/PageTitle";
import ColorButton from "../Buttons/ColorButton";
import Alert from "../Alert/Alert";
// Style
import "./UserPage.css";

function NewCreator() {
  const navigate = useNavigate();

  const [ErrorLog, setErrorLog] = useState("");

  const onNewCreator = () => {
    module
      .addCreator()
      .then((res) => {
        if (res.error) return setErrorLog(res.error);
        navigate(0);
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
  };

  return (
    <div className="grid-body page flex-center col become-creator">
      <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
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
