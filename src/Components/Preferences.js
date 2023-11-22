import React, { useState } from 'react';
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"
import "./Preferences.css"
import Slider from "./Slider"
import Checkbox from "./Checkbox";

function Preferences(props) {

    const [notifications, setNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(false);
    
    const [distanceSliderValue, setDistanceSliderValue] = useState(25);
    const [salarySliderValue, setSalarySliderValue] = useState(250);
    const [checked, setChecked] = useState(false);
  
    const handleCheck = () => {
      setChecked(!checked);
    }

    return (
        <>  
            <div className="header-placeholder">
                <div className="header-tab-box">
                    <button className="close-btn btn-placeholder"><img className="close-button-img" src={closeButton} alt="Close Button"/></button>
                    <div className="header-title"><h2 className="profile">Search preferences</h2></div>
                    <button className="close-btn" onClick={() => props.onFormSwitch('account')}><img className="close-button-img" src={closeButton} alt="Close Button" /></button>
                </div>
            </div>
            <div className="preferences-container">
                <div className="preferences-box">
                    <div className="preference">
                        <h4>Maximum distance</h4>
                        <Slider MIN={0} MAX={50} UNIT={" mi"} sliderValue={distanceSliderValue} setSliderValue={setDistanceSliderValue} />
                    </div>
                    <div className="break"></div>
                    <div className="preference">
                        <h4>Minimum salary</h4>
                        <Slider MIN={10} MAX={500} UNIT={"k"} CURRENCY={"$"} sliderValue={salarySliderValue} setSliderValue={setSalarySliderValue} />
                    </div>
                    <div className="break"></div>
                    <div className="preference">
                        <h4>Experience level</h4>
                        <Checkbox label="Entry level" />
                        <Checkbox label="Mid level" />
                        <Checkbox label="Senior level" />
                        <Checkbox label="No Experience Required" />
                    </div>
                    <div className="break"></div>
                    <div className="preference">
                        <h4>Job type</h4>
                        <Checkbox label="Part-time" />
                        <Checkbox label="Full-time" />
                        <Checkbox label="Contract" />
                        <Checkbox label="Temporary" />
                        <Checkbox label="Internship" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Preferences;