import "./SavedJobs.css"
import React from 'react';

function SavedJobs({likedJobs, handleRemoveButton}) {

  return (
    <>
      <div className="header-placeholder"></div>
      <div className="saved-jobs-container">
        <div className="saved-jobs-title">
          <h1 className="saved-jobs">Saved Jobs</h1>
        </div>
        
        <div className="saved-jobs-box">
          {likedJobs.map(job => (
            <div key={job.id} className="saved-job">
              <h3>{job.title}</h3>
              <p>{job.companyDisplayName}</p>
              <div className="job-buttons">
                <button className="apply-btn">Apply</button>
                <button className="remove-btn" onClick={() => {handleRemoveButton(job);}}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SavedJobs;