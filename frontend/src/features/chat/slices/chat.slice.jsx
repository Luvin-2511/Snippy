import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    loading: false,
    allChats: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setAllChats: (state, action) => {
      state.allChats = action.payload
    }
  }
})

export const { setLoading,setAllChats } = chatSlice.actions
export default chatSlice.reducer
