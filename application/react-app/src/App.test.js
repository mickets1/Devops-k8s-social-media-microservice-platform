import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import StartScreen from './screens/StartScreen.js'
import PedigreeScreen from './screens/PedigreeScreen.js'
import NotFoundScreen from './screens/NotFoundScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import LitterBoxScreen from './screens/LitterBoxScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import CreateAccountScreen from './screens/CreateAccountScreen.js'
import AllUsersScreen from './screens/AllUsersScreen.js'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

test('full app rendering of StartScreen.', async () => {
  render(<StartScreen />, {wrapper: BrowserRouter})

  // verify page content for default route
  expect(screen.getByText(/StartScreen/i)).toBeInTheDocument()
})

test('full app rendering of PedigreeScreen.', async () => {
  render(<PedigreeScreen />, {wrapper: BrowserRouter})

  // verify page content for default route
  expect(screen.getByText(/PedigreeScreen/i)).toBeInTheDocument()
})

test('Testing not found Page for faulty route.', async () => {
  render(<NotFoundScreen />, {wrapper: BrowserRouter})

  // verify page content for default route
  expect(screen.getByText(/Sorry, the page could not be found/i)).toBeInTheDocument()
})

test('full app rendering of LoginScreen.', async () => {
  render(<LoginScreen />, {wrapper: BrowserRouter})

  // verify page content for default route
  expect(screen.getByText(/Use Google to sign in/i)).toBeInTheDocument()
})

test('full app rendering of LitterBoxScreen.', async () => {
  render(<LitterBoxScreen />, {wrapper: BrowserRouter})

  // verify page content for default route
  expect(screen.getByText(/LitterboxScreen/i)).toBeInTheDocument()
})

test('full app rendering of HomeScreen.', async () => {
  render(<HomeScreen />, {wrapper: BrowserRouter})

  // verify page content for default route
  expect(screen.getByText(/HomeScreen/i)).toBeInTheDocument()
})

test('full app rendering of CreateAccountScreen.', async () => {
  render(<CreateAccountScreen />, {wrapper: BrowserRouter})

  // verify page content for default route
  expect(screen.getByText(/CreateAccountScreen/i)).toBeInTheDocument()
})

test('full app rendering of AllusersScreen.', async () => {
  render(<AllUsersScreen />, {wrapper: BrowserRouter})

  // verify page content for default route
  expect(screen.getByText(/AllUsersScreen/i)).toBeInTheDocument()
})