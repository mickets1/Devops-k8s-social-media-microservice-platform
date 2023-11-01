import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'

// Make user accessible
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
})
