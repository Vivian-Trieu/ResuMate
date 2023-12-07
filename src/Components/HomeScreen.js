import React, { useState, useEffect } from 'react';
import "./HomeScreen.css";
import JobCard from './JobCard';
import Amplify, { API } from 'aws-amplify';
import spinner from '../img/spinner.gif';

function HomeScreen() {

  const [jobs, setJobs] = useState([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('loading');
  const user_id = window.sessionStorage.getItem('user_id');
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiResponse = await API.post('Jobs', '/query', {
          body: {
            query: "New Jersey, BPO, data trend analysis, MSFT Office",
          },
        });

        console.log('Resume Info API Response:', apiResponse);

        // Check if the response contains the expected property
        if (apiResponse && apiResponse.matches) {
          setJobs(apiResponse.matches);
          setCurrentScreen('swiping');
        } else {
          console.log('Error fetching jobs: Invalid response format');
          setCurrentScreen('error');
        }

      } catch (error) {
        console.log('Error fetching jobs:', error);
        setCurrentScreen('error');
      }
    };

    fetchJobs();
  }, []);

  function handleLike() {
    const job = jobs[currentJobIndex];
    // setLikedJobs([...likedJobs, job]);
    nextJob();
  }

  function handleDislike() {
    nextJob();
  }

  function nextJob() {
    setCurrentJobIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= jobs.length) {
        setCurrentScreen('no-more');
      }
      return newIndex;
    });
  }

  let content;

  if (currentScreen === 'loading') {
    content = (
      <>
        <div className="header-placeholder"></div>
        <div className="home-screen-container">
          <img className="spinner-img"
            src={spinner}
            style={{ width: '50px', margin: 'auto', display: 'block' }}
            alt="Loading..."
          />
        </div>
        <div className="header-placeholder"></div>
      </>
    );
  } else if (currentScreen === 'error') {
    content = (
      <>
        <div className="header-placeholder"></div>
        <div className="home-screen-container">
          <p>Error fetching jobs. Please try again later.</p>
        </div>
        <div className="header-placeholder"></div>
      </>
    );
  } else if (currentScreen === 'swiping') {
    content = (
      <>
        <div className="header-placeholder"></div>
        <div className="home-screen-container">
          < JobCard
            job={jobs[currentJobIndex]}
            onDislikeButton={handleDislike}
            onLikeButton={handleLike}
            user_id={user_id}
          />
        </div>
        <div className="header-placeholder"></div>
      </>
    );
  } else if (currentScreen === 'no-more') {
    content = (
      <>
        <div className="header-placeholder"></div>
        <div className="home-screen-container">
          <div className="job-box">
            <div className="job no-more">
              <h2>No more jobs</h2>
              <p>You've seen all available jobs. Check back later.</p>
            </div>
          </div>
        </div>
        <div className="header-placeholder"></div>
      </>
    );
  }

  return (
    <>
      <div className="job-finder">
        {content}
        <div style={{ display: 'none' }}> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
      </div>
    </>
  );


}

export default HomeScreen;  