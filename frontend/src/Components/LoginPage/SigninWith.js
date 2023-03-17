import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

function SigninWith() {
  const navigate = useNavigate();
  const toSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="login-container">
      <div className="col">
        <div className="login-form">
          <div className="login-title">
            <h2>Register</h2>
          </div>
          <div className="login-input col">
            <button className="auth-button">Sign in with Google</button>
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
