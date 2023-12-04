import React, { useState } from 'react';
import "./Setting.css"
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"
import { API } from 'aws-amplify';

function Setting(props) {
    const [editableField, setEditableField] = useState('');
    const [updatedValue, setUpdatedValue] = useState('');

    const handleUpdate = async (field) => {
        try {
            const user = {
                user_id: props.user_id,
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
                    props.setEmail(updatedValue);
                    break;
                case 'name':
                    props.setName(updatedValue);
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
                user_id: props.user_id,
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
                    <button className="close-btn" onClick={() => props.onFormSwitch('account')}><img className="close-button-img" src={closeButton} alt="Close Button" /></button>
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
                                        type="text"
                                        value={updatedValue}
                                        onChange={(e) => setUpdatedValue(e.target.value)}
                                    /> 
                                    <button className="edit-text" onClick={() => handleUpdate('email')}>Update</button>
                                </>
                            ) : (
                                <div className="label-edit-container">
                                    <div className="setting-description"> 
                                        <p>{props.email}</p>
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
                                        type="text"
                                        value={updatedValue}
                                        onChange={(e) => setUpdatedValue(e.target.value)}
                                    /> 
                                    <button className="edit-text" onClick={() => handleUpdate('name')}>Update</button>
                                </>
                            ) : (
                                <div className="label-edit-container">
                                    <div className="s-description"> 
                                        <p>{props.name}</p>
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
                <button className="delete-account" onClick={() => {handleDelete(); props.onFormSwitch('login')}}>DELETE ACCOUNT</button>
            </div>
        </>
    );
}

export default Setting;