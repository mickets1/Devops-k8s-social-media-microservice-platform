import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  // Fields
  name: 'user',
  initialState: {
    userName: '',
    isUserIn: false,
    userToView: '',
  },
  // Functions/actions
  reducers: {
    login: (state) => {
      state.isUserIn = true
      state.userName = sessionStorage.getItem('userName')
    },
    logout: (state, action) => {
      state.isUserIn = false
      state.userName = ''
    },
    setUserToView: (state) => {
      state.userToView = sessionStorage.getItem('userToView')
    },
    removeUserToView: (state) => {
      state.userToView = ''
    },
  },
})

export const { login, logout, setUserToView, removeUserToView } =
  userSlice.actions
export default userSlice.reducer
