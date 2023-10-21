import React from "react";

function SignUpPage() {
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
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
