const initialState = {
  userData: {},
  message: '',
  isUpdated: false,
  isError: false,
  isPending: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_PENDING': {
      return {
        ...state,
        isPending: true,
        isError: false,
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        isError: true,
        isPending: false,
        message: 'There is error when getting profile',
      };
    }
    case 'GET_PROFILE_FULFILLED': {
      const {results, success, message} = action.payload.data;
      if (success) {
        return {
          ...state,
          userData: results,
          message,
          isError: false,
          isPending: false,
        };
      }
      return {
        ...state,
        message: 'there is an error',
        isError: true,
        isPending: false,
      };
    }
    case 'PATCH_PROFILE_PENDING': {
      return {
        ...state,
        isPending: true,
        isError: false,
      };
    }
    case 'PATCH_PROFILE_REJECTED': {
      return {
        ...state,
        isPending: false,
        isError: true,
        message: 'there is an error patching the data',
      };
    }
    case 'PATCH_PROFILE_FULFILLED': {
      const {success, message} = action.payload.data;
      if (success) {
        return {
          ...state,
          message,
          isPending: false,
          isError: false,
          isUpdated: true,
        };
      }
      return {
        ...state,
        message: 'there is an error',
        isPending: false,
        isError: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
