const initialState = {
  pending: false,
  success: false,
  error: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_ADDRESS_PENDING': {
      return {
        ...state,
        pending: true,
        success: false,
        error: false,
        message: 'Deleting address...',
      };
    }
    case 'DELETE_ADDRESS_REJECTED': {
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        message: 'Delete address failed',
      };
    }
    case 'DELETE_ADDRESS_FULFILLED': {
      return {
        ...state,
        pending: false,
        success: true,
        error: false,
        message: 'Success delete address',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
