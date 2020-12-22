import qs from 'qs';
import services from '../../helpers/services';

export default {
  getNewItems: (page, limit) => ({
    type: 'GET_NEW_ITEMS',
    payload: services().get(`/public/new?${qs.stringify({page, limit})}`),
  }),
  getPopularItems: (page, limit) => ({
    type: 'GET_POPULAR_ITEMS',
    payload: services().get(`/public/popular?$${qs.stringify({page, limit})}`),
  }),
  getDetailItem: (itemId) => ({
    type: 'GET_DETAIL_ITEM',
    payload: services().get(`/public/products/${itemId}`),
  }),
  searchItem: (query) => ({
    type: 'SEARCH_ITEM',
    payload: services().get(`/public/products?${qs.stringify(query)}`),
  }),
  getDetailColorItem: (detailItemId) => ({
    type: 'GET_DETAIL_COLOR_ITEM',
    payload: services().get(`/public/products/detail/${detailItemId}`),
  }),
};
