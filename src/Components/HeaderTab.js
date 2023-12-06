import React from "react";
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"


function HeaderTab(props) {

    const currentForm = window.sessionStorage.getItem('currentForm')

    if (currentForm === 'home' || currentForm === 'saved-jobs' || currentForm === 'account')
        return (
            <div className="header-tab"></div>
        )
    else 
        return null
}

export default HeaderTab