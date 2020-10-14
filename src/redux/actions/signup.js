import services from '../../helpers/services'

export default {
  createUser: (data, params)=>({
    type: 'AUTH_USER_SIGNUP',
    payload: services().post('/auth/signup/'+params, data)
  })
}