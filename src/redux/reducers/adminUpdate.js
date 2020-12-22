const initialState = {
  updateItemSuccess: false,
  updateItemError: false,
  updateItemPending: false,
  updateItemMessage: '',

  updateImageSuccess: false,
  updateImageError: false,
  updateImagePending: false,
  updateImageMessage: '',

  updateDetailItemSuccess: false,
  updateDetailItemError: false,
  updateDetailItemPending: false,
  updateDetailItemMessage: '',
};

// urutan update item => detail item => image

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ITEM_PENDING': {
      return {
        ...state,
        updateItemSuccess: false,
        updateItemError: false,
        updateItemPending: true,
        updateItemMessage: 'Updating Item..',
      };
    }
    case 'UPDATE_ITEM_REJECTED': {
      return {
        ...state,
        updateItemSuccess: false,
        updateItemError: true,
        updateItemPending: false,
        updateItemMessage: 'Update Item Rejected',
      };
    }
    case 'UPDATE_ITEM_FULFILLED': {
      return {
        ...state,
        updateItemSuccess: true,
        updateItemError: false,
        updateItemPending: false,
        updateItemMessage: 'Update item success',
      };
    }
    case 'UPDATE_IMAGE_PENDING': {
      return {
        ...state,
        updateImageSuccess: false,
        updateImageError: false,
        updateImagePending: true,
        updateImageMessage: 'Updating image...',
      };
    }
    case 'UPDATE_IMAGE_REJECTED': {
      return {
        ...state,
        updateImageSuccess: false,
        updateImageError: true,
        updateImagePending: false,
        updateImageMessage: 'Update image is failed',
      };
    }
    case 'UPDATE_IMAGE_FULFILLED': {
      return {
        ...state,
        updateImageSuccess: true,
        updateImageError: false,
        updateImagePending: false,
        updateImageMessage: 'Update image is success',
      };
    }
    case 'UPDATE_DETAIL_PENDING': {
      return {
        ...state,
        updateDetailItemSuccess: false,
        updateDetailItemError: false,
        updateDetailItemPending: true,
        updateDetailItemMessage: 'Updating item detail...',
      };
    }
    case 'UPDATE_DETAIL_REJECTED': {
      return {
        ...state,
        updateDetailItemSuccess: false,
        updateDetailItemError: true,
        updateDetailItemPending: false,
        updateDetailItemMessage: 'Update item detail failed',
      };
    }
    case 'UPDATE_DETAIL_FULFILLED': {
      return {
        ...state,
        updateDetailItemSuccess: false,
        updateDetailItemError: false,
        updateDetailItemPending: false,
        updateDetailItemMessage: 'Success update item detail',
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
