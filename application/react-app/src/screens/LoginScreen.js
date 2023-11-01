import React, { useState, useEffect } from 'react'
import FollowButton from '../components/button/'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/userSlice'
import { useDispatch } from 'react-redux'

function LoginScreen() {
  //const urlDev = 'http://localhost:3600/gateway'
  // const urlGateway = 'http://localhost:3600/gateway'
  const url = 'http://cscloud6-254.lnu.se/gateway'
  const [userEmail, setEmail] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userWantsTRegister, setUserWantsTRegister] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //? If user Wants to create a account
  const handelRegisterPage = () => {
    sessionStorage.setItem('toRegister', 'true')
    setUserWantsTRegister(Boolean(sessionStorage.getItem('toRegister'))) //
  }

  //! Google Auth - work only on dev
  {
    const onSuccess = (res) => {
      console.log(setEmail)
      setEmail(res.profileObj)
      setIsSignedIn(true)
      sessionStorage.setItem('userIn', 'true')
      sessionStorage.setItem(
        'userName',
        JSON.stringify(res.profileObj.givenName)
      )
      sessionStorage.setItem('userEmail', userEmail)
      console.log(
        sessionStorage.getItem('userName') + sessionStorage.getItem('userEmail')
      )
      window.location.reload()
    }
    const onFailure = (res) => {
      console.log('Fel vid inlogning!' + res)
    }
    const logout = () => {
      localStorage.removeItem('userName')
      setIsSignedIn(false)
    }
    useEffect(() => {
      /* global google */
      function start() {
        gapi.client.init({
          clientid: process.env.GOOGLE_CLIENT_ID,
          scope: '',
        })
        gapi.load('client:auth2', start)
      }
    })
  }
  //! Login
  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log(password, userName)
    await fetch(url + '/login', {
      method: 'POST',
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response)
        // Handle server response
        if (response.ok) {
          // Login successful- Set local storage
          setIsSignedIn(true)
          sessionStorage.setItem('userIn', 'true')
          sessionStorage.setItem('userName', userName)
          dispatch(login())

          navigate('/pedigree')
          return response.json(userName)
        }

        throw new Error('Network response was not ok.')
      })
      .then((data) => {})
      .catch((error) => {
        // Login failed - handle the error
        console.error('Error logging in:', error)
        alert('Login failed')
      })
  }
  //!  Register
  const register = async (e) => {
    e.preventDefault()
    sessionStorage.setItem('userIn', 'true')

    await fetch(url + '/register', {
      method: 'POST',
      body: JSON.stringify({
        username: userName,
        password: password,
        email: userEmail,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // Handle server response
        if (response.ok) {
          alert('You are ready to login!')
          sessionStorage.setItem('toRegister', 'false')
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((data) => {})
      .catch((error) => {
        // Login failed - handle the error
        console.error('Error logging in:', error)
      })
    setUserWantsTRegister(false)
    navigate('/login')
  }
  // //! Handle cookies
  return (
    <section className="login">
      {!userWantsTRegister ? <h2>Login</h2> : <h2>Register</h2>}
      <form
        className="loginForm"
        onSubmit={!userWantsTRegister ? handleLogin : register}
      >
        <input
          placeholder="Username"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {userWantsTRegister ? (
          <input
            type="email"
            required
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          ''
        )}
        <input
          type="Password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {!userWantsTRegister ? ' Login' : 'Register'}
        </button>

        <br />
        <br />
        {/* Set page to register */}
        {!userWantsTRegister ? (
          <button href="login" onClick={() => handelRegisterPage()}>
            Register
          </button>
        ) : (
          ''
        )}
      </form>
    </section>
  )
}

export default LoginScreen
