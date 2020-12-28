import qs from 'qs';
import services from '../../helpers/services';

export default {
  addCheckoutData: (data) => ({
    type: 'ADD_CHECKOUT_DATA',
    payload: data,
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
