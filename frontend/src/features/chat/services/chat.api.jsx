import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/chat',
    withCredentials:true
})

export const getAllChats =async () => {
    const response = await axiosInstance.get('/my-chats')
    return response.data
}

export const getMessages = async ({chatId}) => {
    const response = await axiosInstance.get(`/${chatId}/get-messages`)
    return response.data
}

export const getChat = async ({userId}) => {
    const response = await axiosInstance.get(`/get-chat/${userId}`)
    return response.data
}