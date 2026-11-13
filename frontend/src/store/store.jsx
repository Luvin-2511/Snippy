import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/slice/auth.slice'
import postSlice from '../features/post/slices/post.slice'
import reelSlice from '../features/reel/slices/reel.slice'
import chatSlice from '../features/chat/slices/chat.slice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    reel: reelSlice,
    chat: chatSlice
  }
})

export default store
