import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import "./LoginPage.css";
import module from "../../ApiService";
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
        if (res.error) return setErrorLog(res.error);
        if (res.data.user) {
          navigate(0);
        } else {
          setErrorLog("User doesn't exist.");
        }
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
  };

  return (
    <div className="login page">
      <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
      <LoginForm onLogin={login} login={true} register={false} />
    </div>
  );
}

export default LoginPage;
