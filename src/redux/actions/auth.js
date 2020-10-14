import services from '../../helpers/services'

export default {
  login: (data, params)=>({
    type: 'AUTH_USER_LOGIN',
    payload: services().post('/auth/login/'+params, data)
  }),
  logout: ()=>({
    type: 'AUTH_USER_LOGOUT'
  }),
  setToken: (payload)=>({
    type: 'SET_TOKEN',  
    payload
  }),
  clearMessage: ()=>({
    type: 'CLEAR_MESSAGE'
  })
}