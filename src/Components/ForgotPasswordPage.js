import React, {useState} from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage(props) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="forgot-password-container">
      <div className="div">
        <button type="button" className="back" onClick={() => {props.onFormSwitch('login'); navigate('/login')}}>Back</button>
        <div className="label">
          <div className="recover-password">Recover Password</div>
        </div>
        <form>
          <input 
            type="email" 
            className="email-field"
            placeholder="Email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="send">SEND</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
