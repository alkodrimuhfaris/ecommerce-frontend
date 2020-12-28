const initialState = {
  success: false,
  pending: false,
  error: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_BULK_CART_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Deleting cart..',
      };
    }
    case 'DELETE_BULK_CART_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: 'There is an error at deleting cart',
      };
    }
    case 'DELETE_BULK_CART_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        message: 'Delete data cart successfully',
      };
    }
    default: {
      return state;
    }
  }
};
