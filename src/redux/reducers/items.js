const initialState = {
  dataNewItems: [],
  pageInfoNewItems: {},
  dataPopularItems: [],
  pageInfoPopularItems: {},
  detailItem: [],
  detailColorItem: [],
  isLoading: false,
  isError: false,
  alertMsg: ''
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'GET_NEW_ITEMS_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GET_NEW_ITEMS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data'
      }
    }
    case 'GET_NEW_ITEMS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        dataNewItems: action.payload.data.data,
        pageInfoNewItems: action.payload.data.pageInfo
      }
    }
    case 'GET_POPULAR_ITEMS_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GET_POPULAR_ITEMS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data'
      }
    }
    case 'GET_POPULAR_ITEMS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        dataPopularItems: action.payload.data.data,
        pageInfoPopularItems: action.payload.data.pageInfo
      }
    }
    case 'GET_DETAIL_ITEM_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GGET_DETAIL_ITEM_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data'
      }
    }
    case 'GET_DETAIL_ITEM_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        detailItem: action.payload.data
      }
    }
    case 'GET_DETAIL_COLOR_ITEM_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GGET_DETAIL_COLOR_ITEM_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data'
      }
    }
    case 'GET_DETAIL_COLOR_ITEM_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        detailColorItem: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}