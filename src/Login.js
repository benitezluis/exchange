import React, { useState } from 'react';
import jwt from 'jsonwebtoken'
import { Link, withRouter } from 'react-router-dom'
import { store } from 'react-notifications-component';
import logo from './assets/images/bitcoin-icon.png';
import APIClient from './api'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [error, setError] = useState('')

  const userService = APIClient.service('/api/users')

  const setField = (field, value) => {
    const obj = {
      'email': () => {
        setEmail(value)
        checkEnabledBtn()
      },
      'password': () => {
        setPassword(value)
        checkEnabledBtn()
      }
    }

    return obj[field]()
  }

  const checkEnabledBtn = () => {
    if (email !== '' && password !== '') {
      setEnabled(false)
    }
    else {
      setEnabled(true)
    }
  }

  const handleLogin = async () => {
    try {
      const singupResult = await APIClient.authenticate({
        strategy: 'local',
        email,
        password
      })

      console.log({ singupResult })
  
      if (singupResult.accessToken !== undefined) {
        const decoded = jwt.decode(singupResult.accessToken)
        const uid = decoded.userId
        const user = await userService.find({ query: { '$limit': 1, '_id': uid }})
  
        localStorage.setItem('app-jwt', singupResult.accessToken)
        localStorage.setItem('panel', JSON.stringify({ rol: user.data[0].role, email: user.data[0].email }))

        history.push('/inicio')
      }
      else {
        setError('Usuario no válido, intente de nuevo.')

        setTimeout(() => {
          setError('')
        }, 5000)
      }
    }
    catch (error) {
      console.log({ error })
      setError('Ocurrio un error, vuelve a intentarlo.')

      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return (
    <div className="App">
      <div className="login">
        <img src={logo} className="logo" alt="bitso" />

        <div className="form">
          <label>Email</label>
          <input value={email} onChange={(e) => setField('email', e.target.value)} type="text" />
        </div>

        <div className="form">
          <label>Contraseña</label>
          <input value={password} onChange={(e) => setField('password', e.target.value)} type="password" />
        </div>

        <div className="form">
          <button
            disabled={enabled}
            className={`btn__login ${enabled ? 'btn__disabled' : ''}`}
            onClick={handleLogin}
            >
              Iniciar sesión
          </button>
        </div>

        {error && 
          <div className="error">
            <span className="span__error">
              {error}
            </span>
          </div>
        }
        
        <div className="form">
          ¿No tienes cuenta? <Link to="/registro" className="btn__redirect">Registrate</Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
