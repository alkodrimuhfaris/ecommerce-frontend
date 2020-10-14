import services from '../../helpers/services'

export default {
  getNewItems: (page, limit)=>({
    type: 'GET_NEW_ITEMS',
    payload: services().get('/public/new', {params:{page, limit}})
  }),
  getPopularItems: (page, limit)=>({
    type: 'GET_POPULAR_ITEMS',
    payload: services().get('/public/popular', {params:{page, limit}})
  }),
  getDetailItem: (itemId, page=1, limit='-')=>({
    type: 'GET_DETAIL_ITEM',
    payload: services().get('/public/products/'+itemId, {params:{page, limit}})
  }),
  getDetailColorItem: (detailItemId)=>({
    type: 'GET_DETAIL_COLOR_ITEM',
    payload: services().get('/public/products/detail/'+detailItemId)
  })
}