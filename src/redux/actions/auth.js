import {default as axios} from 'axios'

export default {
  login: (data, params)=>({
    type: 'AUTH_USER_LOGIN',
    payload: axios.post(process.env.REACT_APP_URL_BACKEND+'auth/login/'+params, data)
  })
}