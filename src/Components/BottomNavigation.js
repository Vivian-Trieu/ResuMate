import React, { useState } from 'react';
import "./BottomNavigation.css"
import SavedJobs from "../img/saved-job-button.png"
import ClickedSavedJobs from "../img/saved-job-button-clicked.png"
import Home from "../img/home-button.png"
import ClickedHome from "../img/home-button-clicked.png"
import Profile from "../img/profile-button.png"
import ClickedProfile from "../img/profile-button-clicked.png"


function BottomNavigation(props) {

    const [homeImg, setHomeImg] = useState(ClickedHome);
    const [savedImg, setSavedImg] = useState(SavedJobs);
    const [profileImg, setProfileImg] = useState(Profile);

    function handleTabClick(tab) {
        if (tab === 'home') {
            setHomeImg(ClickedHome);
            setSavedImg(SavedJobs)
            setProfileImg(Profile)
        } else if (tab === 'saved-jobs') {
            setHomeImg(Home); 
            setSavedImg(ClickedSavedJobs)
            setProfileImg(Profile)
        } else if (tab === 'account') {
            setHomeImg(Home); 
            setSavedImg(SavedJobs)
            setProfileImg(ClickedProfile)
        }

        props.onFormSwitch(tab);
    }

    if (props.currentForm === 'home' || props.currentForm === 'saved-jobs' || props.currentForm === 'account')
        return (
            <div className="bottom-nav-container">
                <div className="bottom-nav-box">
                    <nav className="bottom-nav">
                        <ul>
                            <li className={props.currentForm === 'saved-jobs' ? 'active' : ''} onClick={() => {handleTabClick('saved-jobs');}}>
                                <img className="nav-button-img" src={savedImg} alt="Saved Jobs"  />
                            </li>
                    
                            <li className={props.currentForm === 'home' ? 'active' : ''} onClick={() => {handleTabClick('home');}}>
                                <img className="nav-button-img" src={homeImg} alt="Home"  />
                            </li>
                    
                            <li className={props.currentForm === 'account' ? 'active' : ''} onClick={() => {handleTabClick('account');}}>
                                <img className="nav-button-img" src={profileImg} alt="My Account"  />
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    else {
        return null;
    }
}

export default BottomNavigation