import { getAllChats, getMessages } from '../services/chat.api'
import { useDispatch } from 'react-redux'
import { setAllChats, setLoading } from '../slices/chat.slice'

const useChat = () => {
  const dispatch = useDispatch()
  const handleGetAllChats = async () => {
    try {
      dispatch(setLoading(true))
      const res = await getAllChats()
      dispatch(setAllChats(res.chats))
      return res
    } catch (error) {
      console.log('error->', error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleGetMessages = async ({chatId}) => {
    try {
      const res = await getMessages({chatId})
      return res
    } catch (error) {
      console.log('error->', error)
    }
  }

  const handleGetChat = async ({userId}) => {
    try {
      const res = await getMessages({userId})
      return res
    } catch (error) {
      console.log('error->', error)
    }
  }

  return {
    handleGetAllChats,
    handleGetMessages,
    handleGetChat
  }
}

export default useChat
