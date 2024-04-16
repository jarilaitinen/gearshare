import Reservation, { ReservationDocument } from '../models/Reservation'
import { NotFoundError } from '../helpers/apiError'

const createReservation = async (reservation: ReservationDocument): Promise<ReservationDocument> => {
    return reservation.save()
}

const findById = async (_id: string): Promise<ReservationDocument> => {
    const foundRes = await Reservation.findById(_id)
    if (!foundRes) {
      throw new NotFoundError(`Item with id ${_id} not found`)
    }
    return foundRes
}

const findByUsername = async (searchString: string): Promise<ReservationDocument[]> => {
  const foundRes = await Reservation.find({ $text: { $search: searchString } }).sort({
    borrower: 1,
    borrowDate: -1,
  })
  if (!foundRes) {
    throw new NotFoundError('No reservation with this name found.')
  }
  return foundRes
}

const findAllReservations = async (): Promise<ReservationDocument[]> => {
    return Reservation.find().sort({ borrowDate: 1, returnDate: -1 })
}
  
const updateReservation = async (
_id: string,
update: Partial<ReservationDocument>
): Promise<ReservationDocument | null> => {
const foundRes = await Reservation.findByIdAndUpdate(_id, update, {
    new: true,
})
if (!foundRes) {
    throw new NotFoundError(`Reservation with id ${_id} not found`)
}
return foundRes
}
  
const deleteReservation = async (_id: string): Promise<ReservationDocument | null> => {
const foundRes = Reservation.findByIdAndDelete(_id)
if (!foundRes) {
    throw new NotFoundError(`Reservation with id ${_id} not found`)
}
return foundRes
}

export default {
    createReservation,
    findById,
    findByUsername,
    findAllReservations,
    updateReservation,
    deleteReservation
  }

