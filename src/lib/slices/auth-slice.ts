import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id?: string
  email?: string
  name?: string
  [key: string]: any
}

interface AuthState {
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
