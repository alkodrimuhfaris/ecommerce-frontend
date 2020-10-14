const initialState = {
  dataCart:[],
  isAdded: false,
  isLoading: false,
  isError: false,
  alertMsg: ''
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'POST_NEW_CART_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'POST_NEW_CART_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data'
      }
    }
    case 'POST_NEW_CART_FULFILLED': {
      const {message, success} = action.payload.data
      if(success){
        return {
          ...state,
          isAdded: true,
          isError: false,
          alertMsg: message,
          isLoading: false
        }
      }else{
        return {
          ...state,
          isAdded: false,
          isError: true,
          alertMsg: message,
          isLoading: false        
        }
      }
    }
    case 'GET_CART_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GET_CART_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data'
      }
    }
    case 'GET_CART_FULFILLED': {
      const {message, success, data} = action.payload.data
      if(success){
        return {
          ...state,
          dataCart: data,
          isError: false,
          alertMsg: message,
          isLoading: false
        }
      }else{
        return {
          ...state,
          isError: true,
          alertMsg: message,
          isLoading: false        
        }
      }
    }
    default : {
      return state
    }
  }
}