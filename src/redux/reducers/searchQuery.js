const initialState = {
  query: {
    page: 1,
    limit: 10,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_QUERY': {
      return {
        ...state,
        query: action.payload,
      };
    }
    case 'CLEAR_QUERY': {
      return {
        ...initialState,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
