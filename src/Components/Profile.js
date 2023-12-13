import React, { useState, useEffect } from 'react';
import ProfilePic from "../img/profile-picture.png"
import EditButton from "../img/edit-button.png"
import "./Profile.css"
import "./HeaderTab.css"
import closeButton from "../img/close-button.png"
import addButton from "../img/add.png"
import editText from "../img/edit-text.png"
import Amplify, { API, Storage } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import spinner from '../img/spinner.gif';

function Profile(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [resumeData, setResumeData] = useState([]);
    const [workExperience, setWorkExperience] = useState(''); // ignore all these for now
    const [education, setEducation] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillsStr, setSkillsStr] = useState([]);
    const [links, setLinks] = useState('');
    const [location, setLocation] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [keywordsStr, setKeywordsStr] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const open = () => setShowPopUp(true);  
    const close = () => setShowPopUp(false);
    const [editingField, setEditingField] = useState(null);
    const [updatedValue, setUpdatedValue] = useState(null);
    const [originalSkills, setOriginalSkills] = useState();
    const [originalKeywords, setOriginalKeywords] = useState();
    const navigate = useNavigate();

    // const [user_id, setUserID] = useState(null);
    
    
    const user_id = window.sessionStorage.getItem('user_id');
    // const resume_id = window.sessionStorage.getItem('resume_id');
    const name = window.sessionStorage.getItem('name');
     
    // console.log(user_id);

    console.log("User ID in Profile: ", user_id) // pass the user_id from App.js
    
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

    const handleStringToArray = (input) => {
        const str = input;
        const arr = str.split(",");
        const trimmed = arr.map(e => e.trim());
        return trimmed;

    }

    const fetchResumeData = async () => {
        try {
            const apiResponse = await API.post('Resumes', '/get', {
                contentType: "application/json",
                body: { user_id: user_id },
            });
            

            if (apiResponse && apiResponse.length > 0) {
                setResumeData(apiResponse[apiResponse.length - 1]); 
                setResumeData(data => {
                    setEducation(data.Education);
                    setWorkExperience(data['Work Experience']);
                    setLinks(data.Links);
                    setLocation(data.Location);
                    setSkills(handleStringToArray(data.Skills));
                    setSkillsStr(data.Skills);
                    setKeywords(handleStringToArray(data.Keywords));
                    setKeywordsStr(data.Keywords);
                    window.sessionStorage.setItem('resume_id', data.resume_id);
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
            handleResumeUploadEvent(user_id, fileName);
            
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleResumeUploadEvent = async (user_id, resume_id) => {
        const previousResumeId = window.sessionStorage.getItem('resume_id');
        await deletePreviousResume(previousResumeId);
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
            // console.log(apiResponse[0].resume_id)
            // deletePreviousResume(user_id, apiResponse[0].resume_id);
            window.sessionStorage.setItem('resume_id', apiResponse.resume_profile_data.resume_id);
            console.log(apiResponse.resume_profile_data.resume_id);

        } catch (error) {
            console.error('Error handling resume upload event:', error);
        }
        setLoading(false);

        navigate(0);
    };

    const deletePreviousResume = async (resume_id) => {
        try {
            const apiResponse = await API.post('Resumes', '/delete', {
            body: {
              user_id: user_id,
              resume_id: resume_id  
            }
          });
          console.log('Deleted previous resume:', resume_id);
        } catch (error) {
          console.log('Error deleting previous resume:', error); 
        }
      }

    const handleEditButton = (field) => {
        open();
        setEditingField(field);
        setOriginalSkills(skillsStr); 
        setOriginalKeywords(keywordsStr);
    }

    //// working on confirm button to change the attribute

    const handleConfirmEdit = async (field) => {
        const resume_id = window.sessionStorage.getItem('resume_id');
        try {
            const user = {
                user_id: user_id,
                resume_id: resume_id,
                update_attributes: { [field]: updatedValue },
            };
            // Send updated data to DynamoDB
            const apiResponse = await API.post('Resumes', '/update', {
                contentType: "application/json",
                body: user,
            });

            console.log('API Response:', apiResponse);
            setEditingField(null);
            setUpdatedValue('');
            close();

        } catch (error) {
            console.error('Failed to update user attribute:', error)
        }
    }

    const handleCancelEdit = () => {
        if (editingField === "Skills") {
            setSkillsStr(originalSkills);
            setSkills(handleStringToArray(originalSkills));
          }
          if (editingField === "Keywords") {
            setKeywordsStr(originalKeywords);
            setKeywords(handleStringToArray(originalKeywords)); 
        }
        setEditingField(null);
        setUpdatedValue(null); 
        
        close();
      }
      


    return (
        <>
            <div className="header-placeholder">
                <div className="header-tab-box">
                    <button className="close-btn btn-placeholder"><img className="close-button-img" src={closeButton} alt="Close Button"/></button>
                    <div className="header-title"><h2 className="profile">Profile</h2></div>
                    <button className="close-btn" onClick={() => {props.onFormSwitch('account'); navigate('/account')}}><img className="close-button-img" src={closeButton} alt="Close Button" /></button>
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

                        <h2 className="profile-name">{name}</h2>

                        <label className="resume-upload" htmlFor="resume-upload-btn" >UPLOAD RESUME</label>
                            <input type="file" id="resume-upload-btn" accept=".pdf" onChange={handleFileUpload} />
                    </div>

                    <div className="resume-info">
                        <div className="sub-info education">
                            <div className="sub-info-title">
                                <h4>Education</h4>
                                {/* <button className="add"><img className="add-button-img" src={addButton} alt="Add Button"/></button> */}
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
                                {/* <button className="add"><img className="add-button-img" src={addButton} alt="Add Button"/></button> */}
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
                        <div className="sub-info location">
                            <div className="sub-info-title">
                                <h4>Location</h4>
                                <button className="edit" onClick={() => handleEditButton('Location')}><img className="edit-text-img" src={editText} alt="Edit Text"/></button>
                            </div>
                            <div className="sub-info-description"> 
                                {
                                    location !== "" ? (
                                        <p>{location}</p>  
                                    ) : (
                                        <p></p>
                                    )
                                }        
                            </div>
                        </div>
                        <div className="sub-info skills">
                            <div className="sub-info-title">
                                <h4>Skills</h4>
                                <button className="edit" onClick={() => handleEditButton('Skills')}><img className="edit-text-img" src={editText} alt="Edit Text"/></button>
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
                        <div className="sub-info keywords">
                            <div className="sub-info-title">
                                <h4>Keywords</h4>
                                <button className="edit" onClick={() => handleEditButton('Keywords')}><img className="edit-text-img" src={editText} alt="Edit Text"/></button>
                            </div>
                            <div className="sub-info-tags"> 
                                {
                                    keywords.length > 0 ? (
                                        keywords.map(keyword => (
                                            <div className="tag" key={keyword}>
                                                <p>{keyword}</p> 
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
                                {/* <button className="add"><img className="add-button-img" src={addButton} alt="Add Button"/></button> */}
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
                        <img className="spinner-img"
                            src={spinner}
                            style={{ position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                width: '50px',
                                margin: 'auto',
                                display: 'block'
                            }}
                            alt="Loading..."
                        />
                    </>
            )}
            {showPopUp && (
                    <>
                        <div className="edit-pop-up-overlay"></div>
                        <div className="edit-pop-up">
                            <div className="edit-pop-up-content">
                                {editingField === 'Location' && (
                                    <textarea value={location} onChange={e => {setLocation(e.target.value); setUpdatedValue(e.target.value)}}/>
                                )}
                                {editingField === 'Skills' && (
                                    <textarea value={skillsStr} onChange={e => {setSkillsStr(e.target.value); setSkills(handleStringToArray(e.target.value)); setUpdatedValue(e.target.value)}}/>
                                )}
                                {editingField === 'Keywords' && (
                                    <textarea value={keywordsStr} onChange={e => {setKeywordsStr(e.target.value); setKeywords(handleStringToArray(e.target.value)); setUpdatedValue(e.target.value)}}/>
                                )}
                            </div>
                        
                            <div className="edit-pop-up-buttons">
                                <button onClick={() => handleCancelEdit()}>Cancel</button>
                                <button onClick={() => handleConfirmEdit(editingField)}>Confirm</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Profile;