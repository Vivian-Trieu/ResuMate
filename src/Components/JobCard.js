import React, { useState, useEffect } from 'react'
import "./JobCard.css";
import SaveButton from "../img/click-to-save-job-button.png"
import SkipButton from "../img/click-to-skip-job-button.png"
import InnerHTMLReader from './InnerHTMLReader';
import { API } from 'aws-amplify';

function JobCard({ job, onDislikeButton, onLikeButton, user_id }) {
    const [swiped, setSwiped] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState('');
    const key= job.requisitionId;

    useEffect(() => {
        setSwiped(false);
        setSwipeDirection('');
    }, [job]);

    async function saveJobToDB(job) {
        try {
            const user = {
                user_id: user_id,
                job_id: key,
            };
            // Send updated data to DynamoDB
            const apiResponse = await API.post('Users', '/saveJob', {
                contentType: "application/json",
                body: user,
            });
        
        } catch (error) {
          console.log('Error saving job to DB:', error);
        }
      }

      async function saveToSeenJob(job) {
        try {
            const user = {
                user_id: user_id,
                job_id: key,
            };
            // Send updated data to DynamoDB
            const apiResponse = await API.post('Users', '/addSeenJob', {
                contentType: "application/json",
                body: user,
            });
        
        } catch (error) {
          console.log('Error saving job to SeenJob:', error);
        }
      }

    const handleDislike = () => {
        onDislikeButton();
        saveToSeenJob(job);
        setSwiped(true);
        setSwipeDirection('left');
    };


    const handleLike = () => {
        onLikeButton();
        saveJobToDB(job);
        saveToSeenJob(job);
        setSwiped(true);
        setSwipeDirection('right');
    };

    const handleTransitionEnd = () => {
        setSwiped(false);
        setSwipeDirection('');
    }

    const getCardStyle = () => {
        if (swiped) {
            return {
                transform: `translateX(${swipeDirection === 'right' ? '100%' : '-100%'})`,
                opacity: 0 ,
            };
        }
        return {};
    };

    return (
        <div 
            // key={job.requisitionId}
            className={`job-card ${swiped ? 'swiped' : ''}`} 
            style={getCardStyle()}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className="job">
                <h1 className="job-title">{job.title}</h1>
                <p className="company">{job.companyDisplayName}</p>
                <div className="home-break"></div>
                <div className="other-attributes">
                    <p className="location">{job.addresses}</p>
                </div>
                <div className="description-box">
                    {/* <p>{job.description}</p> */}
                    <InnerHTMLReader value={job.description} />
                </div>
            </div>
            <div className="button-container">
                <button className="swipe-btn skip-job" onClick={handleDislike}>
                    <img className="button-img" src={SkipButton} alt="Skip Job" />
                </button>
                <button className="swipe-btn save-job" onClick={handleLike}>
                    <img className="button-img" src={SaveButton} alt="Save Job" />
                </button>
            </div>
        </div>
    );
}

export default JobCard;