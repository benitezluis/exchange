import React from 'react';
import logo from './assets/images/logo-bitso.png';
import './assets/css/App.css';
import { withRouter } from 'react-router-dom'
import Login from './Login'

const App = () => {
  return (
    <div>
      <Login />  
    </div>
  );
}

export default withRouter(App);
