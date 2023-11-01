import React from 'react'
import FollowButton from '../components/button/'
import { useDispatch } from 'react-redux'
import { setUserToView } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

function LitterBoxScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const reduxUser = useSelector((state) => state.user)
  const [authId, setAuthId] = React.useState(1)
  const [lits, setLits] = React.useState(false)
  const [testLits, setTestLits] = React.useState(false)

  const fetchMyApi = async () => {
    const user = sessionStorage.getItem('userName')
    await fetch('http://cscloud6-254.lnu.se/gateway/litterbox/' + user, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log('ändrat igen')
        
        const result = data.lits

        console.log('before sort: ', result)

        result.sort((a, b) => new Date(b.litDate).getTime() - new Date(a.litDate).getTime()) 

        console.log('after sort: ', result)

        setLits(result)
      })
  }

  const handleClick = (username) => (e) => {
    console.log('🐼', username)
    e.preventDefault()

    sessionStorage.setItem('userToView', username)

    console.log('User to link: ', sessionStorage.getItem('userToView'))
    dispatch(setUserToView())
    console.log(
      '😈😈😈 REDUX: User to view in LitterboxScreen: ',
      reduxUser.userToView
    )

    navigate('/pedigree')
  }

  React.useEffect(() => {
    fetchMyApi()
  }, [])

  return (
    <section>
      <h2>LitterBoxScreen</h2>
      <h3>{testLits}</h3>
      {lits && authId && (
        <article>
          {lits.map((element, key) => {
            return (
              <div key={key}>
                <p>
                  <b className="username-link" onClick={handleClick(element.userId)}>
                  {element.userId} 
                  </b> 
                  <br /> 
                  <i>{new Date(element.litDate).toLocaleString()}</i>
                  <br /> 
                  <b>Lit: </b> {element.description}
                </p>
                {/*
                {element.userId !== authId && (
                  <FollowButton userId={element.userId} />
                )}
                {element.userId === authId && <> (You)</>}
                */}
              </div>
            )
          })}
        </article>
      )}
    </section>
  )
}

export default LitterBoxScreen
