import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export const createReel = async formData => {
  const response = await axiosInstance.post('/api/reel/create', formData)
  return response.data
}

export const fetchFeed = async () => {
  const response = await axiosInstance.get('/api/reel/feed')
  return response.data
}

export const deleteReel = async ({ reelId }) => {
  const response = await axiosInstance.post(`/api/reel/${reelId}`)
  return response.data
}
