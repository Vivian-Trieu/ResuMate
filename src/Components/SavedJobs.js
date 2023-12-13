import "./SavedJobs.css"
import React, { useState, useEffect } from 'react';
import Amplify, { API, Storage } from 'aws-amplify';
import spinner from '../img/spinner.gif';
import JobDataContent from "./JobDataContent";

function SavedJobs() {
  const user_id = window.sessionStorage.getItem('user_id');
  const [jobs, setJobs] = useState([])
  const [jobData, setJobData] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const open = () => setShowPopUp(true);  
  const close = () => setShowPopUp(false);
  let content;

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

const handleOpenJob = (job_id) => {
  getSingleJob(job_id)
  .then(() => {
    setIsLoading(false);
    open();
  })  
  console.log('info', jobData);
}

async function getSingleJob(job_id) {
  try {
      const payload = {
          job_id: job_id,
      };
      // Send updated data to DynamoDB
      const apiResponse = await API.post('Users', '/getSingleJob', {
          contentType: "application/json",
          body: payload,
      });
      console.log(apiResponse);
      setJobData(apiResponse);
  
  } catch (error) {
    console.log('Error get job from DB:', error);
  }
}


  return (
    <>
      <div className="header-placeholder"></div>
      <div className="saved-jobs-container">
        <div className="saved-jobs-title">
          <h1 className="saved-jobs">Saved Jobs</h1>
        </div>
        
        <div className="saved-jobs-box">
          {jobs.map(job => (
            <div key={job.job_id} className="saved-job" onClick={() => handleOpenJob(job.job_id)}>
              <h3>{job.name}</h3>
              <p>{job.company.name}</p>
              <div className="job-buttons">
                <button className="apply-btn" onClick={() => window.open(job.refs.landing_page, '_blank')}>Apply</button>
                <button className="remove-btn" onClick={() => handleRemoveJob(job.job_id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {showPopUp && (
                  <>
                  {isLoading ? (
                    <img className="spinner-img"
                      src={spinner}
                      style={{ width: '50px', margin: 'auto', display: 'block' }}
                      alt="Loading..."
                    /> 
                  ) : (
                    <JobDataContent 
                      jobData={jobData}
                      handleRemoveJob={handleRemoveJob}
                      close={close}
                    />
                  )}
                </>
                )}
      </div>
    </>
  );
}

export default SavedJobs;