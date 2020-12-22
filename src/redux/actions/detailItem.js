import services from '../../helpers/services';

export default {
  getDetailItem: (itemId) => ({
    type: 'GET_DETAIL_ITEM',
    payload: services().get(`/public/products${itemId}`, {limit: '-'}),
  }),
};
