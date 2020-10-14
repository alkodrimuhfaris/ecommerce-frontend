const initialState = {
  userData: {
    avatar: ''
  }
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
      const {data} = action.payload
      if(data.length){
        return {
          userData: data
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