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
    case 'TOP_UP_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Topping up your balance',
      };
    }
    case 'TOP_UP_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'TOP_UP_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: action.payload.data.message,
      };
    }
    case 'CLEAR_TOPUP_NOTIF': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
