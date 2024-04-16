import mongoose, { Document } from 'mongoose'

export type UserRole = 'admin' | 'user'

export type UserDocument = Document & {
  username: string
  email: string
  role: string
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
      },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    }
})

userSchema.index(
    { username: 'text'},
  )
  
export default mongoose.model('User', userSchema)
  