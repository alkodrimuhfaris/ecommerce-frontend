const initialState = {
  deleteItemSuccess: false,
  deleteItemError: false,
  deleteItemPending: false,
  deleteItemMessage: '',

  deleteImageSucces: false,
  deleteImageError: false,
  deleteImagePending: false,
  deleteImageMessage: '',

  deleteItemDetailSuccess: false,
  deleteItemDetailError: false,
  deleteItemDetailPending: false,
  deleteItemDetailMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_ITEM_PENDING': {
      return {
        ...state,
        deleteItemSuccess: false,
        deleteItemError: false,
        deleteItemPending: true,
        deleteItemMessage: 'Deleting Item..',
      };
    }
    case 'DELETE_ITEM_REJECTED': {
      return {
        ...state,
        deleteItemSuccess: false,
        deleteItemError: true,
        deleteItemPending: false,
        deleteItemMessage: 'Delete Item Rejected',
      };
    }
    case 'DELETE_ITEM_FULFILLED': {
      return {
        ...state,
        deleteItemSuccess: true,
        deleteItemError: false,
        deleteItemPending: false,
        deleteItemMessage: 'Delete item success',
      };
    }
    case 'DELETE_IMAGE_PENDING': {
      return {
        ...state,
        deleteImageSuccess: false,
        deleteImageError: false,
        deleteImagePending: true,
        deleteImageMessage: 'Deleting image..',
      };
    }
    case 'DELETE_IMAGE_REJECTED': {
      return {
        ...state,
        deleteImageSuccess: false,
        deleteImageError: true,
        deleteImagePending: false,
        deleteImageMessage: 'Delete image Rejected',
      };
    }
    case 'DELETE_IMAGE_FULFILLED': {
      return {
        ...state,
        deleteImageSuccess: true,
        deleteImageError: false,
        deleteImagePending: false,
        deleteImageMessage: 'Delete image success',
      };
    }
    case 'DELETE_ITEM_DETAILS_PENDING': {
      return {
        ...state,
        deleteItemDetailSuccess: false,
        deleteItemDetailError: false,
        deleteItemDetailPending: true,
        deleteItemDetailMessage: 'Deleting item detail..',
      };
    }
    case 'DELETE_ITEM_DETAILS_REJECTED': {
      return {
        ...state,
        deleteItemDetailSuccess: false,
        deleteItemDetailError: true,
        deleteItemDetailPending: false,
        deleteItemDetailMessage: 'Delete item rejected',
      };
    }
    case 'DELETE_ITEM_DETAILS_FULFILLED': {
      return {
        ...state,
        deleteItemDetailSuccess: true,
        deleteItemDetailError: false,
        deleteItemDetailPending: false,
        deleteItemDetailMessage: 'Delete item detail success',
      };
    }
    case 'LOGOUT': {
      return {
        ...initialState,
      };
    }
    case 'CLEAR': {
      return {
        ...initialState,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
