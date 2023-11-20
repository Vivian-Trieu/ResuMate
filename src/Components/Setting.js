import React, { useState } from 'react';
import "./Setting.css"
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"

function Setting(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // submit form data
    };

    return (
        <>  
            <div className="header-placeholder">
                <div className="header-tab-box">
                    <button className="close-btn btn-placeholder"><img className="close-button-img" src={closeButton} alt="Close Button"/></button>
                    <div className="header-title"><h2 className="profile">Account settings</h2></div>
                    <button className="close-btn" onClick={() => props.onFormSwitch('account')}><img className="close-button-img" src={closeButton} alt="Close Button" /></button>
                </div>
            </div>
            <div className="setting-container">
                <div className="setting-box">
                    <h2>Personal details</h2>
                    {/* <form onSubmit={handleSubmit}> */}
                    <div className="setting">
                        <div className="setting-title">
                            <h4>Email</h4>
                            <button className="edit-text">Edit</button>
                        </div>
                        <div className="setting-description"> 
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className="break"></div>
                    <div className="setting">
                        <div className="setting-title">
                            <h4>Name</h4>
                            <button className="edit-text">Edit</button>
                        </div>
                        <div className="s-description"> 
                            <p>{name}</p>
                        </div>
                    </div>
                    <div className="break"></div>
                    <div className="setting">
                        <div className="setting-title">
                            <h4>Password</h4>
                            <button className="edit-text">Edit</button>
                        </div>
                        <div className="setting-description"> 
                            <p>********</p>
                        </div>
                    </div>

                    {/* <button type="submit">Update Account</button> */}
                    {/* </form> */}
                </div>
                <button className="delete-account">DELETE ACCOUNT</button>
            </div>
        </>
    );
}

export default Setting;