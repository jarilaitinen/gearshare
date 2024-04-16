import mongoose, { Document } from 'mongoose'

export type CategoryDocument = Document & {
  name: string
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    text: true,
    required: true,
  } 
})

categorySchema.index(
  { name: 'text'}
)

export default mongoose.model('Category', categorySchema)
