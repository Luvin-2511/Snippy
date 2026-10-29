import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export const createPost = async formData => {
  const response = await axiosInstance.post('/api/post/create', formData)
  return response.data
}

export const getPosts = async () => {
  const response = await axiosInstance.get('/api/post/all-posts')
  return response.data
}

export const getUserPosts = async () => {
  const response = await axiosInstance.get(`/api/post/user-posts`)
  return response.data
}

export const getUserPostsById = async ({userId}) => {
  const response = await axiosInstance.get(`/api/post/user-posts/${userId}`)
  return response.data
}

export const getPost = async ({ postId }) => {
  const response = await axiosInstance.get(`/api/post/${postId}`)
  return response.data
}

export const getLikedPost = async () => {
  const response = await axiosInstance.get(`/api/post/liked-posts`)
  return response.data
}

export const getLikedPostById = async ({userId}) => {
  const response = await axiosInstance.get(`/api/post/liked-posts/${userId}`)
  return response.data
}

export const deletePost = async ({ postId }) => {
  const response = await axiosInstance.delete(`/api/post/${postId}`)
  return response.data
}

export const likePost = async ({ postId }) => {
  const response = await axiosInstance.post(`/api/post/${postId}/like`)
  return response.data
}

export const unlikePost = async ({ postId }) => {
  const response = await axiosInstance.delete(`/api/post/${postId}/unlike`)
  return response.data
}

export const profileUpdate = async (formData) => {
  const response = await axiosInstance.patch("/api/user/profile-update",formData)
  return response.data
}

export const getFollowers = async ({userId}) => {
  const response = await axiosInstance.get(`/api/user/followers/${userId}`)
  return response.data
}

export const getFollowing = async ({userId}) => {
  const response = await axiosInstance.get(`/api/user/following/${userId}`)
  return response.data
}