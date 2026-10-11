import mongoose from 'mongoose'

const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  followee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'followed', 'rejected'],
    default:"pending"
  }
})

followSchema.index({ follower: 1, followee: 1 }, { unique: true })
followSchema.index({ followee: 1 })

const followModel = mongoose.model('Follow', followSchema)
export default followModel