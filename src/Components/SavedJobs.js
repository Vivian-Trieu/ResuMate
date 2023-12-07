import "./SavedJobs.css"
import React, { useState, useEffect } from 'react';
import Amplify, { API, Storage } from 'aws-amplify';

function SavedJobs() {
  const user_id = window.sessionStorage.getItem('user_id');
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiResponse = await API.post('Users', '/viewJob', {
          body: {
            user_id: user_id,
          },
        });

        console.log('API Response:', apiResponse);
        setJobs(apiResponse.job_listings);
      } catch (error) {
        console.log('Error fetching jobs:', error);
        // setCurrentScreen('error');
      }
    };

    fetchJobs();
  }, []);

  const handleRemoveJob = async (job_id) => {
    try {
      const apiResponse = await API.post('Users', '/unsaveJob', {
        body: {
          user_id: user_id,
          job_id: job_id,
        },
      });
      setJobs(prevJobs => 
        prevJobs.filter(job => job.job_id !== job_id)
      );
      
  } catch (error) {
    console.error('Error', error);
}
};

  return (
    <>
      <div className="header-placeholder"></div>
      <div className="saved-jobs-container">
        <div className="saved-jobs-title">
          <h1 className="saved-jobs">Saved Jobs</h1>
        </div>
        
        <div className="saved-jobs-box">
          {jobs.map(job => (
            <div key={job.job_id} className="saved-job">
              <h3>{job.name}</h3>
              <p>{job.company.name}</p>
              <div className="job-buttons">
                <button className="apply-btn">Apply</button>
                <button className="remove-btn" onClick={() => handleRemoveJob(job.job_id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SavedJobs;