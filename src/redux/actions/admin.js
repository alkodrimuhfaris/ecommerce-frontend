import qs from 'qs';
import services from '../../helpers/services';

export default {
  addNewItem: (token, data) => ({
    type: 'POST_ITEM',
    payload: services(token).post('/items', data),
  }),
  updateItem: (token, item_id, data) => ({
    type: 'UPDATE_ITEM',
    payload: services(token).patch(`/items/update/${item_id}`, data),
  }),
  updateImage: (token, data, item_id, id) => ({
    type: 'UPDATE_IMAGE',
    payload: services(token).patch(
      `/items/image/update/single${item_id}${id}`,
      data,
    ),
  }),
  updateDetailItem: (token, data, item_id, id) => ({
    type: 'UPDATE_DETAIL',
    payload: services(token).patch(
      `/items/detail/update/${item_id}${id}`,
      data,
    ),
  }),
  deleteItem: (token, id) => ({
    type: 'DELETE_ITEM',
    payload: services(token).delete(`/items/delete${id}`),
  }),
  deleteDetailItem: (token, item_id, id) => ({
    type: 'DELETE_ITEM_DETAILS',
    payload: services(token).delete(`/items/detail/delete/${item_id}/${id}`),
  }),
  deleteImage: (token, item_id, id) => ({
    type: 'DELETE_IMAGE',
    payload: services(token).delete(
      `/items/image/delete/single/${item_id}/${id}`,
    ),
  }),
  addQuery: (query = {}) => ({
    type: 'ADD_QUERY',
    payload: query,
  }),
  getAdminItems: (token, query = {}) => ({
    type: 'GET_SELLER_ITEM',
    payload: services(token).get(`/items?${qs.stringify(query)}`),
  }),
  getAllColors: (page = 1, limit = '-', searchColor = '') => ({
    type: 'GET_COLOR',
    payload: services().get(
      `/colors?${qs.stringify({page, limit, search: {name: searchColor}})}`,
    ),
  }),
  getItemDetails: (token, item_id) => ({
    type: 'GET_ITEM_DETAILS_ADMIN',
    payload: services(token).get(`/items/seller/${item_id}`),
  }),
  getCondition: (token, query = {page: 1, limit: '-'}) => ({
    type: 'GET_CONDITION',
    payload: services(token).get(`items/condition?${qs.stringify(query)}`),
  }),
};
