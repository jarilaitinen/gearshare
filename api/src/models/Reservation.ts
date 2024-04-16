import mongoose, { Document } from 'mongoose'

export type ReservationDocument = Document & {
  items: mongoose.Types.ObjectId[]
  notes?: string | undefined
  status: string
  borrowerId?: mongoose.Types.ObjectId | string | undefined
  borrowDate?: Date | undefined
  returnDate?: Date | undefined
}

const reservationSchema = new mongoose.Schema({
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Item',
    required: true,
  },
  notes: {
    type: String,
    text: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Upcoming',
  },
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  borrowDate: {
    type: Date,
    index: true,
  },
  returnDate: {
    type: Date,
    index: true,
  },
})

reservationSchema.index(
  { borrowDate: 'asc', returnDate: 'asc' },
)

export default mongoose.model('Reservation', reservationSchema)
