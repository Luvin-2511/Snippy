import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getChatController, getMessageController, getUserChatController, sendMessage } from '../controller/chat.controller.js'

const chatRouter = Router()

chatRouter.use(authMiddleware)

chatRouter.get('/my-chats',getUserChatController)
chatRouter.get('/get-chat/:userId',getChatController)
chatRouter.get('/:chatId/get-messages',getMessageController)

export default chatRouter