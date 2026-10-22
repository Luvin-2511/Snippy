import { useDispatch } from 'react-redux'
import {
  createPost,
  deletePost,
  getFollowers,
  getFollowing,
  getLikedPost,
  getLikedPostById,
  getPost,
  getPosts,
  getUserPosts,
  getUserPostsById,
  likePost,
  profileUpdate,
  unlikePost
} from '../services/post.api'
import {
  setCurrOpenPosts,
  setLoading,
  setPosts,
  setUserPosts,
  updatePostLike
} from '../slices/post.slice'
import { setUser } from '../../auth/slice/auth.slice'

const usePost = () => {
  const dispatch = useDispatch()
  const handleGetPosts = async () => {
    try {
      dispatch(setLoading(true))
      const res = await getPosts()
      dispatch(setPosts(res.posts))
      return res
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleGetUserPosts = async () => {
    try {
      dispatch(setLoading(true))
      const res = await getUserPosts()
      dispatch(setUserPosts(res.posts))
      return res
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleGetPost = async ({postId}) => {
    try {
      dispatch(setLoading(true))
      const res = await getPost({postId})
      return res
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleGetLikedPost = async () => {
    try {
      dispatch(setLoading(true))
      const res = await getLikedPost()
      return res.post
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleGetLikedPostById = async ({userId}) => {
    try {
      dispatch(setLoading(true))
      const res = await getLikedPostById({userId})
      return res.post
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleGetUserPostsById = async ({ userId }) => {
    try {
      dispatch(setLoading(true))
      const res = await getUserPostsById({ userId })
      dispatch(setCurrOpenPosts(res))
      return res
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleProfileUpdate = async formData => {
    try {
      const res = await profileUpdate(formData)
      dispatch(setUser(res.user))
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreatePost = async formData => {
    try {
      dispatch(setLoading(true))
      const res = await createPost(formData)
      return res
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDeletePost = async ({ postId }) => {
    try {
      const res = await deletePost({ postId })
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetFollowers = async ({ userId }) => {
    try {
      const res = await getFollowers({ userId })
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetFollowing = async ({ userId }) => {
    try {
      const res = await getFollowing({ userId })
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const handleLikePost = async ({ postId }) => {
    try {
      const res = await likePost({ postId })
      if (res.success) {
        dispatch(
          updatePostLike({
            postId,
            isLiked: true
          })
        )
      }
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnlikePost = async ({ postId }) => {
    try {
      const res = await unlikePost({ postId })
      if (res.success) {
        dispatch(
          updatePostLike({
            postId,
            isLiked: false
          })
        )
      }
      return res
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleGetPost,
    handleGetPosts,
    handleGetUserPosts,
    handleProfileUpdate,
    handleGetUserPostsById,
    handleCreatePost,
    handleDeletePost,
    handleLikePost,
    handleUnlikePost,
    handleGetLikedPost,
    handleGetFollowers,
    handleGetFollowing,
    handleGetLikedPostById
  }
}

export default usePost
