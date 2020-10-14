import services from '../../helpers/services'

export default {
  postCart: (token, quantity, itemdetails_id )=>({
    type: 'POST_NEW_CART',
    payload: services(token).post('/mycart', {quantity, itemdetails_id})
  }),
  getCart: (token, limit='-')=>({
    type: 'GET_CART',
    payload: services(token).get('/mycart', {params: {limit}})
  })
}