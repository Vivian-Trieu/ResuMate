import React, { useState } from 'react';
import "./BottomNavigation.css"
import SavedJobs from "../img/saved-job-button.png"
import Home from "../img/home-button.png"
import ClickedHome from "../img/home-button-clicked.png"
import Profile from "../img/profile-button.png"


// BottomNav.js

function BottomNavigation({ activeTab, setActiveTab}) {

    const [homeImg, setHomeImg] = useState(ClickedHome);
    const [savedImg, setSavedImg] = useState(SavedJobs);
    const [profileImg, setProfileImg] = useState(Profile);

    function handleTabClick(tab) {
        if (tab === 'home') {
            setHomeImg(ClickedHome);
        } else {
            setHomeImg(Home); 
        }

        setActiveTab(tab);
    }

    return (
        <div className="bottom-nav-container">
            <nav className="bottom-nav">
                <ul>
                    <li className={activeTab === 'saved-jobs' ? 'active' : ''} onClick={() => {setActiveTab('saved-jobs'); handleTabClick('saved-jobs');}}>
                        <img className="nav-button-img" src={SavedJobs} alt="Saved Jobs"  />
                    </li>
            
                    <li className={activeTab === 'home' ? 'active' : ''} onClick={() => {setActiveTab('home'); handleTabClick('home');}}>
                        <img className="nav-button-img" src={homeImg} alt="Home"  />
                    </li>
            
                    <li className={activeTab === 'account' ? 'active' : ''} onClick={() => {setActiveTab('account'); handleTabClick('account');}}>
                        <img className="nav-button-img" src={Profile} alt="Profile"  />
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default BottomNavigation