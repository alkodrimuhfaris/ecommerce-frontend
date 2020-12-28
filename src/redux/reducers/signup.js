const initialState = {
  userIsCreated: false,
  isError: false,
  isLoading: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_SIGNUP_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'AUTH_USER_SIGNUP_REJECTED': {
      return {
        ...state,
        isError: true,
        alertMsg: action.payload.response.data.message,
        isLoading: false,
      };
    }
    case 'AUTH_USER_SIGNUP_FULFILLED': {
      return {
        userIsCreated: true,
        isError: false,
        alertMsg: 'sign up successfull',
        isLoading: false,
      };
    }
    case 'CLEAR_STATE': {
      return {
        ...state,
        userIsCreated: false,
        isError: false,
        alertMsg: '',
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
