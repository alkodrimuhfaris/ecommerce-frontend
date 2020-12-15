const initialState = {
  popularData: [],
  popularPageInfo: {},
  popularIsPending: false,
  popularIsError: false,
  popularMessage: '',

  newData: [],
  newPageInfo: {},
  newIsPending: false,
  newIsError: false,
  newMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEW_PENDING': {
      return {
        ...state,
        newMessage: 'getting new items...',
        newIsError: false,
        newIsPending: true,
      };
    }
    case 'GET_NEW_REJECTED': {
      return {
        ...state,
        newMessage: 'error getting new items',
        newIsError: true,
        newIsPending: false,
      };
    }
    case 'GET_NEW_FULFILLED': {
      return {
        ...state,
        newData: action.payload.data.results,
        newPageInfo: action.payload.data.pageInfo,
        newMessage: 'success getting new items',
        newIsError: false,
        newIsPending: false,
      };
    }
    case 'GET_POPULAR_PENDING': {
      return {
        ...state,
        popularMessage: 'getting popular items...',
        popularIsError: false,
        newIsPending: true,
      };
    }
    case 'GET_POPULAR_REJECTED': {
      return {
        ...state,
        popularMessage: 'error getting popular items',
        popularIsError: true,
        popularIsPending: false,
      };
    }
    case 'GET_POPULAR_FULFILLED': {
      return {
        ...state,
        popularData: action.payload.data.results,
        popularPageInfo: action.payload.data.pageInfo,
        popularMessage: 'success getting popular items',
        popularIsError: false,
        popularIsPending: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
