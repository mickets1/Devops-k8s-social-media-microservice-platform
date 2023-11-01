import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function FollowButton({ handleUnFollow }) {
  // TODO: Change url to gateway

  const url = 'http://cscloud6-254.lnu.se/gateway'  
  //const urlDevFollow = 'http://localhost:3600/gateway'
  const navigate = useNavigate()
  const unFollowUser = () => {
    let bodyData = {
      theOneWhoWantsToUnFollow: handleUnFollow.theOneWhoWantsToUnFollow,
      theOneToUnFollow: handleUnFollow.theOneToUnFollow,
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    }

    fetch(url + '/unfollow', requestOptions)
      .then((response) => {
        response.json()
        console.log('🎈 data: ', response.status)
        response.status === 200
          ? alert('✅ You have unfollowed: ' + handleUnFollow.theOneToUnFollow)
          : alert('⛔️ Something went wrong ')
      })
      .then((data) => {
        navigate('/users-list')
      })

      .catch((error) => {
        console.error(error)
      })
    console.log(
      '+++++++++',
      handleUnFollow.theOneWhoWantsToUnFollow,
      '+++++++++',
      handleUnFollow.theOneToUnFollow,
      '+++++++',
      bodyData,
      url,
      '/unfollow'
    )
  }

  return (
    <button className="button" onClick={unFollowUser}>
      Unfollow
    </button>
  )
}

export default FollowButton
