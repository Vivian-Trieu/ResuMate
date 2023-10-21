import React from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>Forgot Password</h1>
        <form>
          <input type="email" placeholder="Email" />
          <button type="submit">Send Recovery Link</button>
        </form>
        <p>
          <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
