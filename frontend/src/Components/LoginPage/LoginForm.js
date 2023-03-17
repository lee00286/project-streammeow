import { useNavigate } from "react-router-dom";
import HidePassword from "./HidePassword";
import "./LoginPage.css";

function LoginForm({ login, register }) {
  const navigate = useNavigate();

  const toSignUp = () => {
    navigate("/signup");
  };

  const toSignIn = () => {
    navigate("/signin");
  };

  const onSignUp = () => {
    //todo
  };

  const onSignIn = () => {
    //todo
  };

  return (
    <div className="login-container">
      <div className="col">
        <div className="login-form">
          <div className="login-title">
            {login ? <h2>Sign In</h2> : <h2>Register</h2>}
          </div>
          <div className="login-input col">
            <label>EMAIL</label>
            <input type="text" placeholder="Email" required />
            <label>PASSWORD</label>
            <HidePassword />
            {register ? <label>CONFIRM PASSWORD</label> : null}
            {register ? <HidePassword /> : null}
          </div>
          {login ? (
            <button className="login-button" onClick={onSignIn}>
              Sign In
            </button>
          ) : (
            <button className="login-button" onClick={onSignUp}>
              Register
            </button>
          )}
        </div>
        <div className="horizontal-line">
          <span>OR</span>
        </div>
        <div className="login-footer">
          <div className="login-footer-text">
            {login ? (
              <p>
                {" "}
                Don't have an account?{" "}
                <button className="footer-button" onClick={toSignUp}>
                  SIGN UP
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button className="footer-button" onClick={toSignIn}>
                  SIGN IN
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
