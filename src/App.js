import React, {useState} from "react";
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

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Login</Link>
//             </li>
//             <li>
//               <Link to="/signup">Sign Up</Link>
//             </li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route path="/signup">
//             <SignUpPage />
//           </Route>
//           <Route path="/forgot-password">
//             <ForgotPasswordPage />
//           </Route>
//           <Route path="/">
//             <LoginPage />
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

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

export default App;
