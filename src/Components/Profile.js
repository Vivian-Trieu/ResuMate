import React, { useState, useEffect } from 'react';
import ProfilePic from "../img/profile-picture.png"
import EditButton from "../img/edit-button.png"
import "./Profile.css"
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"
import addButton from "../img/add.png"
import Amplify, { API, Storage } from 'aws-amplify';

function Profile(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [resumeData, setResumeData] = useState([]);
    const [workExperience, setWorkExperience] = useState(''); // ignore all these for now
    const [education, setEducation] = useState('');
    const [skills, setSkills] = useState([]);
    const [links, setLinks] = useState('');
    const [isLoading, setLoading] = useState(false);

    console.log("User ID in Profile: ", props.user_id) // pass the user_id from App.js
    
    useEffect(() => {
        if (selectedFile) {
            uploadFileToS3(selectedFile);
        }
        fetchResumeData();
    }, [selectedFile]);
    
    function handleFileUpload() {
        const fileInput = document.getElementById('resume-upload-btn');
        setSelectedFile(fileInput.files[0]);
    }

    const fetchResumeData = async () => {
        try {
            const apiResponse = await API.post('Resumes', '/get', {
                contentType: "application/json",
                body: { user_id: props.user_id },
            });
            

            if (apiResponse && apiResponse.length > 0) {
                setResumeData(apiResponse[apiResponse.length - 1]); 
                setResumeData(data => {
                    setEducation(data.Education);
                    setWorkExperience(data['Work Experience']);
                    setLinks(data.Links);
                    const skillsString = data.Skills;
                    const skillsArray = skillsString.split(", "); 
                    const trimmedSkills = skillsArray.map(skill => skill.trim()); 
                    setSkills(trimmedSkills);
                });
            }            

        } catch (error) {
            console.error('Error fetching resume info:', error);
        }
    }

    const uploadFileToS3 = async (file) => {
        try {
            const fileName = `resume_${Date.now()}`; // Generate a unique file name
            await Storage.put(fileName, file, {
                level: 'public',
                contentType: 'application/pdf', // Set the content type for PDF files
            });

            console.log('File uploaded successfully:', fileName);
            

            // Perform any additional actions after uploading the file 
            handleResumeUploadEvent(props.user_id, fileName);
            
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleResumeUploadEvent = async (user_id, resume_id) => {
        setLoading(true);
        try {
            const resume = {
                user_id: user_id,
                resume_id: resume_id,
                //work_experience: work_experience, // add work experience as an attribute
                //education: education,
                //skills: skills,
                //links: links,
            };

            const apiResponse = await API.post('Resumes', '/upload', {
                contentType: "application/json",
                body: resume,
            });
            console.log('Handle resume upload event for user:', user_id, 'resumeId:', resume_id);
            console.log('Resume upload event response:', apiResponse);

        } catch (error) {
            console.error('Error handling resume upload event:', error);
        }
        setLoading(false);
        props.onFormSwitch('account');
    };

    return (
        <>
            <div className="header-placeholder">
                <div className="header-tab-box">
                    <button className="close-btn btn-placeholder"><img className="close-button-img" src={closeButton} alt="Close Button"/></button>
                    <div className="header-title"><h2 className="profile">Profile</h2></div>
                    <button className="close-btn" onClick={() => props.onFormSwitch('account')}><img className="close-button-img" src={closeButton} alt="Close Button" /></button>
                </div>
            </div>
            <div className="profile-container">
                <div className="profile-box">
                    <div className="profile-from-setting">
                        <div className="profile-picture-box">
                            <img src={ProfilePic} alt="Profile" className="profile-picture"/>
                            <button className="edit-btn">
                                <img src={EditButton} alt="Edit" className="edit-btn-img"/>
                            </button>
                        </div>

                        <h2 className="profile-name">{props.name}</h2>

                        <label className="resume-upload" htmlFor="resume-upload-btn" >UPLOAD RESUME</label>
                            <input type="file" id="resume-upload-btn" accept=".pdf" onChange={handleFileUpload} />
                    </div>

                    <div className="resume-info">
                        <div className="sub-info education">
                            <div className="sub-info-title">
                                <h4>Education</h4>
                                <button className="add"><img className="add-button-img" src={addButton} alt="Add Button"/></button>
                            </div>
                            <div className="sub-info-description"> 
                                {
                                    education !== "" ? (
                                        <p>{education}</p>  
                                    ) : (
                                        <p></p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="sub-info experience">
                            <div className="sub-info-title">
                                <h4>Work experience</h4>
                                <button className="add"><img className="add-button-img" src={addButton} alt="Add Button"/></button>
                            </div>
                            <div className="sub-info-description"> 
                                {
                                    workExperience !== "" ? (
                                        <p>{workExperience}</p>  
                                    ) : (
                                        <p></p>
                                    )
                                }        
                            </div>
                        </div>
                        <div className="sub-info skills">
                            <div className="sub-info-title">
                                <h4>Skills</h4>
                                <button className="add"><img className="add-button-img" src={addButton} alt="Add Button"/></button>
                            </div>
                            <div className="sub-info-tags"> 
                                {
                                    skills.length > 0 ? (
                                        skills.map(skill => (
                                            <div className="tag" key={skill}>
                                                <p>{skill}</p> 
                                            </div>
                                        ))
                                    ) : (
                                        <div className="tag">
                                                <p></p> 
                                        </div>
                                    )
                                }
                                
                            </div>
                        </div>
                        <div className="sub-info links">
                            <div className="sub-info-title">
                                <h4>Links</h4>
                                <button className="add"><img className="add-button-img" src={addButton} alt="Add Button"/></button>
                            </div>
                            <div className="sub-info-description"> 
                                {
                                    links !== "" ? (
                                        <p>{links}</p>  
                                    ) : (
                                        <p></p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            {isLoading && (
                    <>
                        <div className="delete-pop-up-overlay"></div>
                        <div className="delete-pop-up">
                            <p>loading</p>
                        </div>
                    </>
            )}
            </div>
        </>
    );
}

export default Profile;