import React from "react";
import "./SignUpPage.css";

function SignUpPage(props) {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <form>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
          <button type="button" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
