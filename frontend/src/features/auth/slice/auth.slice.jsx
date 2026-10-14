import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,
    followRequests: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setFollowRequests: (state, action) => {
      state.followRequests = action.payload
    }
  }
})

export const { setUser, setLoading, setFollowRequests } = authSlice.actions
export default authSlice.reducer
