import React from 'react';
import "./JobCard.css";
import SaveButton from "../img/click-to-save-job-button.png"
import SkipButton from "../img/click-to-skip-job-button.png"

function JobCard({ job, onDislikeButton, onLikeButton }) {
  const handleDislike = () => {
    onDislikeButton();
  };

  const handleLike = () => {
    onLikeButton();
  };

  return (
    <div className="job-card">
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
          <img className="button-img" src={SaveButton} alt="Save Job" />
        </button>
      </div>
    </div>
  );
}

export default JobCard;