import "./LoginPage.css";
import SigninWith from "./SigninWith";
import LoginForm from "./LoginForm";

function registerPage() {
  return (
    <div className="register page">
      <div className="register-container row">
        <SigninWith className="col-6" />
        <LoginForm register={true} className="col-6" />
      </div>
    </div>
  );
}

export default registerPage;
