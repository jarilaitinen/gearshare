import mongoose, { Document } from 'mongoose'

export type ItemDocument = Document & {
  name: string
  description?: string | null | undefined
  status: string
  location?: string | null | undefined
  categories: string[]
}

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: 'Available',
  },
  location: String,
  categories: {
    type: [String],
    required: true,
  }
})

itemSchema.index(
  { name: 'text', _id: 'text' },
)

export default mongoose.model('Item', itemSchema)
