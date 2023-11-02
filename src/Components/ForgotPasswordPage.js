import React from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPasswordPage(props) {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>Forgot Password</h1>
        <form>
          <input type="email" placeholder="Email" />
          <button type="submit">Send Recovery Link</button>
        </form>
          <button type="button" onClick={() => props.onFormSwitch('login')}>Back to Login</button>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
