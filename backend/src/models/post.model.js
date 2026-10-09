import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required to post']
    },
    content: [
      {
        _id: false,
        url: {
          type: String,
          required: true
        },
        type: {
          type: String,
          enum: ['image', 'video'],
          required: true
        },
        fileId: {
          type:String,
          required:true
        }
      }
    ],
    caption: {
      type: String,
      default: '',
      maxLength: 160
    }
  },
  {
    timestamps: true
  }
)

const postModel = mongoose.model('Post', postSchema)
export default postModel
