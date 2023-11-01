import './App.css'
import React from 'react'
import AppNavigator from './navigation/AppNavigator'

function App() {
  return (
    <div className="contentContainer">
      {/* To make reducer data accessible for all components and screens */}
      {/* <ContextProvider> */}
      <AppNavigator />
      {/* </ContextProvider> */}
    </div>
  )
}

export default App
