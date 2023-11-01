import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function CreateAccountScreen() {
  const navigate = useNavigate()
  const [litInput, setLit] = useState('')
  // TODO: Change the Lit Service url to gateway

  //const url = 'http://localhost:3600/gateway'
  const url = 'http://cscloud6-254.lnu.se/gateway'

  //! Create new lit
  const handleSubmit = async (e) => {
    console.log(
      '👤',
      url + '/create-lit' + sessionStorage.getItem('userName')
    )
    e.preventDefault()
    await fetch(url + '/create-lit', {
      method: 'POST',
      body: JSON.stringify({
        userId: sessionStorage.getItem('userName'),
        description: litInput,
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
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((data) => {})
      .catch((error) => {
        // Login failed - handle the error
        console.error('Error logging in:', error)
      })
    navigate('/pedigree')
  }
  return (
    <section className="lit login">
      <h2>Create A Lit</h2>
      <form className="lit" onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          onChange={(e) => setLit(e.target.value)}
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </section>
  )
}

export default CreateAccountScreen
