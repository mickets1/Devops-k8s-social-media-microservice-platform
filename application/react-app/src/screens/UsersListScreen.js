import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setUserToView } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
const urlDevFollow = 'http://localhost/gateway/follow'
function AllUsersScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const reduxUser = useSelector((state) => state.user)

  const [users, setUsers] = useState([])
  const [following, setFollowing] = useState([])

  // TODO: Change url to gateway
  const urlUser = '/gateway'

  //! Get users following from Follow service
  
  const filteredUsers = users.filter((user) => {
    return !following.some(
      (following) => following.userIdFollowing === user.username
    )
  })

  filteredUsers.reverse()

  // on click send username to pedigree page and set new localstorage item
  const handleClick = (username) => (e) => {
    console.log('🐼', username)
    e.preventDefault()
    //! User clicked on AllUsersScreen
    sessionStorage.setItem('userToView', username)

    console.log('🐼🫣', sessionStorage.getItem('userToView'))
    dispatch(setUserToView())
    console.log(
      '😈😈😈 REDUX: User to view in UserCreen: ',
      reduxUser.userToView
    )

    navigate('/pedigree')
  }

  // TODO: Change url to gateway/auth-OR-user

  // const urlDevAuth = 'http://localhost:3600/gateway'
  const url = 'http://cscloud6-254.lnu.se/gateway'

  //! Get all users from Auth service
  useEffect(() => {
    fetch(url + '/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      })
  }, [])
  // TODO: If user is already follow this person, then not show it on the list
  return (
    <section>
      <h2>AllUsersScreen</h2>
      <article className="users">
        {filteredUsers.map((element) =>
          //userIsNotFollowed
          element.username === sessionStorage.getItem('userName') ? null : (
            <div key={element._id}>
              <p>
                <strong>Username: </strong>
                {element.username}
              </p>
              {/* Send username as props to Follow component */}
              <button onClick={handleClick(element.username)}>
                To user's Pedigree
              </button>
            </div>
          )
        )}
      </article>
    </section>
  )
}

export default AllUsersScreen
