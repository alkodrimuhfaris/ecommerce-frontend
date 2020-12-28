const initialState = {
  modalNewAddress: false,
  modalEditAddress: false,
  idAddress: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MODAL_NEW_ADDRESS_OPEN': {
      return {
        ...state,
        modalNewAddress: true,
      };
    }
    case 'MODAL_NEW_ADDRESS_CLOSE': {
      return {
        ...state,
        modalNewAddress: false,
      };
    }
    case 'MODAL_EDIT_ADDRESS_OPEN': {
      return {
        ...state,
        modalEditAddress: true,
        idAddress: action.payload,
      };
    }
    case 'MODAL_EDIT_ADDRESS_CLOSE': {
      return {
        ...state,
        modalEditAddress: false,
        idAddress: 0,
      };
    }
    default: {
      return state;
    }
  }
};
