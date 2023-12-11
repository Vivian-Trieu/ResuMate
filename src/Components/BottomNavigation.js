import React, { useState, useEffect } from 'react';
import "./BottomNavigation.css"
import SavedJobs from "../img/saved-job-button.png"
import ClickedSavedJobs from "../img/saved-job-button-clicked.png"
import Home from "../img/home-button.png"
import ClickedHome from "../img/home-button-clicked.png"
import Profile from "../img/profile-button.png"
import ClickedProfile from "../img/profile-button-clicked.png"
import { useNavigate } from "react-router-dom";


function BottomNavigation(props) {

    const [homeImg, setHomeImg] = useState(ClickedHome);
    const [savedImg, setSavedImg] = useState(SavedJobs);
    const [profileImg, setProfileImg] = useState(Profile);
    const navigate = useNavigate();
    const currentForm = window.sessionStorage.getItem('currentForm')
    
    useEffect(() => {
        if (currentForm === 'home') {
            setHomeImg(ClickedHome);
            setSavedImg(SavedJobs)
            setProfileImg(Profile)
        } else if (currentForm === 'saved-jobs') {
            setHomeImg(Home); 
            setSavedImg(ClickedSavedJobs)
            setProfileImg(Profile)
        } else if (currentForm === 'account') {
            setHomeImg(Home); 
            setSavedImg(SavedJobs)
            setProfileImg(ClickedProfile)
        }
    }, [currentForm]);

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

    if (currentForm === 'home' || currentForm === 'saved-jobs' || currentForm === 'account')
        return (
            <div className="bottom-nav-container">
                <div className="bottom-nav-box">
                    <nav className="bottom-nav">
                        <ul>
                            <li className={currentForm === 'saved-jobs' ? 'active' : ''} onClick={() => {handleTabClick('saved-jobs'); navigate('/saved')}}>
                                <img className="nav-button-img" src={savedImg} alt="Saved Jobs"  />
                            </li>
                    
                            <li className={currentForm === 'home' ? 'active' : ''} onClick={() => {handleTabClick('home'); navigate('/home')}}>
                                <img className="nav-button-img" src={homeImg} alt="Home"  />
                            </li>
                    
                            <li className={currentForm === 'account' ? 'active' : ''} onClick={() => {handleTabClick('account'); navigate('/account')}}>
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