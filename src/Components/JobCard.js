import React, { useState, useEffect } from 'react'
import "./JobCard.css";
import SaveButton from "../img/click-to-save-job-button.png"
import SkipButton from "../img/click-to-skip-job-button.png"

function JobCard({ job, onDislikeButton, onLikeButton }) {
    const [swiped, setSwiped] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState('');

    useEffect(() => {
        setSwiped(false);
        setSwipeDirection('');
    }, [job]);

    const handleDislike = () => {
        onDislikeButton();
        setSwiped(true);
        setSwipeDirection('left');
    };

    const handleLike = () => {
        onLikeButton();
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
            };
        }
        return {};
    };

    return (
        <div 
            key={job.id}
            className={`job-card ${swiped ? 'swiped' : ''}`} 
            style={getCardStyle()}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className="job">
                <h1 className="job-title">{job.title}</h1>
                <p className="company">{job.company}</p>
                <div className="break"></div>
                <div className="other-attributes">
                    <p className="location">{job.location}</p>
                </div>
                <div className="description-box">
                    <p>{job.description}</p>
                </div>
            </div>
            <div className="button-container">
                <button className="swipe-btn skip-job" onClick={handleDislike}>
                    <img className="button-img" src={SkipButton} alt="Skip Job" />
                </button>
                <button className="swipe-btn save-job" onClick={handleLike}>
                    <img className="button-img" src={SaveButton} alt="Save           ob" />
                </button>
            </div>
        </div>
    );
}

export default JobCard;