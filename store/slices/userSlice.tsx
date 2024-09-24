import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  email: string
  loggedIn: boolean
}

const initialState: UserState = {
  email: '',
  loggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.email = action.payload
      state.loggedIn = true
    },
    logout(state) {
      state.email = ''
      state.loggedIn = false
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer