import { useEffect, useState } from "react";
import "./LoginPage.css";
import SigninWith from "./SigninWith";
import LoginForm from "./LoginForm";
import module from "../../ApiService";
import Alert from "../Alert/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();

  const [ErrorLog, setErrorLog] = useState("");

  useEffect(() => {
    // Redirect to home if user is already logged in
    module.getUserId().then((res) => {
      if (res.data.user === undefined) return;
      navigate("/");
    });
  }, []);

  const register = (email, password) => {
    if (!email || !password) {
      console.log("Please enter email and password");
      return;
    }

    module.UserRegister(email, password).then((res) => {
      if (res.data.user) {
        navigate("/signin");
      } else {
        setErrorLog(res.err);
      }
    });
  };

  return (
    <div className="register page">
      <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
      <div className="register-container row">
        <SigninWith className="col-6" />
        <LoginForm register={true} onRegister={register} className="col-6" />
      </div>
    </div>
  );
}

export default RegisterPage;
