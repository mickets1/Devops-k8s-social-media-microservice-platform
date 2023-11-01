import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../navigation/routes'
import './style.css'

import { useSelector } from 'react-redux'
export default function Nav() {
  const reduxUser = useSelector((state) => state.user)
  console.log('😈 REDUX: User is in: ', reduxUser.isUserIn)

  return (
    <header>
      <div>
        <h1> 🐱 LITTER</h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.START_SCREEN}>Start</Link>
            </li>
            {reduxUser.isUserIn ? (
              <li>
                <Link to={routes.PEDIGREE_SCREEN}>Pedigree</Link>
              </li>
            ) : (
              ''
            )}
            <li>
              <Link to={routes.USERS_LIST_SCREEN}>Users</Link>
            </li>
            {reduxUser.isUserIn ? (
              <li>
                <Link to={routes.CREATE_LIT}>Create a Lit </Link>
              </li>
            ) : (
              ''
            )}
            {reduxUser.isUserIn ? (
              <li>
                <Link to={routes.LITTERBOX_SCREEN}>Litterbox</Link>
              </li>
            ) : (
              ''
            )}

            <li>
              {reduxUser.isUserIn ? (
                <Link to={routes.LOGOUT_SCREEN}>Logout</Link>
              ) : (
                <Link to={routes.LOGIN_SCREEN}>Login</Link>
              )}
            </li>
          </ul>
        </nav>
        <strong>
          👤
          {reduxUser.userName}
        </strong>
      </div>
    </header>
  )
}
