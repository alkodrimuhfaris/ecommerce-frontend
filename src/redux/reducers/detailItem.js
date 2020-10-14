const initialState = {
  detailItem: [],
  isLoading: false,
  isError: false,
  alertMsg: ''
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'GET_ALL_ITEMS_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GET_ALL_ITEMS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data'
      }
    }
    case 'GET_ALL_ITEMS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        detailItem: action.payload.data
      }
    }
    default : {
      return state
    }
  }
}