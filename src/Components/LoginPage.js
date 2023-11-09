
import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login here
    alert("Logging in with Email: " + email + " and Password: " + password);
  };

  return (
    <div className="login-container">
      <div className="div">
        <div className="label">
          <div className="login">Login</div>
        </div>
        <form className="form">
          <input
            type="email"
            className="email-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="password-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="forgot-password" onClick={() => props.onFormSwitch('forgot password')}>
            Forgot Password?
          </button>
          <button type="button" className="sign-in" onClick={handleLogin}>
              SIGN IN
          </button>
          <button type="button" className="sign-up" onClick={() => props.onFormSwitch('sign up')}>
              Register here
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
