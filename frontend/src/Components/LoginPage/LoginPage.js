import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import "./LoginPage.css";
import module from "../../ApiService";
import { playFile } from "../webAudioAPI";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

function LoginPage() {
  const navigate = useNavigate();

  const [ErrorLog, setErrorLog] = useState("");

  useEffect(() => {
    // Redirect to home if user is already logged in
    module.getUserId().then((res) => {
      if (res.data.user === undefined) return;
      navigate("/");
    });
  }, []);

  const login = (email, password) => {
    module
      .UserLogin(email, password)
      .then((res) => {
        if (res?.data?.user) {
          // Web Audio API
          playFile(
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
          );
          navigate(0);
        }
        let errorLog;
        if (res.error) errorLog = res.error;
        else if (res.data.user) errorLog = "User doesn't exist.";
        // Web Audio API
        playFile("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/error.mp3");
        return setErrorLog(errorLog);
      })
      .catch((e) => {
        playFile("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/error.mp3");
        e.response?.data?.error && setErrorLog(e.response.data.error);
      });
  };

  return (
    <div className="login page">
      <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
      <LoginForm onLogin={login} login={true} register={false} />
    </div>
  );
}

export default LoginPage;
