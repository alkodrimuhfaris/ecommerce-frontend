const initialState = {
  userData: {}
}

export default (state=initialState, action) => {
  switch(action.type){
    case 'GET_PROFILE_PENDING' : {
      return {
        ...state
      }
    }
    case 'GET_PROFILE_REJECTED' : {
      return {
        ...state
      }
    }
    case 'GET_PROFILE_FULFILLED':{
      const {payload} = action
      if(token){
        return {
          userData: payload
        }
      }else{
        return {
          ...state      
        }
      }
    } default :{
      return {
        ...state
      }
    }
  }
}