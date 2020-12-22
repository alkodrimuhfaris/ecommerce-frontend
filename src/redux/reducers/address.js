const initialState = {
  addressData: [],
  message: '',
  success: false,
  isAdded: false,
  isUpdated: false,
  isError: false,
  isPending: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ADDRESS_PENDING': {
      return {
        ...state,
        isPending: true,
        isError: false,
      };
    }
    case 'GET_ADDRESS_REJECTED': {
      return {
        ...state,
        isError: true,
        isPending: false,
        message: 'There is an error when getting address',
      };
    }
    case 'GET_ADDRESS_FULFILLED': {
      const {data, success, message} = action.payload.data;
      if (success) {
        return {
          ...state,
          addressData: data,
          message,
          isError: false,
          isPending: false,
          success,
        };
      }
      return {
        ...state,
        message: 'there is an error',
        isError: true,
        isPending: false,
        success,
      };
    }
    case 'PATCH_ADDRESS_PENDING': {
      return {
        ...state,
        isPending: true,
        isError: false,
      };
    }
    case 'PATCH_ADDRESS_REJECTED': {
      return {
        ...state,
        isPending: false,
        isError: true,
        message: 'there is an error patching the data',
      };
    }
    case 'PATCH_ADDRESS_FULFILLED': {
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
        isUpdated: false,
      };
    }
    case 'CREATE_ADDRESS_PENDING': {
      return {
        ...state,
        isPending: true,
        isError: false,
      };
    }
    case 'CREATE_ADDRESS_REJECTED': {
      return {
        ...state,
        isPending: false,
        isError: true,
        message: 'there is an error patching the data',
      };
    }
    case 'CREATE_ADDRESS_FULFILLED': {
      const {success, message} = action.payload.data;
      if (success) {
        return {
          ...state,
          message,
          isPending: false,
          isError: false,
          isAdded: false,
        };
      }
      return {
        ...state,
        message: 'there is an error',
        isPending: false,
        isError: true,
        isAdded: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
