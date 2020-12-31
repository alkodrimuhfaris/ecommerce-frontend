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
      const data = {
        itemdetails_id: action.payload.itemdetails_id,
        quantity: action.payload.quantity,
      };
      localStorage.setItem('checkoutData', qs.stringify(data));
      return {
        ...state,
        couriers: payload.couriers,
        services: payload.services,
        itemdetails_id: payload.itemdetails_id,
        quantity: payload.quantity,
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
