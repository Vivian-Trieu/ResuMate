import React from 'react';

function SavedJobs({ likedJobs }) {
  return (
    <div className="saved-jobs">
      {likedJobs.map(job => (
        <div key={job.id} className="saved-job">
          <h2>{job.title}</h2> 
          <p>{job.company}</p>
        </div>  
      ))}
    </div>
  );
}

export default SavedJobs;