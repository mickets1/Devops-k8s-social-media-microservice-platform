import { useNavigate } from 'react-router-dom'
import './style.css'
import { removeUserToView } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
function FollowButton({ handleFollow }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // TODO: Change url to gateway
  // const url = 'http://localhost:3600/gateway'
  const url = 'http://cscloud6-254.lnu.se/gateway'

  const followUser = () => {
    let bodyData = {
      theOneWhoWantsToFollow: handleFollow.theOneWhoWantsToFollow,
      theOneToFollow: handleFollow.theOneToFollow,
    }
    console.log('😡', bodyData)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    }
    fetch(url + '/follow', requestOptions)
      .then((response) => {
        response.json()
        console.log('🎈 data: ', response.status)
        response.status === 200
          ? alert('✅ You are now following ' + handleFollow.theOneToFollow)
          : alert(
              '⛔️ You are already following ' + handleFollow.theOneToFollow
            )
      })
      .then((data) => {
        navigate('/users-list')
      })
      .catch((error) => {
        console.error(error)
      })
  }
  localStorage.removeItem('userToView')
  dispatch(removeUserToView())

  return <button onClick={followUser}>Follow</button>
}

export default FollowButton
