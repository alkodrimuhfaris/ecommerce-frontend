const initialState = {
  query: {
    page: 1,
    limit: 10,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_QUERY': {
      console.log(action.payload);
      return {
        ...state,
        query: action.payload.query,
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
