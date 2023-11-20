import React from 'react';
import "./MyAccount.css"
import UserProfile from "../img/user-profile.png"
import UserPreference from "../img/user-preference.png"
import UserSetting from "../img/user-setting.png"


function MyAccount(props) {

    return (
        <>
        <div className="header-placeholder"></div>
        <div className="my-account-container">
          <div className="my-account-title">
            <h1 className="my-account">Your Account</h1>
          </div>
          
          <div className="my-account-box">
                <div className="my-account-block user-profile" onClick={() => props.onFormSwitch('profile')}>
                    <div className="my-account-block-img">
                        <img className="my-account-img" src={UserProfile} alt="User Profile" />
                    </div>
                    <div className="my-account-block-text">
                        <h3>Profile</h3>
                        <p>Upload or edit your resume to <br></br> create a profile.</p>
                    </div>
                </div>
                <div className="my-account-block user-preference" onClick={() => props.onFormSwitch('preferences')}>
                    <div className="my-account-block-img">
                        <img className="my-account-img" src={UserPreference} alt="User Preference" />
                    </div>
                    <div className="my-account-block-text">
                        <h3>Search preferences</h3>
                        <p>Filter your job matches to match <br></br> your preferences.</p>
                    </div>
                </div>
                <div className="my-account-block user-setting" onClick={() => props.onFormSwitch('setting')}>
                    <div className="my-account-block-img">
                        <img className="my-account-img" src={UserSetting} alt="User Setting" />
                    </div>
                    <div className="my-account-block-text">
                        <h3>Account settings</h3>
                        <p>Manage your personal account <br></br> information.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="header-placeholder"></div>
        </>
      );
}

export default MyAccount;