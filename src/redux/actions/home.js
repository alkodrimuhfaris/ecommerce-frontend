import qs from 'qs';
import services from '../../helpers/services';

export default {
  getPublicNew: (page = 1, limit = 15) => ({
    type: 'GET_NEW',
    payload: services().get(`/public/new?${qs.stringify({ page, limit })}`),
  }),
  getPublicPopular: (page = 1, limit = 15) => ({
    type: 'GET_POPULAR',
    payload: services().get(`/public/popular?${qs.stringify({ page, limit })}`),
  }),
};
