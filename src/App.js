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

  if (activeTab === 'home') {
    content = <HomeScreen likedJobs={likedJobs} setLikedJobs={setLikedJobs} />
  }
  else if (activeTab === 'saved-jobs') {
    content = <SavedJobs likedJobs={likedJobs}/>
  } else {
    content = <Profile/>
  }

  return (
    <div className="App">
      <HeaderTab />
      <BottomNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {content}
    </div>
  )
}

export default App;
