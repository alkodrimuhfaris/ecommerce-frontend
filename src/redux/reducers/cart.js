const initialState = {
  dataCart: [],
  dataCartPending: false,
  dataCartError: false,
  dataCartSuccess: false,
  dataCartMessage: '',

  postCartPending: false,
  postCartError: false,
  postCartSuccess: false,
  postCartMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POST_NEW_CART_PENDING': {
      return {
        ...state,
        postCartPending: true,
        postCartError: false,
        postCartSuccess: false,
        postCartMessage: 'Posting cart..',
      };
    }
    case 'POST_NEW_CART_REJECTED': {
      return {
        ...state,
        postCartPending: false,
        postCartError: true,
        postCartSuccess: false,
        postCartMessage: 'There is an error at posting cart',
      };
    }
    case 'POST_NEW_CART_FULFILLED': {
      const {message, success} = action.payload.data;
      if (success) {
        return {
          ...state,
          postCartPending: false,
          postCartError: false,
          postCartSuccess: true,
          postCartMessage: 'Post data cart successfully',
        };
      }
      return {
        ...state,
        postCartSuccess: false,
        postCartError: true,
        postCartMessage: message,
        postCartPending: false,
      };
    }
    case 'GET_CART_PENDING': {
      return {
        ...state,
        dataCartPending: true,
        dataCartError: false,
        dataCartSuccess: false,
        dataCartMessage: 'Getting data cart...',
      };
    }
    case 'GET_CART_REJECTED': {
      return {
        ...state,
        dataCartPending: false,
        dataCartError: true,
        dataCartSuccess: false,
        dataCartMessage: 'There is an error at request data',
      };
    }
    case 'GET_CART_FULFILLED': {
      const {message, success, results} = action.payload.data;
      if (success) {
        return {
          ...state,
          dataCart: results,
          dataCartPending: false,
          dataCartError: false,
          dataCartSuccess: true,
          dataCartMessage: 'Success get data cart',
        };
      }
      return {
        ...state,
        dataCartPending: false,
        dataCartError: true,
        dataCartSuccess: false,
        dataCartMessage: message,
      };
    }
    default: {
      return state;
    }
  }
};
