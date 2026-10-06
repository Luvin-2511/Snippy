import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required !'],
      unique: [true, 'Username should be unique !'],
      minLength: 3,
      trim: true,
      maxLength: 15
    },
    email: {
      type: String,
      required: [true, 'Email is required !'],
      unique: [true, 'Username should be unique !'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Email is required !'],
      select: false
    },
    profilePic: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      maxLength: 160,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isBanned: {
      type: Boolean,
      default: false
    },
    otp: {
      type: String,
      select: false
    },
    otpExpirationTime: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const userModel = mongoose.model('User', userSchema)

export default userModel
