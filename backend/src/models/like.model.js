import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  reel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reel'
  }
})

likeSchema.index(
  { post: 1, user: 1 },
  {
    unique: true,
    partialFilterExpression: {
      post: { $type: 'objectId' }
    }
  }
)

likeSchema.index(
  { reel: 1, user: 1 },
  {
    unique: true,
    partialFilterExpression: {
      reel: { $type: 'objectId' }
    }
  }
)

const likeModel = mongoose.model('Likes', likeSchema)
export default likeModel
