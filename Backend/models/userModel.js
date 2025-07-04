import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      default: 'user',
      type: String,
      enum: ['user', 'admin'],
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
