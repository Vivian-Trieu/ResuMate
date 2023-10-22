import "./SavedJobs.css"
import React from 'react';

function SavedJobs({likedJobs}) {
  return (
    <div className="saved-jobs-cointainer">
      <h2>Saved Jobs</h2>
      
      <div className="saved-jobs-box">
        {likedJobs.map(job => (
          <div key={job.id} className="saved-job">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedJobs;