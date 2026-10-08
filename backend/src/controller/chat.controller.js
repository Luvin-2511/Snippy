import chatModel from '../models/chat.model.js'
import messageModel from '../models/message.model.js'

/**
 * @route GET api/chat/get-chat/:userId
 * @description Starts a new chat between users
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getChatController (req, res, next) {
  try {
    const { userId } = req.params
    const { userId: userId2 } = req.user

    if (userId === userId2) {
      return next({
        status: 400,
        message: "You can't chat with yourself!"
      })
    }

    let chat
    chat = await chatModel.findOne({
      $or: [
        {
          'participant.user1': userId,
          'participant.user2': userId2
        },
        {
          'participant.user1': userId2,
          'participant.user2': userId
        }
      ]
    })

    if (!chat) {
      chat = await chatModel.create({
        participant: {
          user1: userId,
          user2: userId2
        }
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Got chat successfully !',
      chat
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/chat/:chatId/send
 * @description Send a message to user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function sendMessage (req, res, next) {
  try {
    const { message } = req.body
    const { chatId } = req.params
    const { userId } = req.user

    if (!message || !chatId || !userId) {
      return next({
        status: 400,
        message: 'Something went wrong !'
      })
    }

    const chat = await chatModel.findOne({
      $or: [{ 'participant.user1': userId }, { 'participant.user2': userId }],
      _id: chatId
    })

    if (!chat) {
      return next({
        status: 400,
        message: 'Something went wrong !'
      })
    }

    const newMessage = await messageModel.create({
      chat: chatId,
      sender: userId,
      message
    })

    await chatModel.findByIdAndUpdate(chatId, {
      lastMessage: message.trim(),
      lastMessageAt: newMessage.createdAt
    })

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully !',
      newMessage
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route GET api/chat/:chatId/get-messages
 * @description Gets messages of a chat with limit
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getMessageController (req, res, next) {
  try {
    const { chatId } = req.params
    const { userId } = req.user

    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 50)

    if (!chatId) {
      return next({
        status: 400,
        message: 'Chat ID is required!'
      })
    }

    const chat = await chatModel.findOne({
      $or: [{ 'participant.user1': userId }, { 'participant.user2': userId }],
      _id: chatId
    })

    if (!chat) {
      return next({
        status: 400,
        message: 'No chat found !'
      })
    }

    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: -1 })
      .limit(limit)

    return res.status(200).json({
      success: true,
      message: 'Messages fetched successfully !',
      messages
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route GET /api/chat/my-chats
 * @description Get all chats of user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getUserChatController (req, res, next) {
  try {
    const { userId } = req.user
    if (!userId) {
      return next({
        status: 400,
        message: 'No userId found !'
      })
    }

    const chats = await chatModel
      .find({
        $or: [{ 'participant.user1': userId }, { 'participant.user2': userId }]
      })
      .populate('participant.user1', 'username profilePic')
      .populate('participant.user2', 'username profilePic')
      .sort({ lastMessageAt: -1 })

    return res.status(200).json({
      success: true,
      message: 'Fetched all chats successfully !',
      chats
    })
  } catch (error) {
    next(error)
  }
}
