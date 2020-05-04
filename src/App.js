import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Dashboard from "./components/offers/dashboard.component";
import CreateOffer from "./components/offers/createoffer.component";

function App() {
  return (
      <Router>
          <div className="App">
              <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                  <div className="container">
                      <Link className="navbar-brand" to={"/offers"}>RED Dashboard</Link>
                      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                          <ul className="navbar-nav ml-auto">
                              <li className="nav-item">
                                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                              </li>
                          </ul>
                      </div>
                  </div>
              </nav>

              <div className="auth-wrapper">
                  <div className="auth-inner">
                      <Switch>
                          <Route exact path='/' component={Dashboard} />
                          <Route path='/offers' component={Dashboard} />
                          <Route path='/create-offer' component={CreateOffer} />
                          <Route path="/sign-in" component={Login} />
                          <Route path="/sign-up" component={SignUp} />
                      </Switch>
                  </div>
              </div>
          </div>
      </Router>
  );
}

export default App;
