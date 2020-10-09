import services from '../../helpers/services'

export default {
  getProfile: (token)=>({
    type: 'AUTH_USER_LOGIN',
    payload: services(token).post('/auth/login/')
  })
}