const initialState = {
  pending: false,
  error: false,
  success: false,
  message: '',
  categories: [],
  pageInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_CATEGORIES_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Getting categories...',
      };
    }
    case 'GET_CATEGORIES_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: 'Error get categories',
      };
    }
    case 'GET_CATEGORIES_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        message: 'Success get categories',
        categories: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
      };
    }
  }
};
