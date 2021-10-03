import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import {ToastContainer } from 'react-toastify';
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import SignUp from "./Components/Signup";

function App() {
  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
