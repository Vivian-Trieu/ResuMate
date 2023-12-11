import React, { useState, useEffect } from 'react';
import "./HomeScreen.css";
import JobCard from './JobCard';
import Amplify, { API } from 'aws-amplify';
import spinner from '../img/spinner.gif';

function HomeScreen() {

  const [jobs, setJobs] = useState([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('loading');
  const [resumeData, setResumeData] = useState(null);
  const user_id = window.sessionStorage.getItem('user_id');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  

    useEffect(() => {
      const fetchResumeData = async () => {
        try {
            const apiResponse = await API.post('Resumes', '/get', {
                contentType: "application/json",
                body: { user_id: user_id },
            });
            
    
            if (apiResponse && apiResponse.length > 0) {
                setResumeData(apiResponse[apiResponse.length - 1]);     
                console.log('set', apiResponse[apiResponse.length - 1]);   
                // console.log('get', resumeData);
            }            
    
        } catch (error) {
            console.error('Error fetching resume info:', error);
        }
      }
      fetchResumeData();

    }, [])
    
    useEffect(() => {
      if (resumeData !== null) {
  
        console.log('get', resumeData);
        const keysToFilter = ['resume_id', 'user_id', 'upload_date', 'Name', 'Links', 'Education', 'Work Experience', 'Keywords', 'Skills'];
  
        const filtered = Object.entries(resumeData).filter(([key]) => !keysToFilter.includes(key)).filter(([, value]) => value !== 'N/A').map(([, value]) => value);
        const string = filtered.join(', ');
  
        console.log(string);
        
        const user = {
          queries:
            [
              {
                query: resumeData.Keywords
              },
              {
                query: resumeData.Skills
              },
              {
                query: string
              }
            ],
          user_id: user_id
        }
  
  
        const fetchJobs = async () => {
          try {
            const apiResponse = await API.post('Jobs', '/query', {
              body: user
            });
  
            console.log('Resume Info API Response:', apiResponse);
  
            // Check if the response contains the expected property
            if (apiResponse.length == 0) {
              setCurrentScreen('no-more');
            } else if (apiResponse && apiResponse.matches) {
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
      }
    }, [resumeData]);

  function handleLike() {
    const job = jobs[currentJobIndex];
    // setLikedJobs([...likedJobs, job]);
    setTimeout(() => {
      nextJob();
    }, 500);
    
  }

  function handleDislike() {
    setTimeout(() => {
      nextJob();
    }, 500);
  }

  function nextJob() {
    setCurrentJobIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= jobs.length) {
        setIsLoadingMore(true);
        return prevIndex;
        // setCurrentScreen('no-more');
      }
      return newIndex;
    });
  }

  useEffect(() => {
    if (!isLoadingMore) return;
    const keysToFilter = ['resume_id', 'user_id', 'upload_date', 'Name', 'Links', 'Education', 'Work Experience', 'Keywords', 'Skills'];
  
        const filtered = Object.entries(resumeData).filter(([key]) => !keysToFilter.includes(key)).filter(([, value]) => value !== 'N/A').map(([, value]) => value);
        const string = filtered.join(', ');
  
        console.log(string);
        
        const user = {
          queries:
            [
              {
                query: resumeData.Keywords
              },
              {
                query: resumeData.Skills
              },
              {
                query: string
              }
            ],
          user_id: user_id
        }
    const fetchAdditionalJobs = async () => {
      try {
        const apiResponse = await API.post('Jobs', '/query', {
          body: user
        });

        console.log('Resume Info API Response:', apiResponse);

        // Check if the response contains the expected property
        if (apiResponse && apiResponse.matches) {
          // setJobs(apiResponse.matches);
          setCurrentScreen('swiping');
          setJobs(prevJobs => [...prevJobs, ...apiResponse.matches]);
          setIsLoadingMore(false);
        } else {
          console.log('Error fetching jobs: Invalid response format');
          setCurrentScreen('error');
        }

      } catch (error) {
        console.log('Error fetching jobs:', error);
        setCurrentScreen('error');
      }

    };
    
    fetchAdditionalJobs();

  }, [isLoadingMore]);


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