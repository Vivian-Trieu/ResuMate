import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login here
    alert("Logging in with Email: " + email + " and Password: " + password);
  };

  const handleForgotPassword = () => {
    // Implement forgot password here
    alert("Forgot Password: Enter your email to recover your password");
  };

  const handleSignUp = () => {
    // Implement signup here
    alert("Redirect to the sign-up page");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-container">
            <button type="button" onClick={handleLogin}>
              Sign In
            </button>
            <button type="button" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
          <button type="button" onClick={handleForgotPassword}>
            Forgot Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
