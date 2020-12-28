const initialState = {
  userData: {},
  message: '',
  isUpdated: false,
  isError: false,
  isPending: false,

  getProfilePending: false,
  getProfileError: false,
  getProfileSuccess: false,
  getProfileMessage: '',

  deleteAvaSuccess: false,
  deleteAvaError: false,
  deleteAvaPending: false,
  deleteAvaMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_AVATAR_PENDING': {
      return {
        ...state,
        deleteAvaSuccess: false,
        deleteAvaError: false,
        deleteAvaPending: true,
        deleteAvaMessage: 'Deleting avatar..',
      };
    }
    case 'DELETE_AVATAR_ERROR': {
      return {
        ...state,
        deleteAvaSuccess: false,
        deleteAvaError: true,
        deleteAvaPending: false,
        deleteAvaMessage: 'Deleting avatar failed due some error',
      };
    }
    case 'DELETE_AVATAR_FULFILLED': {
      return {
        ...state,
        deleteAvaSuccess: true,
        deleteAvaError: false,
        deleteAvaPending: false,
        deleteAvaMessage: 'Delete avatar success!',
      };
    }
    case 'GET_PROFILE_PENDING': {
      return {
        ...state,
        getProfilePending: true,
        getProfileError: false,
        getProfileSuccess: false,
        getProfileMessage: 'Getting your profile...',
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        getProfilePending: false,
        getProfileError: true,
        getProfileSuccess: false,
        getProfileMessage: 'There is error when getting profile',
      };
    }
    case 'GET_PROFILE_FULFILLED': {
      const {results, success, message} = action.payload.data;
      if (success) {
        return {
          ...state,
          userData: results,
          getProfilePending: false,
          getProfileError: false,
          getProfileSuccess: true,
          getProfileMessage: message,
        };
      }
      return {
        ...state,
        getProfilePending: false,
        getProfileError: true,
        getProfileSuccess: false,
        getProfileMessage: message,
      };
    }
    case 'PATCH_PROFILE_PENDING': {
      return {
        ...state,
        isPending: true,
        isUpdated: false,
        isError: false,
      };
    }
    case 'PATCH_PROFILE_REJECTED': {
      return {
        ...state,
        isPending: false,
        isError: true,
        isUpdated: false,
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
    case 'CLEAR_STATE': {
      return {
        ...state,
        isUpdated: false,
        isError: false,
        isPending: false,
        deleteAvaSuccess: false,
        deleteAvaError: false,
        deleteAvaPending: false,
        getProfilePending: false,
        getProfileError: false,
        getProfileSuccess: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
