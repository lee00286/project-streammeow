import LoginForm from "./LoginForm";
import "./LoginPage.css";
import module from "../../ApiService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const login = (email, password) => {
    module.UserLogin(email, password).then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        navigate("/");
      } else {
        console.log(res.err);
      }
    });
  };

  return (
    <div className="login page">
      <LoginForm onLogin={login} login={true} register={false} />
    </div>
  );
}

export default LoginPage;
