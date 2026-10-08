import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    participant: {
      user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    lastMessage: {
      type: String,
      default: 'Say hello to User'
    },
    lastMessageAt: {
      type: Date
    }
  },
  { timestamps: true }
)

const chatModel = mongoose.model('Chat',chatSchema)
export default chatModel