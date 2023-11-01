import React from 'react'
import { useState, useEffect } from 'react'

function StartScreen() {
  const [lits, setLits] = useState([])

  // TODO: Change the url to gateway

  // const urlDev = 'http://localhost:3600/gateway' //?
  const url = 'http://cscloud6-254.lnu.se/gateway'

  const fetchMyApi = async () => {
    //! Two different localStorage to handle the li § which show in pedigree page
    let pedigreeToView = sessionStorage.getItem('userToView')
    let user = sessionStorage.getItem('userName')

    console.log('ℹ️ userToView: ' + pedigreeToView + ' \nℹ️ userName: ' + user)
    //! If user come from AllUser Page show this user lits else the inloged user

    let currentPdigreeUrl = url + '/list-lits'

    console.log('⏰', currentPdigreeUrl)
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
  }

  useEffect(() => {
    fetchMyApi()
  }, [])

  return (
    <section>
      <h2> 🐱 Latest Lits in the Litter app</h2>

      {lits ? (
        lits.length > 0 ? (
          <article>
            {lits.map((element, key) => {
              return (
                <div key={key}>
                  <div className="litses">
                    <p>
                      <strong> 🙂 Username:</strong>
                      <i>{element.date}</i>
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
          <h3>Page is empty!</h3>
        )
      ) : null}
    </section>
  )
}

export default StartScreen
