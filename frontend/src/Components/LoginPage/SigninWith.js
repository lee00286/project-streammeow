import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import module from "../../ApiService";

import "./LoginPage.css";

function SigninWith() {
  const navigate = useNavigate();
  const toSignIn = () => {
    navigate("/signin");
  };

  const { loginWithRedirect, user } = useAuth0();
  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: "/" },
    });
    if (user) {
      module.Auth0Login(user.email, user.name, user.picture).then((res) => {
        if (res.data.user) {
          console.log(res.data.user);
        } else {
          console.log(res.err);
        }
      });
    }
  };

  return (
    <div className="login-container">
      <div className="col">
        <div className="login-form">
          <div className="login-title">
            <h2>Register</h2>
          </div>
          <div className="login-input col">
            <button className="auth-button" onClick={handleLogin}>
              Sign in with Google
            </button>
            <button className="auth-button">Sign in with Github</button>
          </div>
        </div>
        <div className="horizontal-line">
          <span>OR</span>
        </div>
        <div className="login-footer">
          <div className="login-footer-text">
            <p>
              Already have an account?
              <button className="footer-button" onClick={toSignIn}>
                SIGN IN
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninWith;
