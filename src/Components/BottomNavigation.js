import React, { useState } from 'react';
import "./BottomNavigation.css"
import SavedJobs from "../img/saved-job-button.png"
import ClickedSavedJobs from "../img/saved-job-button-clicked.png"
import Home from "../img/home-button.png"
import ClickedHome from "../img/home-button-clicked.png"
import Profile from "../img/profile-button.png"
import ClickedProfile from "../img/profile-button-clicked.png"


function BottomNavigation({ activeTab, setActiveTab}) {

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

        setActiveTab(tab);
    }

    if (activeTab === 'home' || activeTab === 'saved-jobs' || activeTab === 'account')
        return (
            <div className="bottom-nav-container">
                <div className="bottom-nav-box">
                    <nav className="bottom-nav">
                        <ul>
                            <li className={activeTab === 'saved-jobs' ? 'active' : ''} onClick={() => {setActiveTab('saved-jobs'); handleTabClick('saved-jobs');}}>
                                <img className="nav-button-img" src={savedImg} alt="Saved Jobs"  />
                            </li>
                    
                            <li className={activeTab === 'home' ? 'active' : ''} onClick={() => {setActiveTab('home'); handleTabClick('home');}}>
                                <img className="nav-button-img" src={homeImg} alt="Home"  />
                            </li>
                    
                            <li className={activeTab === 'account' ? 'active' : ''} onClick={() => {setActiveTab('account'); handleTabClick('account');}}>
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