const initialState = {
  pending: false,
  error: false,
  success: false,
  message: '',
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_DELIVERY_FEE_PENDING': {
      return {
        ...state,
        error: false,
        success: false,
        pending: true,
        message: 'Getting delivery fee...',
      };
    }
    case 'GET_DELIVERY_FEE_REJECTED': {
      return {
        ...state,
        error: true,
        success: false,
        pending: false,
        message: 'Failed get delivery fee',
      };
    }
    case 'GET_DELIVERY_FEE_FULFILLED': {
      return {
        ...state,
        error: false,
        success: true,
        pending: false,
        message: 'Success get delivery fee',
        data: action.payload.data.results,
      };
    }
  }
};
