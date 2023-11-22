import React from "react";
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"


function HeaderTab(props) {

    if (props.currentForm === 'home' || props.currentForm === 'saved-jobs' || props.currentForm === 'account')
        return (
            <div className="header-tab"></div>
        )
    else 
        return null
}

export default HeaderTab