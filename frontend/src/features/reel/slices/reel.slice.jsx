import { createSlice } from '@reduxjs/toolkit'
const reelSlice = createSlice({
  name: 'reel',
  initialState: {
    loading: false,
    reels: []
  },
  reducers: {
    setLoading: (state,action) => {
        state.loading = action.payload
    },
    setReels: (state,action) => {
        state.reels = action.payload
    }
  }
})

export const {setReels,setLoading} = reelSlice.actions
export default reelSlice.reducer
