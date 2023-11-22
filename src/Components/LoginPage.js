import React, { useState } from "react";
import "./LoginPage.css";
import { API } from 'aws-amplify';

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Check if fields are empty
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    
    try {
      const user = {
        username: email,
        password: password,
      };

      // Make API request to lambda function for login
      const apiResponse = await API.post('Users', '/login', {
        contentType: "application/json",
        body: user,
      });

      console.log('Login API Response:', apiResponse);

      // If login was successful, switch to HomeScreen
      if (apiResponse.statusCode === 401) {
        alert('Login failed. Invalid credentials.');
        console.log("Login failed. Invalid credentials.");
      } else {
        alert('Login successful!');
        console.log("Login successful.");
        props.onFormSwitch('home');
      }
    } catch (error) {
      console.error('Login API Error:', error);
    }

    setEmail("");
    setPassword("");
    
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
            Forgot password?
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
