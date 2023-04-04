import { useEffect } from "react";
import LoginForm from "./LoginForm";
import "./LoginPage.css";
import module from "../../ApiService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user is already logged in
    module.getUserId().then((res) => {
      if (res.data.user === undefined) return;
      navigate("/");
    });
  }, []);

  const login = (email, password) => {
    module.UserLogin(email, password).then((res) => {
      if (res.data.user) {
        navigate(0);
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
