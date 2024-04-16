import mongoose, { Document } from 'mongoose'

export type FaultDocument = Document & {
  reporter: mongoose.Types.ObjectId | string
  itemId: mongoose.Types.ObjectId | string
  description: string
  status: string
  reportDate: Date
  resolveDate?: Date
}

const faultSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  name: {
    type: String,
    text: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Available',
  },
  reportDate: {
    type: Date,
    index: true,
    required: true
  },
  resolveDate: Date
})

faultSchema.index(
  { reportDate: 'asc' }
)

export default mongoose.model('Fault', faultSchema)
