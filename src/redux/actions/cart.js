import qs from 'qs';
import services from '../../helpers/services';

export default {
  postCart: (token, quantity, item_id, itemdetails_id) => ({
    type: 'POST_NEW_CART',
    payload: services(token).post('/mycart', {
      quantity,
      item_id,
      itemdetails_id,
    }),
  }),
  getCart: (token, limit = '-') => ({
    type: 'GET_CART',
    payload: services(token).get('/mycart', {params: {limit}}),
  }),
  deleteCart: (token, deleteArr = [{}]) => ({
    type: 'DELETE_BULK_CART',
    payload: services(token).delete(
      `/mycart/bulk?${qs.stringify({deleteArr})}`,
    ),
  }),
  cartToCheckout: (payload = []) => ({
    type: 'CART_TO_CHECKOUT',
    payload,
  }),
  clearCartCheckout: () => ({
    type: 'CLEAR_CART_CHECKOUT',
  }),
  celarStateDelete: () => ({
    type: 'RESET_STATE_DELETE',
  }),
};
