import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export const register = async ({ email, username, password }) => {
  const response = await axiosInstance.post('/api/auth/register', {
    email,
    username,
    password
  })
  return response.data
}

export const verify = async ({ email, otp }) => {
  const response = await axiosInstance.post('/api/auth/verify-user', {
    email,
    otp
  })
  return response.data
}

export const login = async (identifier, password) => {
  const response = await axiosInstance.post('/api/auth/login', {
    identifier,
    password
  })
  return response.data
}

export const me = async () => {
  const response = await axiosInstance.get('/api/auth/me')
  return response.data
}

export const logout = async () => {
  const response = await axiosInstance.post('/api/auth/logout')
  return response.data
}

export const followRequest = async ({ followeeId }) => {
  const response = await axiosInstance.post(
    `/api/user/follow-request/${followeeId}`
  )
  return response.data
}

export const acceptFollowRequest = async ({ followerId }) => {
  const response = await axiosInstance.patch(
    `/api/user/follow/${followerId}/accept`
  )
  return response.data
}

export const rejectFollowRequest = async ({ followerId }) => {
  const response = await axiosInstance.delete(
    `/api/user/follow/${followerId}/reject`
  )
  return response.data
}

export const getAllFollowRequest = async () => {
  const response = await axiosInstance.get(`/api/user/follow-requests`)
  return response.data
}

export const getAllFollowCount = async () => {
  const response = await axiosInstance.get(`/api/user/request-count`)
  return response.data
}

export const unfollow = async ({ followerId }) => {
  const response = await axiosInstance.post(`/api/user/unfollow/${followerId}`)
  return response.data
}
