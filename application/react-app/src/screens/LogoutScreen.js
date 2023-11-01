import React, { useDispatch } from 'react-redux'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/userSlice'

function LoginScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //var cookies
  //! Google Auth

  const handleLogout = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userIn')
    sessionStorage.setItem('userIn', 'false')
    localStorage.clear()
    dispatch(logout())

    navigate('/')
  }

  // useEffect(() => {
  //   /* global google */
  //   function start() {
  //     gapi.client.init({
  //       clientid:
  //         '995337140438-olgm07k4s49tmbrm2drp7f1lu5ue1otq.apps.googleusercontent.com',
  //       scope: '',
  //     })
  //     gapi.load('client:auth2', start)
  //   }
  // })

  // //! Handle cookies
  return (
    <section className="login">
      <h2>Logout </h2>

      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      {/* <GoogleLogout
        clientId="995337140438-olgm07k4s49tmbrm2drp7f1lu5ue1otq.apps.googleusercontent.com"
        buttonText="Logga ut"
        onLogoutSuccess={logout}
      ></GoogleLogout> */}
    </section>
  )
}

export default LoginScreen
