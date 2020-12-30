const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
  bookingSummary: {},
  bookingDetail: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHECKOUT_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Getting checkout data..',
      };
    }
    case 'GET_CHECKOUT_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: 'Error getting checkout',
      };
    }
    case 'GET_CHECKOUT_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Get checkout data success',
        bookingSummary: action.payload.data.bookingSummary,
        bookingDetail: action.payload.data.bookingDetail,
      };
    }
    default: {
      return state;
    }
  }
};
