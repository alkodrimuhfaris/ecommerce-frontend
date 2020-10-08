import {default as axios} from 'axios'

export default {
  createUser: (data, params)=>({
    type: 'AUTH_USER_SIGNUP',
    payload: axios.post(process.env.REACT_APP_URL_BACKEND+'auth/signup/'+params, data)
  })
}