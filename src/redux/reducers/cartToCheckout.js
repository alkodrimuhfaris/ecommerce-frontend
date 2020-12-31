const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'CART_TO_CHECKOUT': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'CLEAR_CART_CHECKOUT': {
      return {
        ...state,
        ...initialState,
      }
    }
  }
};
