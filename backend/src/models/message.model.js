import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true,
      trim:true,
      maxLength:200
    }
  },
  { timestamps: true }
)

messageSchema.index({ chat: 1, createdAt: -1 })

const messageModel = mongoose.model('message', messageSchema)
export default messageModel
