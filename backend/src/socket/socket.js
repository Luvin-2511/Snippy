import CONFIG from '../config/config.js'
import jwt from 'jsonwebtoken'
import chatModel from '../models/chat.model.js'
import messageModel from '../models/message.model.js'

export function initializeSocket (io) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.headers.cookie
        ?.split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1]

      if (!token) {
        return next(new Error('Unauthorized'))
      }

      socket.user = jwt.verify(token, CONFIG.JWT_SECRET)
      next()
    } catch (error) {
      next(new Error('Unauthorized'))
    }
  })

  io.on('connection', socket => {
    const userId = socket.user.userId

    socket.join(`user:${userId}`)

    socket.on('sendMessage', async ({ chatId, message }, ack) => {
      try {
        const text = message?.trim()
        if (!text || !chatId) {
          return ack({ success: false, message: 'Message is required!' })
        }

        const chat = await chatModel.findOne({
          _id: chatId,
          $or: [
            { 'participant.user1': userId },
            { 'participant.user2': userId }
          ]
        })
        if (!chat) {
          return ack({ success: false, message: 'No chat found!' })
        }

        const newMessage = await messageModel.create({
          chat: chatId,
          sender: userId,
          message: text
        })

        await chatModel.findByIdAndUpdate(chatId, {
          lastMessage: text,
          lastMessageAt: newMessage.createdAt
        })

        const { user1, user2 } = chat.participant
        io.to(`user:${user1}`).to(`user:${user2}`).emit('newMessage', {
          chatId,
          newMessage
        })
        ack({ success: true })
      } catch (error) {
        ack({
          success: false,
          message: 'Something went wrong'
        })
      }
    })

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id)
    })
  })
}
