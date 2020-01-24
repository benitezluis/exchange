import React from 'react';
import logo from './assets/images/logo-bitso.png';
import { Link, withRouter } from 'react-router-dom'
import './assets/css/App.css';

const Login = () => {
  return (
    <div className="App">
      <div className="login">
        <img src={logo} className="logo" alt="bitso" />

        <div className="form">
          <label>Email</label>
          <input type="text" />
        </div>

        <div className="form">
          <label>Contraseña</label>
          <input type="password" />
        </div>

        <div className="form">
          <button className="btn__login">Iniciar sesión</button>
        </div>
        
        <div className="form">
          ¿No tienes cuenta? <Link to="/registro" className="btn__redirect">Registrate</Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
