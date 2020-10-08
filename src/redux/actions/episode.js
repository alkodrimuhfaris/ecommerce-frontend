import {default as axios} from 'axios'

export default {
  getData: ()=>({
    type: 'GET_DATA',
    payload: axios.get('https://rickandmortyapi.com/api/episode')
  })
}