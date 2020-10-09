import services from '../../helpers/services'

export default {
  login: (data, params)=>({
    type: 'AUTH_USER_LOGIN',
    payload: services().post('/auth/login/'+params, data)
  })
}