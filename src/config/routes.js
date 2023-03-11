import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

const RoutesRoot = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesRoot;