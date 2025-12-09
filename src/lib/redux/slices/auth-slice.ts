import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: Record<string, unknown> | null
  token: string | null
}

interface SetUserPayload {
  user: Record<string, unknown>
  token: string
}

const initialState: AuthState = {
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
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
