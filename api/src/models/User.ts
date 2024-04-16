import mongoose, { Document } from 'mongoose'

export type UserRole = 'admin' | 'user'

export type UserDocument = Document & {
  username: string
  email: string
  role: string
}

const userSchema = new mongoose.Schema({
    username: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      default: 'User',
    }
  })
  
export default mongoose.model('User', userSchema)
  