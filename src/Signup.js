import React from 'react';
import logo from './assets/images/logo-bitso.png';
import { Link, withRouter } from 'react-router-dom'
import './assets/css/App.css';

const Signup = () => {
  return (
    <div className="App">
      <div className="login">
        <img src={logo} className="logo" alt="bitso" />

        <div className="form">
          <label>Nombre</label>
          <input type="text" />
        </div>

        <div className="form">
          <label>Apellido</label>
          <input type="text" />
        </div>

        <div className="form">
          <label>Email</label>
          <input type="text" />
        </div>

        <div className="form">
          <label>Contraseña</label>
          <input type="password" />
        </div>

        <div className="form">
          <label>Confirmar contraseña</label>
          <input type="password" />
        </div>

        <div className="form">
          <button className="btn__login">Registrarme</button>
        </div>
        
        <div className="form">
          ¿Ya tienes una cuenta? <Link to="/" className="btn__redirect">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Signup);
