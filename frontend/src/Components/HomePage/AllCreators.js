import React, { useEffect, useState } from "react";
import module from "../../ApiService";
import CreatorPreview from "./CreatorPreview";
import Alert from "../Alert/Alert";
import "./HomePage.css";

function AllCreators() {
  const [Creators, setCreators] = useState([]);
  const [ErrorLog, setErrorLog] = useState("");

  useEffect(() => {
    module
      .getAllCreators()
      .then((res) => {
        if (res.error) return setErrorLog(res.error);
        setCreators(res.data.creators);
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
  }, []);

  const creatorList =
    Creators && Creators !== [] && Creators.length > 0 ? (
      Creators.map((creator, index) => {
        return (
          <CreatorPreview
            key={index}
            creatorId={creator.id}
            userId={creator.userId}
            name={creator.name}
            classname="creator-box row"
          />
        );
      })
    ) : (
      <div>No Creators</div>
    );

  return (
    <div className="all-creators page col">
      <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
      <div className="title-container row">
        <div className="title col-10">
          <p>CREATORS</p>
        </div>
      </div>
      <div className="creators-box col">{creatorList}</div>
    </div>
  );
}

export default AllCreators;
