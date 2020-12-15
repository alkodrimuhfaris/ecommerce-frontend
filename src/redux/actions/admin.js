import services from '../../helpers/services'
import qs from 'qs'

export default {
  addNewItem: (data, token)=>({
    type: 'ADD_ITEM',
    payload: services(token).post('/items', data)
  }),
  updateImage: (data, item_id, id, token)=>({
    type: 'UPDATE_IMAGE',
    payload: services(token).patch('/items/image/update/single' + item_id + id, data)
  }),
  updateDetailItem: (data, item_id, id, token)=>({
    type: 'UPDATE_ITEM',
    payload: services(token).patch('/items/detail/update/' + item_id + id, data)
  }),
  deleteItem: (id, token) => ({
    type: 'DELETE_ITEM',
    payload: services(token).delete('/items/delete' + id)
  })
}