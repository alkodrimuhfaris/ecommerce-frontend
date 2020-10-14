import {combineReducers} from 'redux'

import auth from './auth'
import signup from './signup'
import profile from './profile'
import items from './items'
import cart from './cart'

console.log(auth)

export default combineReducers({
  auth, signup, profile, items, cart
})