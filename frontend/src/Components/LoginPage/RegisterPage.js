import { useEffect } from "react";
import "./LoginPage.css";
import SigninWith from "./SigninWith";
import LoginForm from "./LoginForm";
import module from "../../ApiService";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user is already logged in
    module.getUserId().then((res) => {
      if (res.data.user === undefined) return;
      navigate("/");
    });
  }, []);

  const register = (email, password) => {
    module.UserRegister(email, password).then((res) => {
      if (res.data.user) {
        console.log(res.user);
        navigate("/signin");
      } else {
        console.log(res.err);
      }
    });
  };

  return (
    <div className="register page">
      <div className="register-container row">
        <SigninWith className="col-6" />
        <LoginForm register={true} onRegister={register} className="col-6" />
      </div>
    </div>
  );
}

export default RegisterPage;
