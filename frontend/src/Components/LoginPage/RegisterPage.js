import "./LoginPage.css";
import SigninWith from "./SigninWith";
import LoginForm from "./LoginForm";
import module from "../../ApiService";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const register = (email, password) => {
    module.UserRegister(email, password).then((res) => {
      if (res.data.user) {
        console.log(res.user);
        navigate("/");
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
