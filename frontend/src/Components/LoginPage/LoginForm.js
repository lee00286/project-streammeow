import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HidePassword from "./HidePassword";
import "./LoginPage.css";

function LoginForm({ login, register, onLogin, onRegister }) {
  const navigate = useNavigate();

  const toSignUp = () => {
    navigate("/signup");
  };

  const toSignIn = () => {
    navigate("/signin");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onPassword = (pw) => {
    setPassword(pw);
  };

  const onConfirmPassword = (pw) => {
    setConfirmPassword(pw);
  };

  const onSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    onRegister(email, password);

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const onSignIn = (e) => {
    e.preventDefault();
    onLogin(email, password);

    setEmail("");
    setPassword("");
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
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>PASSWORD</label>
            <HidePassword onPassword={onPassword} />
            {register ? <label>CONFIRM PASSWORD</label> : null}
            {register ? <HidePassword onPassword={onConfirmPassword} /> : null}
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
