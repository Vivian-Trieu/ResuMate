import React from 'react';
import ProfilePic from "../img/profile-pic.jpg"
import "./Profile.css"
// import BottomNavigation from "./Components/BottomNavigation";

function Profile({ hideBottomNav }) {
    return (
        <div className="profile-container">
            <div className="profile-box">
                <div className="profile-from-setting">
                    <img src={ProfilePic} alt="Profile" className="profile-picture"/>

                    <h2 className="profile-name">John Doe</h2>

                    <button className="resume-upload-btn">
                        Upload Resume
                    </button>
                </div>

                <div className="resume-info">
                    <div className="sub-info education">
                        <h4>Education</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className="sub-info skills">
                        <h4>Skills</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className="sub-info experience">
                        <h4>Experience</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;