import React, { useState } from "react";
import "./SignUpPage.css";

function SignUpPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Reset the form fields
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="signup-container">
      <div className="div">
        <div className="label">
          <div className="signup">Sign Up</div>
        </div>
        <form className="form">
          <input 
            type="text"
            className="name-field" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
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
          <input 
            type="password" 
            className="confirm-password-field"
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="register" onClick={handleSignUp}>REGISTER</button>
          <button type="button" className="login-here" onClick={() => props.onFormSwitch('login')}>Login here</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
