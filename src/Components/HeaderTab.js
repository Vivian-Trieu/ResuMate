import React from "react";
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"


function HeaderTab(props) {

    if (props.currentForm === 'home' || props.currentForm === 'saved-jobs' || props.currentForm === 'account')
        return (
            <div className="header-tab"></div>
        )
    else 
        return (
            <div className="header-tab account-tab">
                <div className="header-tab-box">
                    <button className="close-btn btn-placeholder"><img className="close-button-img" src={closeButton} alt="Close Button"/></button>
                    <div className="header-title"><h2 className="profile">Profile</h2></div>
                    <button className="close-btn" onClick={() => props.onFormSwitch('account')}><img className="close-button-img" src={closeButton} alt="Close Button" /></button>
                </div>
            </div>
        )
}

export default HeaderTab