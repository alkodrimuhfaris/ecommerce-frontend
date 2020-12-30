import qs from 'qs';
/* eslint-disable no-undef */
const initialState = {
  couriers: [],
  services: [],
  itemdetails_id: [],
  quantity: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHECKOUT': {
      const {payload} = action;
      console.log(payload);
      localStorage.setItem('checkoutData', qs.stringify(payload));
      return {
        ...state,
        couriers: action.payload.couriers,
        services: action.payload.services,
        itemdetails_id: action.payload.itemdetails_id,
        quantity: action.payload.quantity,
      };
    }
    case 'REMOVE_CHECKOUT_DATA': {
      localStorage.removeItem('checkoutData');
      console.log(initialState);
      return {
        ...state,
        ...initialState,
      };
    }
    case 'SET_CHECKOUT': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
