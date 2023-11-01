import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import UsersListScreen from '../screens/UsersListScreen'
import CreateLit from '../screens/CreateLit'
import LitterBoxScreen from '../screens/LitterBoxScreen'
import LoginScreen from '../screens/LoginScreen'
import LogoutScreen from '../screens/LogoutScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import PedigreeScreen from '../screens/PedigreeScreen'
import StartScreen from '../screens/StartScreen'
import Nav from '../components/nav/'

function AppNavigator() {
  return (
    <Router>
      <Nav />
      <Routes>
        {/* <Route exact path="/users" element={<AllUsersScreen />} /> */}
        <Route exact path="/users-list" element={<UsersListScreen />} />
        <Route exact path="/create-lit" element={<CreateLit />} />
        <Route exact path="/litterbox" element={<LitterBoxScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/logout" element={<LogoutScreen />} />
        <Route exact path="/pedigree" element={<PedigreeScreen />} />
        <Route exact path="/" element={<StartScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Router>
  )
}

export default AppNavigator
