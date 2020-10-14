import services from '../../helpers/services'

export default {
  getProfile: (token)=>({
    type: 'GET_PROFILE',
    payload: services(token).get('/users')
  })
}