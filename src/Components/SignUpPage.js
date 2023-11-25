import React, { useEffect, useState } from "react";
import { API } from 'aws-amplify';
import "./SignUpPage.css";

function SignUpPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Check if fields are empty
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill out all fields!');
      return;
    }
    // Check if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const user = {
        name: name,
        email: email,
        username: email,
        password: password,
      };

      // Make API request to AWS Lambda function
      const apiResponse = await API.post('Users', '/register', {
        contentType: "application/json",
        body: user,
      });
      // Handle response data
      console.log('API Response:', apiResponse);

      // Check if registration was successful and send alert based on status code
      
      if (apiResponse.statusCode === 200) {
        console.log("Registration successful.");
        alert('Registration successful!'); // alert does not show up
        return;
      } else if (apiResponse.statusCode === 400) {
        console.log("Registration failed.");
        alert('Registration failed. Account already exists.'); // alert does not show up
        return;
      }
      

    } catch (error) {
      // Handle errors from API call
      console.error('API Error:', error);
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
        <button type="button" className="back" onClick={() => props.onFormSwitch('login')}>Back</button>
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
            placeholder="Confirm password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="register" onClick={handleSignUp}>REGISTER</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;