import React, { Component } from 'react';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class RoutesApp extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registro" component={Signup} />
        </Switch>
      </Router>
    )
  }
}

export default RoutesApp;
