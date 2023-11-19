import React from 'react';
import ProfilePic from "../img/profile-picture.png"
import EditButton from "../img/edit-button.png"
import "./Profile.css"
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"
// import BottomNavigation from "./Components/BottomNavigation";

function Profile(props) {
    return (
        <>
            <div className="header-placeholder">
                <div className="header-tab-box">
                    <button className="close-btn btn-placeholder"><img className="close-button-img" src={closeButton} alt="Close Button"/></button>
                    <div className="header-title"><h2 className="profile">Profile</h2></div>
                    <button className="close-btn" onClick={() => props.onFormSwitch('account')}><img className="close-button-img" src={closeButton} alt="Close Button" /></button>
                </div>
            </div>
            <div className="profile-container">
                <div className="profile-box">
                    <div className="profile-from-setting">
                        <div className="profile-picture-box">
                            <img src={ProfilePic} alt="Profile" className="profile-picture"/>
                            <button className="edit-btn">
                                <img src={EditButton} alt="Edit" className="edit-btn-img"/>
                            </button>
                        </div>

                        <h2 className="profile-name">John Doe</h2>

                        <button className="resume-upload-btn">
                            UPLOAD RESUME
                        </button>
                    </div>

                    <div className="resume-info">
                        <div className="sub-info education">
                            <div className="sub-info-title">
                                <h4>Education</h4>
                            </div>
                            <div className="sub-info-description"> 
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                                    deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                        <div className="sub-info experience">
                            <div className="sub-info-title">
                                <h4>Work experience</h4>
                            </div>
                            <div className="sub-info-description"> 
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                                    deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                        <div className="sub-info skills">
                            <div className="sub-info-title">
                                <h4>Skills</h4>
                            </div>
                            <div className="sub-info-tags"> 
                                <p>Tag 1</p>
                                <p>Tag 2</p>
                                <p>Tag 3</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;