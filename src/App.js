import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import ForgotPasswordPage from "./Components/ForgotPasswordPage";
import HomeScreen from "./Components/HomeScreen"
import BottomNavigation from "./Components/BottomNavigation";
import HeaderTab from "./Components/HeaderTab";
import SavedJobs from './Components/SavedJobs';
import Profile from "./Components/Profile"
import MyAccount from "./Components/MyAccount";
import Preferences from "./Components/Preferences"
import Setting from "./Components/Setting";

function App() {
  const currentForm = window.sessionStorage.getItem('currentForm');
  if (!currentForm) {
    window.sessionStorage.setItem('currentForm', 'login');
  }
  
  const [likedJobs, setLikedJobs] = useState([]);
  // const [user_id, setUserID] = useState(null);
  // const [name, setName] = useState(null);
  // const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  
  // useEffect(() => {
  //   const fetchUser = () => {
  //     const userInfo = window.sessionStorage.getItem('userInfo');
  //     if(userInfo) {
  //       setName(userInfo.name);
  //       setEmail(userInfo.email);
  //       setUserID(userInfo.user_id);
  //     }
  //   };
  //   fetchUser();
  // }, [window.sessionStorage.getItem('userInfo')]);

  function handleRemoveButton(job){
    const index = likedJobs.indexOf(job);
    console.log(index)
    var updatedJobs = likedJobs.filter(j => j !== job); 
    setLikedJobs(updatedJobs);
  }

  
  const toggleForm = (formName) => {
    window.sessionStorage.setItem('currentForm', formName);
  };

  // console.log(user_id);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={
              <>
                <LoginPage 
                  // setUserID={setUserID} 
                  onFormSwitch={toggleForm} 
                  // setName={setName} 
                  // setEmail={setEmail}
                />
              </>
            }/>
            <Route path="/signup" element={
              <>
                <SignUpPage 
                  onFormSwitch={toggleForm} 
                />
              </>
            }/>
            <Route path="/forgot" element={
              <>
                <ForgotPasswordPage 
                  onFormSwitch={toggleForm}
                />;
              </>
            }/>
            <Route path="/home" element={
              <>
                <HeaderTab onFormSwitch={toggleForm}/>
                <HomeScreen 
                  likedJobs={likedJobs} 
                  setLikedJobs={setLikedJobs} 
                  // user_id={user_id} 
                />
                <BottomNavigation onFormSwitch={toggleForm} />
              </>
            }/>
            <Route path="/saved" element={
              <>
                <HeaderTab onFormSwitch={toggleForm} />
                <SavedJobs 
                  likedJobs={likedJobs} 
                  handleRemoveButton={handleRemoveButton}
                />
                <BottomNavigation onFormSwitch={toggleForm} />        
              </>
            }/>
            <Route path="/account" element={
              <>
                <HeaderTab  onFormSwitch={toggleForm} />
                <MyAccount 
                   
                  onFormSwitch={toggleForm} 
                  // user_id={user_id} 
                />
                <BottomNavigation onFormSwitch={toggleForm} />
              </>
            }/>
            <Route path="/profile" element={
              <>
                <HeaderTab onFormSwitch={toggleForm} />
                <Profile 
                   
                  onFormSwitch={toggleForm} 
                  // user_id={user_id} 
                  // name={name}
                />
                <BottomNavigation onFormSwitch={toggleForm} />
              </>
            }/>
            <Route path="/preferences" element={
              <>
                <HeaderTab onFormSwitch={toggleForm} />
                <Preferences 
                   
                  onFormSwitch={toggleForm} 
                />
                <BottomNavigation onFormSwitch={toggleForm} />
              </>
            }/>
            <Route path="/setting" element={
              <>
                <HeaderTab onFormSwitch={toggleForm} />
                <Setting 
                   
                  onFormSwitch={toggleForm} 
                  // user_id={user_id} name={name} 
                  // email={email} setName={setName} 
                  // setEmail={setEmail} 
                  setPassword={setPassword}
                />
                <BottomNavigation onFormSwitch={toggleForm} />
              </>
            }/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );

}


export default App;


  // const renderForm = () => {
  //   switch (currentForm) {
  //     case 'login':
  //       return <LoginPage setUserID={setUserID} onFormSwitch={toggleForm} setName={setName} setEmail={setEmail}/>;
  //     case 'sign up':
  //       return <SignUpPage onFormSwitch={toggleForm} />;
  //     case 'forgot password':
  //       return <ForgotPasswordPage onFormSwitch={toggleForm} />;
  //     case 'home':
  //       return (
  //         <>
  //           <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm}/>
  //           <HomeScreen likedJobs={likedJobs} setLikedJobs={setLikedJobs} user_id={user_id} />
  //           <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
  //         </>
  //       );
  //     case 'saved-jobs':
  //       return (
  //         <>
  //           <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm} />
  //           <SavedJobs likedJobs={likedJobs} handleRemoveButton={handleRemoveButton}/>
  //           <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
  //         </>
  //       );
  //     case 'account':
  //       return (
  //         <>
            // <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm} />
            // <MyAccount currentForm={currentForm} onFormSwitch={toggleForm} user_id={user_id} />
            // <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
  //         </>
  //       );
  //     case 'profile':
  //       return (
  //         <>
            // <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm} />
            // <Profile currentForm={currentForm} onFormSwitch={toggleForm} user_id={user_id} name={name}/>
            // <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
  //         </>
  //       );
  //     case 'preferences':
  //       return (
  //         <>
            // <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm} />
            // <Preferences currentForm={currentForm} onFormSwitch={toggleForm} />
            // <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
  //         </>
  //       );
  //     case 'setting':
  //       console.log(email)
  //       return (
  //         <>
  //           <HeaderTab currentForm={currentForm} onFormSwitch={toggleForm} />
  //           <Setting 
  //             currentForm={currentForm} 
  //             onFormSwitch={toggleForm} 
  //             user_id={user_id} name={name} 
  //             email={email} setName={setName} 
  //             setEmail={setEmail} 
  //             setPassword={setPassword}
  //           />
  //           <BottomNavigation currentForm={currentForm} onFormSwitch={toggleForm} />
  //         </>
  //       );

  //     // Add more cases for other forms if needed
  //     default:
  //       return <LoginPage onFormSwitch={toggleForm} />;
  //   }
  // };


  // return (
  //   <div className="App">
  //     {renderForm()}
  //   </div>
  // );

  



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
