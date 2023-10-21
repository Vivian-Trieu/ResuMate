import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LoginPage from "src/components/LoginPage.js";
import SignUpPage from "src/components/SignUpPage.js";
import ForgotPasswordPage from "src/components/ForgotPasswordPage.js";

function App() {
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
        <Switch>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
