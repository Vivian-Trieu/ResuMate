import React, { useEffect, useState } from "react";
import { API } from 'aws-amplify';
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

function SignUpPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const navigate = useNavigate();

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
        username: email,
        password: password,
        name: name,
        email: email,
      };

      // Make API request to AWS Lambda function
      const apiResponse = await API.post('Users', '/register', {
        contentType: "application/json",
        body: user,
      });
      // Handle response data
      console.log('API Response:', apiResponse);
        setSuccessMessage("Registration successful.");
        // alert('Registration successful!'); // alert does not show up
        setTimeout(() => {
          setSuccessMessage(null); // Optional: Clear message after a few seconds
          props.onFormSwitch('login'); // pass user_id to home screen
          navigate('/login');
        }, 3000);

      

    } catch (error) {
      // Handle errors from API call
      setErrorMessage(error.response.data);
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
        <button type="button" className="back" onClick={() => {props.onFormSwitch('login'); navigate('/login')}}>Back</button>
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
      {errorMessage && 
            <div className="error-message-box">
                <p className="message">{errorMessage}</p>
                <button onClick={() => setErrorMessage(null)} className="alert-close-btn">X</button>
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

export default SignUpPage;