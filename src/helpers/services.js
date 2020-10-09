import {default as axios} from 'axios'

export default (token=false) => {
  return axios.create({
    baseURL: process.env.REACT_APP_URL_BACKEND,
    headers: {
      'Authorization': token ? `Bearer ${token}` : undefined
    }
  })
}