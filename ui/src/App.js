import React, { useState } from "react";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";

export default function App() {
  const [loggedIn,setLoggedIn]=useState(false)
  return (
    <Router>
      <Route>
        <Switch>
          <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Home/>}
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Route>
    </Router>);
}
