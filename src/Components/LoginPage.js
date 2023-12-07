import React, { useState } from "react";
import "./LoginPage.css";
import "./Alert.css";
import { API } from 'aws-amplify';
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if fields are empty
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    
    // try {
    const user = {
        username: email,
        password: password,
        email: email,
    };

      // Make API request to lambda function for login
      API.post('Users', '/login', {
        contentType: "application/json",
        body: user,
      }).then(apiResponse => {

      const user_id = apiResponse.Items[0].user_id; // Get user_id from api response
      const name = apiResponse.Items[0].name;
      const user_email = apiResponse.Items[0].username;
      console.log('Login API Response:', apiResponse);
      console.log('User ID:', user_id); 

      // If login was successful, switch to HomeScreen
      
        setSuccessMessage("Login successful!");

        console.log("Login successful.");

        // Store in SessionStorage instead of local data -> wont be remove once reload the page
        window.sessionStorage.setItem('user_id', user_id);
        window.sessionStorage.setItem('name', name);
        window.sessionStorage.setItem('email', user_email);

        // props.setUserID(user_id)
        // props.setName(name)
        // props.setEmail(user_email)
        setTimeout(() => {
          setSuccessMessage(null); // Optional: Clear message after a few seconds
          props.onFormSwitch('home'); // pass user_id to home screen
          navigate('/home');
        }, 3000);
       

      }).catch(error => {
      if (error.statusCode === 401) {
        // setErrorMessage(error.apiResponse.body);
        console.log("Login failed. Invalid credentials.");
        }
      else {console.log('Login API Error:', error);}
      // console.log('Login API Error:', error.statusCode);
    })

    // setEmail("");
    // setPassword("");
    
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
          <button type="button" className="forgot-password" onClick={() => {props.onFormSwitch('forgot password'); navigate('/forgot')}}>
            Forgot password?
          </button>
          <button type="button" className="sign-in" onClick={handleLogin} >
              SIGN IN
          </button>
          <button type="button" className="sign-up" onClick={() =>  {props.onFormSwitch('sign-up'); navigate('/signup')}}>
              Register here
          </button>
        </form>
      </div>
      {errorMessage && 
            <div className="error-message-box">
                <p className="message">{errorMessage}</p>
                <button onClick={() => setErrorMessage(null)} className="close-btn">X</button>
            </div>
          }
      {successMessage && 
        <div className="success-message-box">
            <p className="message">{successMessage}</p>
        </div>
      }
    </div>
  );
}

export default LoginPage;
