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
    case 'PROCESS_PAYMENT_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Getting detail categories',
      };
    }
    case 'PROCESS_PAYMENT_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: 'Process to payment rejected',
      };
    }
    case 'PROCESS_PAYMENT_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: action.payload.data.message,
      };
    }
  }
};
