import React, { useState } from 'react';
import logo from './assets/images/bitcoin-icon.png';
import { Link, withRouter } from 'react-router-dom'
import './assets/css/App.css';
import APIClient from './api'

const Signup = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [enabled, setEnabled] = useState(true)

  const userService = APIClient.service('/api/users')

  const setField = (field, value) => {
    const obj = {
      'name': () => {
        setName(value)
        checkEnabledBtn()
      },
      'lastName': () => {
        setLastName(value)
        checkEnabledBtn()
      },
      'email': () => {
        setEmail(value)
        checkEnabledBtn()
      },
      'password': () => {
        setPassword(value)
        checkEnabledBtn()
      },
      'confirm': () => {
        setConfirm(value)
        checkEnabledBtn()
      }
    }

    return obj[field]()
  }

  const checkEnabledBtn = () => {
    if (name !== '' && lastName !== '' && email !== '' && password !== '' && confirm !== '') {
      setEnabled(false)
    }
    else {
      setEnabled(true)
    }
  }

  const handleSignup = async () => {
    const data = {
      name,
      lastName,
      email,
      password
    }

    try {
      if (validateUser()) {
        const response = await userService.create(data)
        console.log({ response })
        if (response._id) {
          setName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setConfirm('')

          alert('Usuario creado con exito')
        }
      }
    }
    catch (error) {
      return false
    } 
  }

  const validateUser = () => {
    return true
  }

  return (
    <div className="App">
      <div className="login">
        <img src={logo} className="logo" alt="bitso" />

        <div className="form">
          <label>Nombre</label>
          <input 
            value={name}
            onChange={(e) => setField('name', e.target.value)}
            type="text" />
        </div>

        <div className="form">
          <label>Apellido</label>
          <input
            value={lastName}
            onChange={(e) => setField('lastName', e.target.value)}
            type="text" />
        </div>

        <div className="form">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setField('email', e.target.value)}
            type="text" />
        </div>

        <div className="form">
          <label>Contraseña</label>
          <input
            value={password}
            onChange={(e) => setField('password', e.target.value)}
            type="password" />
        </div>

        <div className="form">
          <label>Confirmar contraseña</label>
          <input
            value={confirm}
            onChange={(e) => setField('confirm', e.target.value)}
            type="password" />
        </div>

        <div className="form">
          <button
            disabled={enabled}
            className={`btn__login ${enabled ? 'btn__disabled' : ''}`}
            onClick={handleSignup}>
              Registrarme
            </button>
        </div>
        
        <div className="form">
          ¿Ya tienes una cuenta? <Link to="/" className="btn__redirect">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Signup);
