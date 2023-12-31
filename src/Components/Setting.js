import React, { useState, useEffect } from 'react';
import "./Setting.css"
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

function Setting(props) {
    const [editableField, setEditableField] = useState('');
    const [updatedValue, setUpdatedValue] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);
    const open = () => setShowPopUp(true);  
    const close = () => setShowPopUp(false);
    const navigate = useNavigate();
    
    const user_id = window.sessionStorage.getItem('user_id');
    const name = window.sessionStorage.getItem('name');
    const email = window.sessionStorage.getItem('email');

    const handleUpdate = async (field) => {
        try {
            const user = {
                user_id: user_id,
                update_attributes: { [field]: updatedValue },
            };
            // Send updated data to DynamoDB
            const apiResponse = await API.post('Users', '/update', {
                contentType: "application/json",
                body: user,
            });

            // Update the corresponding prop based on the changed value
            switch (field) {
                case 'email':
                    window.sessionStorage.setItem('email', updatedValue);
                    // props.setEmail(updatedValue);
                    break;
                case 'name':
                    window.sessionStorage.setItem('name', updatedValue);
                    // props.setName(updatedValue);
                    break;
                // Add additional cases for other fields if needed
                default:
                    break;
            }

            console.log('API Response:', apiResponse);
            setEditableField('');
            setUpdatedValue('');

        } catch (error) {
            console.error('Failed to update user attribute:', error)
        }
    }

    const handleDelete = async () => {
        try {
            const user = {
                user_id: user_id,
            };
            // Send updated data to DynamoDB
            const apiResponse = await API.post('Users', '/delete', {
                contentType: "application/json",
                body: user,
            });


            console.log('API Response:', apiResponse);
            setEditableField('');
            setUpdatedValue('');

        } catch (error) {
            console.error('Failed to delete account:', error)
        }
    }

    return (
        <>  
            <div className="header-placeholder">
                <div className="header-tab-box">
                    <button className="close-btn btn-placeholder"><img className="close-button-img" src={closeButton} alt="Close Button"/></button>
                    <div className="header-title"><h2 className="profile">Account settings</h2></div>
                    <button className="close-btn" onClick={() => {props.onFormSwitch('account'); navigate('/account')}}><img className="close-button-img" src={closeButton} alt="Close Button" /></button>
                </div>
            </div>
            <div className="setting-container">
                <div className="setting-box">
                    <h2>Personal details</h2>
                    {/* <form onSubmit={handleSubmit}> */}
                    <div className="setting">
                        <div className="setting-title">
                            <h4>Email</h4>
                            {editableField === 'email' ? (
                                <>
                                    <input
                                        className="setting-textbox"
                                        type="text"
                                        value={updatedValue}
                                        onChange={(e) => setUpdatedValue(e.target.value)}
                                    /> 
                                    <button className="edit-text" onClick={() => handleUpdate('email')}>Update</button>
                                </>
                            ) : (
                                <div className="label-edit-container">
                                    <div className="setting-description"> 
                                        <p>{email}</p>
                                    </div>
                                    <button className="edit-text" onClick={() => setEditableField('email')}>Edit</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="break"></div>
                    <div className="setting">
                        <div className="setting-title">
                            <h4>Name</h4>
                            {editableField === 'name' ? (
                                <>
                                    <input
                                        className="setting-textbox"
                                        type="text"
                                        value={updatedValue}
                                        onChange={(e) => setUpdatedValue(e.target.value)}
                                    /> 
                                    <button className="edit-text" onClick={() => handleUpdate('name')}>Update</button>
                                </>
                            ) : (
                                <div className="label-edit-container">
                                    <div className="s-description"> 
                                        <p>{name}</p>
                                    </div>
                                    <button className="edit-text" onClick={() => setEditableField('name')}>Edit</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="break"></div>
                    <div className="setting">
                        <div className="setting-title">
                            <h4>Password</h4>
                            {editableField === 'password' ? (
                                <>
                                    <input
                                        className="setting-textbox"
                                        type="text"
                                        value={updatedValue}
                                        onChange={(e) => setUpdatedValue(e.target.value)}
                                    /> 
                                    <button className="edit-text" onClick={() => handleUpdate('password')}>Update</button>
                                </>
                            ) : (
                                <div className="label-edit-container">
                                    <div className="setting-description"> 
                                        <p>********</p>
                                    </div>
                                    <button className="edit-text" onClick={() => setEditableField('password')}>Edit</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <button type="submit">Update Account</button> */}
                    {/* </form> */}
                </div>
                <button className="delete-account" onClick={open}>DELETE ACCOUNT</button>
                {showPopUp && (
                    <>
                        <div className="delete-pop-up-overlay"></div>
                        <div className="delete-pop-up">
                            <p>Are you sure want to delete your account?</p>
                        
                            <div className="delete-pop-up-buttons">
                                <button onClick={close}>Cancel</button>
                                <button onClick={() => {handleDelete(); props.onFormSwitch('login'); window.sessionStorage.clear(); navigate('/login')}}>Confirm</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Setting;