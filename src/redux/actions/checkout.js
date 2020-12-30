import qs from 'qs';
import services from '../../helpers/services';

export default {
  addCheckoutData: (payload = {}) => ({
    type: 'ADD_CHECKOUT',
    payload,
  }),
  removeCheckoutData: () => ({
    type: 'REMOVE_CHECKOUT_DATA',
  }),
  setCheckoutData: (payload) => ({
    type: 'SET_CHECKOUT',
    payload,
  }),
  getDeliveryFee: (token, dataBooking = [], address_id) => ({
    type: 'GET_DELIVERY_FEE',
    payload: services(token).get(
      `/checkout/deliveryfee?${qs.stringify({dataBooking, address_id})}`,
    ),
  }),
  getSellerArray: (token, itemdetails_id = []) => ({
    type: 'GET_SELLER_ARR',
    payload: services(token).post(
      `/checkout/seller/array?${qs.stringify({itemdetails_id})}`,
    ),
  }),
  getCheckout: (token, data = {}) => ({
    type: 'GET_CHECKOUT',
    payload: services(token).post('/checkout/get', data),
  }),
};
