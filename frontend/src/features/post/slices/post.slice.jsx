import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    userPosts: [],
    loading: false,
    currOpenPosts:[]
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload
    },
    setCurrOpenPosts: (state, action) => {
      state.currOpenPosts = action.payload
    },
    updatePostLike: (state, action) => {
      const { postId, isLiked } = action.payload
      const post = state.posts.find(post => post._id === postId)
      if (!post) return
      post.isLiked = isLiked
      post.likeCount += isLiked ? 1 : -1
    }
  }
})

export const { setPosts, setLoading, setUserPosts, updatePostLike, setCurrOpenPosts } = postSlice.actions
export default postSlice.reducer
