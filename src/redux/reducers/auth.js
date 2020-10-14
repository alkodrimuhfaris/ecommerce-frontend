const initialState = {
  isLogin: false,
  isError: false,
  isLoading: false,
  alertMsg: '',
  token: ''
}

export default (state=initialState, action) => {
  switch(action.type){
    case 'AUTH_USER_LOGIN_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'AUTH_USER_LOGIN_REJECTED' : {
      return {
        ...state,
        isError: true,
        alertMsg: 'there is an error'
      }
    }
    case 'AUTH_USER_LOGIN_FULFILLED':{
      const {message, token} = action.payload.data
      localStorage.setItem('token', token)
      if(token){
        return {
          isLogin: true,
          isError: false,
          alertMsg: message,
          isLoading: false,
          token
        }
      }else{
        return {
          ...state,
          isLogin: false,
          isError: true,
          alertMsg: message,
          isLoading: false        
        }
      }
    } case 'AUTH_USER_LOGOUT' : {
      localStorage.removeItem('token')
      return {
        ...state,
        isLogin: false,
        isError: false,
        alertMsg: 'log out successfully!',
        isLoading: false,
        token: ''
      }
    } case 'CLEAR_MESSAGE': {
      return {
        ...state,
        alertMsg: ''
      }
    } case 'SET_TOKEN': {
      return {
        ...state,
        isLogin: true,
        token:action.payload
      }
    }
    default :{
      return {
        ...state
      }
    }
  }
}