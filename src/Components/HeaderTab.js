import React from "react";
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"


function HeaderTab({ activeTab, setActiveTab}) {
    const handleCloseClick = () => {
        setActiveTab('account');
    }

    if (activeTab === 'home' || activeTab === 'saved-jobs' || activeTab === 'account')
        return (
            <div className="header-tab"></div>
        )
    else 
        return (
            <div className="header-tab account-tab">
                <div className="header-tab-box">
                    <button className="close-btn btn-placeholder"><img className="close-button-img" src={closeButton} alt="Close Button"/></button>
                    <div className="header-title"><h2 className="profile">Profile</h2></div>
                    <button className="close-btn" onClick={handleCloseClick}><img className="close-button-img" src={closeButton} alt="Close Button" /></button>
                </div>
            </div>
        )
}

export default HeaderTab