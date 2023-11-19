import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import ForgotPasswordPage from "./Components/ForgotPasswordPage";
import HomeScreen from "./Components/HomeScreen"
import BottomNavigation from "./Components/BottomNavigation";
import HeaderTab from "./Components/HeaderTab";
import SavedJobs from './Components/SavedJobs';
import Profile from "./Components/Profile"
import MyAccount from "./Components/MyAccount";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [likedJobs, setLikedJobs] = useState([]);
  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return <LoginPage onFormSwitch={toggleForm} />;
      case 'sign up':
        return <SignUpPage onFormSwitch={toggleForm} />;
      case 'forgot password':
        return <ForgotPasswordPage onFormSwitch={toggleForm} />;
      case 'home':
        return (
          <>
            <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm}/>
            <HomeScreen likedJobs={likedJobs} setLikedJobs={setLikedJobs} />;
            <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
          </>
        );
      case 'saved-jobs':
        return (
          <>
            <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm} />
            <SavedJobs likedJobs={likedJobs} />
            <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
          </>
        );
      case 'account':
        return (
          <>
            <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm} />
            <MyAccount currentForm={currentForm} onFormSwitch={toggleForm} />
            <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
          </>
        );
      case 'profile':
        return(
          <>
            <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm} />
            <Profile currentForm={currentForm} onFormSwitch={toggleForm} />
            <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
          </>
        );
      // Add more cases for other forms if needed
      default:
        return <LoginPage onFormSwitch={toggleForm} />;
    }
  };

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {renderForm()}
    </div>
  );
}


export default App;


/*
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [likedJobs, setLikedJobs] = useState([]);
  let content;

  switch (activeTab) {
    case 'home':
      content = (
        <>
          <HeaderTab activeTab={activeTab} setActiveTab={setActiveTab}/>
          <HomeScreen likedJobs={likedJobs} setLikedJobs={setLikedJobs} />
          <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )
      break
    
    case 'saved-jobs':
      content = (
        <>
          <HeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <SavedJobs likedJobs={likedJobs} />
          <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )
      break

    case 'account':
      content = (
        <>
          <HeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <MyAccount activeTab={activeTab} setActiveTab={setActiveTab} />
          <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )
      break
    
    case 'profile':
      content = (
        <>
          <HeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <Profile activeTab={activeTab} setActiveTab={setActiveTab} />
          <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )
      break
  }
 
  return (
    <div className="App">
      {content}
    </div>
  )
}

 return (
     <Router>
       <div className="App">
         <nav>
           <ul>
             <li>
               <Link to="/">Login</Link>
             </li>
             <li>
               <Link to="/signup">Sign Up</Link>
             </li>
           </ul>
         </nav>
         <Routes>
           <Route path="/signup">
             <SignUpPage />
           </Route>
           <Route path="/forgot-password">
             <ForgotPasswordPage />
           </Route>
           <Route path="/">
             <LoginPage />
           </Route>
         </Routes>
       </div>
     </Router>
   );

*/
