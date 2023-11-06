import React, {useState, useEffect} from 'react'
import "./HomeScreen.css"
import SaveButton from "../img/click-to-save-job-button.png"
import SkipButton from "../img/click-to-skip-job-button.png"

function HomeScreen({likedJobs, setLikedJobs}) {

    const [jobs, setJobs] = useState([
        {
          id: 1, 
          title: 'Software Engineer',
          company: 'Google', 
          location: 'Mountain View, CA',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia \
                        deserunt mollit anim id est laborum.\
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia \
                        deserunt mollit anim id est laborum.\
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia \
                        deserunt mollit anim id est laborum.'
        },
        {
          id: 2,
          title: 'Product Manager',
          company: 'Microsoft',
          location: 'Redmond, WA',
          description: 'def'
        },
        // etc
      ]);
    
      const [currentJobIndex, setCurrentJobIndex] = useState(0);

      const [currentScreen, setCurrentScreen] = useState('swiping');
    
      function handleLike() {
        const job = jobs[currentJobIndex];
        setLikedJobs([...likedJobs, job]);
        nextJob();
      }
      
      function handleDislike() {
        nextJob();
      }
    
      function nextJob() {
        setCurrentJobIndex(currentJobIndex + 1);
        if (currentJobIndex === jobs.length - 1) {
            setCurrentScreen('no-more');
        }
      }
    
      let content;

      if (currentScreen === 'swiping') {
        content = (
          <div className="home-screen-container">
            <div className="job-box">
              <div className="job">
                  <h1 className="job-title">{jobs[currentJobIndex].title}</h1>
                  <p className="company">{jobs[currentJobIndex].company}</p>
                  <div className="break"></div>
                  <div className="other-attributes">
                    <p className="location">{jobs[currentJobIndex].location}</p>
                  </div>
                  <div className="description-box">
                      <p>{jobs[currentJobIndex].description}</p>
                  </div>
              </div>
              <div className="button-container">
                <button className="skip-job"><img className="button-img" src={SkipButton} alt="Skip Job" onClick={handleDislike}/></button>
                <button className="save-job"><img className="button-img" src={SaveButton} alt="Save Job" onClick={handleLike}/></button>
              </div>
            </div>  
          </div>
        );
      } else if (currentScreen === 'no-more') {
        content = (
          <div className="home-screen-container">
            <div className="job-box">
              <div className="job no-more">
                <h2>No more jobs</h2>
                <p>You've seen all available jobs. Check back later.</p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="job-finder">
          <header>

          </header>
    
          <main>
            {content}
          </main>
          <div style={{display: 'none'}}> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        </div>
      );


}

export default HomeScreen