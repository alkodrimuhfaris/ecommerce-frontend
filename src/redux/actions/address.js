import services from '../../helpers/services'

export default {
  postAddress: (token, data )=>({
    type: 'POST_NEW_ADDRESS',
    payload: services(token).post('/address', {data})
  }),
  patchAddress: (token, data )=>({
    type: 'POST_NEW_ADDRESS',
    payload: services(token).patch('/address', {data})
  }),
  getAddress: (token, limit='-')=>({
    type: 'GET_ADDRESS',
    payload: services(token).get('/address', {params: {limit}})
  })
}