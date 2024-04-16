import mongoose, { Document } from 'mongoose'

export type ItemDocument = Document & {
  itemId: string
  name: string
  description?: string | undefined
  status: string
  categories: string[]
  borrowerId?: mongoose.Types.ObjectId | string | undefined
  borrowDate?: Date | undefined
  returnDate?: Date | undefined
}

const itemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    index: true,
    required: true,
  },
  name: {
    type: String,
    text: true,
    required: true,
  },
  description: {
    type: String,
  },
  authors: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Available',
  },
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  borrowDate: Date,
  returnDate: Date,
})

itemSchema.index(
  { name: 'text', description: 'text' },
  {
    weights: {
      name: 5,
      description: 2,
    },
  }
)

export default mongoose.model('Item', itemSchema)
