import Item, { ItemDocument } from '../models/Item'
import { NotFoundError } from '../helpers/apiError'

const create = async (item: ItemDocument): Promise<ItemDocument> => {
    return item.save()
}

const findById = async (_id: string): Promise<ItemDocument> => {
    const foundItem = await Item.findById(_id)
    if (!foundItem) {
      throw new NotFoundError(`Item with id ${_id} not found`)
    }
    return foundItem
}

const findByName = async (searchString: string): Promise<ItemDocument[]> => {
  const foundItems = await Item.find({ $text: { $search: searchString } }).sort({
    name: 1,
    _id: -1,
  })
  if (!foundItems) {
    throw new NotFoundError('No item with this name found.')
  }
  return foundItems
}

const findAll = async (): Promise<ItemDocument[]> => {
    return Item.find().sort({ title: 1, publishedYear: -1 })
}
  
const updateItem = async (
_id: string,
update: Partial<ItemDocument>
): Promise<ItemDocument | null> => {
const foundItem = await Item.findByIdAndUpdate(_id, update, {
    new: true,
})
if (!foundItem) {
    throw new NotFoundError(`Item with id ${_id} not found`)
}
return foundItem
}
  
const deleteItem = async (_id: string): Promise<ItemDocument | null> => {
const foundItem = Item.findByIdAndDelete(_id)
if (!foundItem) {
    throw new NotFoundError(`Item with id ${_id} not found`)
}
return foundItem
}

export default {
    create,
    findById,
    findByName,
    findAll,
    updateItem,
    deleteItem
  }

