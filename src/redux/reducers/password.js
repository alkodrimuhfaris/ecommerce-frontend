const initialState = {
  passwordUpdated: false,
  passwordError: false,
  passwordPending: false,
  passwordMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_PENDING': {
      return {
        ...state,
        passwordUpdated: false,
        passwordError: false,
        passwordPending: true,
        passwordMessage: 'Sending your new password...',
      };
    }
    case 'CHANGE_PASSWORD_REJECTED': {
      return {
        ...state,
        passwordUpdated: false,
        passwordError: true,
        passwordPending: false,
        passwordMessage: action.payload.response.data.message,
      };
    }
    case 'CHANGE_PASSWORD_FULFILLED': {
      return {
        passwordUpdated: true,
        passwordError: false,
        passwordPending: false,
        passwordMessage: 'Update password successfull',
      };
    }
    case 'CLEAR_STATE_PASS': {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
