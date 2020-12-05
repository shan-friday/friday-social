/* global chrome */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import {
  removeSessionId,
  extensionInstalled,
  extensionNotInstalled,
  // setSessionId
}
  from './actions/sessionActions';
import { withCookies } from 'react-cookie';
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import "./App.scss";

// import Navbar from "./components/layout/Navbar";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/auth/RegisterPage";
// import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import SearchBar from './components/layout/SearchBar';
import GoogleLogin from "./components/auth/GoogleLogin";
import JitsiComponent from "./components/dashboard/JitsiComponent";
import LoginPage from "./components/auth/LoginPage";
import InstallExtension from './components/party/InstallExtension';
import JoinParty from './components/party/JoinParty';
import LandingParty from './components/party/LandingParty';
import OpenParty from './components/party/OpenParty';
import PrivacyPolicy from "./components/common/PrivacyPolicy";


axios.defaults.baseURL = 'https://5z4hk0h5zk.execute-api.ap-south-1.amazonaws.com/dev';
// axios.defaults.baseURL = 'http://localhost:5001';

const isExtensionInstalled = () => {
  // chrome-extension://jjpkejikllkphemiloeipdmbaonlpfnm/static/js/background.js
  // chrome-extension://jjpkejikllkphemiloeipdmbaonlpfnm/_generated_background_page.html
  // let e = new Image();
  // e.src = 'chrome-extension://jjpkejikllkphemiloeipdmbaonlpfnm/static/media/laughwithtears.gif';
  // // let isThere = false;
  // e.onload = () => {
  //   console.log('Extension has been installed');
  //   store.dispatch(extensionInstalled());
  // };
  // e.onerror = (err) => {
  //   console.log('Extension needs to be installed', err);
  //   store.dispatch(extensionNotInstalled());
  // }
  // console.log(chrome, chrome.runtime);
  var id = "jjpkejikllkphemiloeipdmbaonlpfnm";
  chrome.runtime.sendMessage(id, { action: "id", value: id }, function (response) {
    if (response && (response.id === id)) //extension installed
    {
      console.log(response);
      store.dispatch(extensionInstalled());
    }
    else //extension not installed
    {
      store.dispatch(extensionNotInstalled());
      console.log("Please consider installig extension");
    }

  });

  // var id = "jjpkejikllkphemiloeipdmbaonlpfnm";
  // chrome.runtime.sendMessage(id, { message: 'getPartyId' }, function (response) {
  //   if (response) //extension installed
  //   {
  //     console.log(response);
  //     store.dispatch(setSessionId(response));
  //   }
  // });
}

store.dispatch(removeSessionId());
isExtensionInstalled();

// Check for token to keep user logged in 
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in ms
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());

    // Removing this as we need not redirect to login if a user token expires. 
    // He would need to signin only if he tries to reach a private page
    // window.location.href = "./login";
  }
} else if (document.cookie) {
  var cookies = {};
  (document.cookie || '').split(/;\s*/).map(a => {
    var s = a.split('=');
    cookies[s[0]] = s[1];
    return a;
  });
  if (cookies.token) {
    const token = cookies.token;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);

    const decoded = jwt_decode(token);

    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000; // to get in ms
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "./login";
    }
  }
}

class App extends Component {
  render() {
    // console.log(store.getState());
    return (
      <Provider store={store} >
        <Router>
          <div className="App">
            {/* <Navbar /> */}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register" component={Register} />
            {/* <Route exact path="/login" component={Login} /> */}
            <Route exact path="/googleLogin" component={GoogleLogin} />
            <Route exact path='/theatre' component={SearchBar} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/installExtension" component={InstallExtension} />
            <Route exact path="/landingParty/:partyId" component={LandingParty} />
            <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              {/* <PrivateRoute exact path="/dashboard" render={() => (<Dashboard cookies={this.props.cookies} />)} /> */}
              <PrivateRoute exact path="/jitsiComponent" component={JitsiComponent} />
              <PrivateRoute exact path="/joinParty" component={JoinParty} />
              <PrivateRoute exact path="/openParty/:partyId" component={OpenParty} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default withCookies(App);