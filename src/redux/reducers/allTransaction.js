const initialState = {
  pending: false,
  success: false,
  error: false,
  message: '',
  transactions: [],
  pageInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_TRANSACTION_PENDING': {
      return {
        ...state,
        pending: true,
        success: false,
        error: false,
        message: 'Getting transaction...',
      };
    }
    case 'GET_TRANSACTION_REJECTED': {
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        message: 'Get transaction data rejected',
      };
    }
    case 'GET_TRANSACTION_FULFILLED': {
      return {
        ...state,
        pending: false,
        success: true,
        error: false,
        message: 'Get transaction data fulfilled',
        transactions: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
      };
    }
  }
};
