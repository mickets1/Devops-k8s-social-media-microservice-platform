import React from 'react'
import { useState, useEffect } from 'react'
import FollowButton from '../components/button'
import Unfollow from '../components/unfollow'
import { setUserToView } from '../redux/userSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

function PedigreeScreen() {
  const reduxUser = useSelector((state) => state.user)
  console.log('😈 REDUX: User to view: ', reduxUser.userToView)
  const dispatch = useDispatch()
  const [lits, setLits] = useState([])

  const fetchMyApi = async () => {
    // TODO: Change the url to gateway
    const url = 'http://cscloud6-254.lnu.se/gateway'
   // const urlDev = 'http://localhost:3600/gateway' //?
    const pedigreeUrl = url + '/pedigree/'

    // const fetchMyApi = async () => {
    //! Two different localStorage to handle the li § which show in pedigree page
    sessionStorage.getItem('userToView')
    console.log('🐼🤡', sessionStorage.getItem('userToView'))
    dispatch(setUserToView())
    let pedigreeToView = reduxUser.userToView
    let user = reduxUser.userName

    console.log('ℹ️ userToView: ' + pedigreeToView + ' \nℹ️ userName: ' + user)
    //! If user come from AllUser Page show this user lits else the inloged user

    let currentPdigreeUrl =
      pedigreeToView.length > 1
        ? encodeURI(pedigreeUrl + pedigreeToView)
        : encodeURI(pedigreeUrl + user)
    console.log(
      '😎 currentPdigreeUrl',
      currentPdigreeUrl,
      pedigreeToView.length,
      pedigreeToView === null
    )

    await fetch(currentPdigreeUrl, {
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
        console.log('pedigreedata: ', data)
        console.log('syns denna ändringen?')
        if (data) {
          if (data.hasOwnProperty('lits')) {
            const result = data.lits
            setLits(result.reverse())
            console.log(result)

            return
          } else if (data.response.length > 0) {
            setLits(data.response.reverse())
          }
        }
      })
    console.log('😡😡', pedigreeToView)
  }

  useEffect(() => {
    fetchMyApi()
  }, [])

  return (
    <section>
      <h2>PedigreeScreen</h2>
      {sessionStorage.getItem('userName') && (
        <div className="pedigree">
          <FollowButton
            handleFollow={{
              theOneWhoWantsToFollow: sessionStorage.getItem('userName'),
              theOneToFollow: sessionStorage.getItem('userToView'),
            }}
          />
          <Unfollow
            handleUnFollow={{
              theOneWhoWantsToUnFollow: sessionStorage.getItem('userName'),
              theOneToUnFollow: sessionStorage.getItem('userToView'),
            }}
          />
        </div>
      )}
      {lits ? (
        lits.length > 0 ? (
          <article>
            {lits.map((element, key) => {
              return (
                <div key={key}>
                  <div className="litses">
                    <p>
                      <strong> 🙂 Username:</strong>
                      <i>{new Date(element.date).toLocaleString()}</i>
                    </p>
                    <i>{element.userId} </i> <br />
                    <br />
                    <b>
                      💬 Lit: <br />
                      <br />
                    </b>{' '}
                    <i>{element.description}</i>
                  </div>

                  {/* Send username as props to Follow component */}
                </div>
              )
            })}
          </article>
        ) : (
          <h4>😿 This user has not created any Lits at the moment!</h4>
        )
      ) : null}
    </section>
  )
}

export default PedigreeScreen
