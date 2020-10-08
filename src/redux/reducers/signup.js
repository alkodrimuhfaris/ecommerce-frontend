const initialState = {
  userIsCreated: false,
  isError: false,
  isLoading: false,
  alertMsg: '',
  token: ''
}

export default (state=initialState, action) => {
  switch(action.type){
    case 'AUTH_USER_SIGNUP_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'AUTH_USER_SIGNUP_REJECTED' : {
      const {message} = action.payload.data.message
      message = message ? message : 'Unknown Error!'
      return {
        ...state,
        isError: true,
        alertMsg: message
      }
    }
    case 'AUTH_USER_SIGNUP_FULFILLED':{
      const {message, token} = action.payload.data.message
      if(token){
        return {
          userIsCreated: true,
          isError: false,
          alertMsg: message,
          isLoading: false,
          token
        }
      }else{
        return {
          ...state,
          isError: true,
          alertMsg: message,
          isLoading: false        
        }
      }
    } default :{
      return state
    }
  }
}