import LoginForm from "./LoginForm";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login page">
      <LoginForm login={true} register={false} />;
    </div>
  );
}

export default LoginPage;
