const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'PAY_TRANSACTION_PENDING': {
      return {
        success: false,
        error: false,
        pending: true,
        message: 'Paying your transaction...',
      };
    }
    case 'PAY_TRANSACTION_REJECTED': {
      return {
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'PAY_TRANSACTION_FULFILLED': {
      return {
        success: true,
        error: false,
        pending: false,
        message: action.payload.data.message,
      };
    }
    case 'CLEAR_TRANSACTION_NOTIF': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
