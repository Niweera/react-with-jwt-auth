import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearData } from "./actions/itemActions";
import { loadReCaptcha } from "react-recaptcha-google";

import "./App.css";

import Header from "./components/layout/Header";
import Dashboard from "./components/items/Dashboard";
import Home from "./components/items/Home";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/Login";

import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current data
    store.dispatch(clearData());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  componentDidMount() {
    loadReCaptcha();
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/home" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
