const initialState = {
  couriers: [],
  services: [],
  itemdetails_id: [],
  quantity: [],
};

export default (state = initialState, action) => {
  switch (action.payload) {
    case 'ADD_CHECKOUT_DATA': {
      return {
        ...state,
        ...action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
