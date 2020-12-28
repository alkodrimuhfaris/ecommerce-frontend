import qs from 'qs';
import services from '../../helpers/services';

export default {
  postAddress: (token, data) => ({
    type: 'POST_NEW_ADDRESS',
    payload: services(token).post('/address', data),
  }),
  patchAddress: (token, id, data) => ({
    type: 'PATCH_ADDRESS',
    payload: services(token).patch(`/address/${id}`, data),
  }),
  getAddress: (token, limit = '-') => ({
    type: 'GET_ADDRESS',
    payload: services(token).get(`/address?${qs.stringify({limit})}`),
  }),
  getAddresssById: (token, id) => ({
    type: 'GET_ADDRESS_ID',
    payload: services(token).get(`/address/detail/${id}`),
  }),
  getProvince: (token) => ({
    type: 'GET_PROVINCE',
    payload: services(token).get('/address/province'),
  }),
  getCityProvince: (token, id) => ({
    type: 'GET_CITY',
    payload: services(token).get(`/address/province/city/${id}`),
  }),
  deleteAddress: (token, id) => ({
    type: 'DELETE_ADDRESS',
    payload: services(token).delete(`/address/${id}`),
  }),
};
