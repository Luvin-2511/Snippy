import mongoose from 'mongoose'

const reelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required to post reels'],
      index: true
    },
    reel: {
      fileId: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      caption: {
        type: String,
        default: '',
        maxlength: 160
      }
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const reelModel = mongoose.model('reel', reelSchema)
export default reelModel
