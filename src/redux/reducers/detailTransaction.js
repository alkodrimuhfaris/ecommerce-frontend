const initialState = {
  pending: false,
  success: false,
  error: false,
  message: '',
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_TRANSACTION_ID_PENDING': {
      return {
        ...state,
        pending: true,
        success: false,
        error: false,
        message: 'Getting transaction...',
      };
    }
    case 'GET_TRANSACTION_ID_REJECTED': {
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        message: 'Get transaction data rejected',
      };
    }
    case 'GET_TRANSACTION_ID_FULFILLED': {
      return {
        ...state,
        pending: false,
        success: true,
        error: false,
        message: 'Get transaction data fulfilled',
        data: action.payload.data.results,
      };
    }
  }
};
