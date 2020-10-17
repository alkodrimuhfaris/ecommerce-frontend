const initialState = {
  modalNewAddress: false,
  modalEditAddress: false,
  addressOnId: []
}

export default (state=initialState, action) => {
  switch(action.type){
    case 'MODAL_NEW_ADDRESS_OPEN': {
      return {
        ...state,
        modalNewAddress: true
      }
    }
    case 'MODAL_NEW_ADDRESS_CLOSE': {
      return {
        ...state,
        modalNewAddress: false
      }
    }
    case 'MODAL_EDIT_ADDRESS_OPEN': {
      const {data} = action.payload.data
      return {
        ...state,
        modalEditAddress: true,
        addressOnId: data
      }
    }
    case 'MODAL_EDIT_ADDRESS_CLOSE': {
      return {
        ...state,
        modalEditAddress: false
      }
    }
    default : {
      return state
    }
  }
}