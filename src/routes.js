import React, { Component } from 'react';
import ReactNotification from 'react-notifications-component'
import App from './App';
import Login from './Login';
import Signup from './Signup';
import 'react-notifications-component/dist/theme.css'
import './assets/css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class RoutesApp extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/inicio" exact component={App} />
          <Route path="/login" exact component={Login} />
          <Route path="/registro" component={Signup} />
        </Switch>

        <ReactNotification />
      </Router>
    )
  }
}

export default RoutesApp;
