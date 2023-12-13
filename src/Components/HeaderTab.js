import React from "react";
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"
import logo from "../img/logo.png"


function HeaderTab(props) {

    const currentForm = window.sessionStorage.getItem('currentForm')

    if (currentForm === 'home' || currentForm === 'saved-jobs' || currentForm === 'account')
        return (
            <div className="header-tab">
                <div className="header-tab-box">
                    <div className="btn-placeholder"></div>
                    <div className="header-title">
                        <img src={logo} alt="Logo" className="logo" />
                    </div>
                    </div>
            </div>
        )
    else 
        return null
}

export default HeaderTab