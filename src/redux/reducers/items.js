const initialState = {
  dataNewItems: [],
  pageInfoNewItems: {},
  newItemPending: false,
  newItemError: false,
  newItemSuccess: false,
  newItemMessage: '',

  dataPopularItems: [],
  pageInfoPopularItems: {},
  popularPending: false,
  popularError: false,
  popularSuccess: false,
  popularMessage: '',

  detailItem: [],
  detailItemPending: false,
  detailItemError: false,
  detailItemSuccess: false,
  detailItemMessage: '',

  detailColorItem: [],

  detailColorPending: false,
  detailColorError: false,
  detailColorSuccess: false,
  detailColorMessage: '',

  searchData: [],
  searchPageInfo: {},
  searchIsPending: false,
  searchIsError: false,
  searchIsSuccess: false,
  searchMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_ITEM_PENDING': {
      return {
        ...state,
        searchIsPending: true,
        searchIsError: false,
        searchIsSuccess: false,
        searchMessage: 'searching item..',
      };
    }
    case 'SEARCH_ITEM_REJECTED': {
      return {
        ...state,
        searchIsPending: false,
        searchIsError: true,
        searchIsSuccess: false,
        searchMessage: 'search item rejected',
      };
    }
    case 'SEARCH_ITEM_FULFILLED': {
      return {
        ...state,
        searchData: action.payload.data.results,
        searchPageInfo: action.payload.data.pageInfo,
        searchIsPending: false,
        searchIsError: false,
        searchIsSuccess: true,
        searchMessage: 'search item successfull',
      };
    }
    case 'GET_NEW_ITEMS_PENDING': {
      return {
        ...state,
        newItemPending: true,
        newItemError: false,
        newItemSuccess: false,
        newItemMessage: 'Getting new items...',
      };
    }
    case 'GET_NEW_ITEMS_REJECTED': {
      return {
        ...state,
        newItemPending: false,
        newItemError: false,
        newItemSuccess: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_NEW_ITEMS_FULFILLED': {
      return {
        ...state,
        dataNewItems: action.payload.data.results,
        pageInfoNewItems: action.payload.data.pageInfo,
        newItemPending: false,
        newItemError: false,
        newItemSuccess: true,
        newItemMessage: 'Success Get New Items',
      };
    }
    case 'GET_POPULAR_ITEMS_PENDING': {
      return {
        ...state,
        popularPending: false,
        popularError: false,
        popularSuccess: true,
        popularMessage: 'Getting popular items...',
      };
    }
    case 'GET_POPULAR_ITEMS_REJECTED': {
      return {
        ...state,
        popularPending: false,
        popularError: true,
        popularSuccess: false,
        popularMessage: 'There is an error at request data',
      };
    }
    case 'GET_POPULAR_ITEMS_FULFILLED': {
      return {
        ...state,
        popularPending: false,
        popularError: false,
        popularSuccess: true,
        popularMessage: 'Success getting popular items',
        dataPopularItems: action.payload.data.data,
        pageInfoPopularItems: action.payload.data.pageInfo,
      };
    }
    case 'GET_DETAIL_ITEM_PENDING': {
      return {
        ...state,
        detailItemPending: true,
        detailItemError: false,
        detailItemSuccess: false,
        detailItemMessage: 'Getting item detail...',
      };
    }
    case 'GET_DETAIL_ITEM_REJECTED': {
      return {
        ...state,
        detailItemPending: false,
        detailItemError: true,
        detailItemSuccess: false,
        detailItemMessage: 'There is an error at request data',
      };
    }
    case 'GET_DETAIL_ITEM_FULFILLED': {
      return {
        ...state,
        detailItem: action.payload.data.dataItem,
        detailColorItem: action.payload.data.productDetails,
        detailItemPending: false,
        detailItemError: false,
        detailItemSuccess: true,
        detailItemMessage: 'Get detail item success',
      };
    }
    case 'GET_DETAIL_COLOR_ITEM_PENDING': {
      return {
        ...state,
        detailColorPending: true,
        detailColorError: false,
        detailColorSuccess: false,
        detailColorMessage: 'Getting detail color item...',
      };
    }
    case 'GET_DETAIL_COLOR_ITEM_REJECTED': {
      return {
        ...state,
        detailColorPending: false,
        detailColorError: true,
        detailColorSuccess: false,
        detailColorMessage: 'There is an error at request data',
      };
    }
    case 'GET_DETAIL_COLOR_ITEM_FULFILLED': {
      return {
        ...state,
        detailColorPending: false,
        detailColorError: false,
        detailColorSuccess: true,
        detailColorMessage: 'Get detail color success',
        detailColorItem: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
