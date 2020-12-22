const initialState = {
  sellerProducts: [],
  pageInfo: {},
  getDataSuccess: false,
  getDataError: false,
  getDataPending: false,
  getDataMessage: '',

  postItemSuccess: false,
  postItemError: false,
  postItemPending: false,
  postItemMessage: '',

  colors: [],
  colorsPageInfo: {},
  getColorsError: false,
  getColorsPending: false,
  getColorsMessage: '',

  condition: [],
  conditionPageInfo: {},
  getConditionError: false,
  getConditionPending: false,
  getConditionMessage: '',

  item: {},
  category: {},
  ratings: {},
  itemDetails: [],
  itemData: {},
  getItemDetailsSucces: false,
  getItemDetailsError: false,
  getItemDetailsPending: false,
  getItemDetailsMessage: '',

  query: {
    page: 1,
    limit: 10,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_QUERY': {
      return {
        ...state,
        query: action.payload,
      };
    }
    case 'CLEAR_QUERY': {
      return {
        ...state,
        query: {
          page: 1,
          limit: 10,
        },
      };
    }
    case 'GET_ITEM_DETAILS_ADMIN_PENDING': {
      return {
        ...state,
        getItemDetailsSucces: false,
        getItemDetailsError: false,
        getItemDetailsPending: true,
        getItemDetailsMessage: 'Getting item details...',
      };
    }
    case 'GET_ITEM_DETAILS_ADMIN_REJECTED': {
      return {
        ...state,
        getItemDetailsSucces: false,
        getItemDetailsError: true,
        getItemDetailsPending: false,
        getItemDetailsMessage: 'Unable to get item details',
      };
    }
    case 'GET_ITEM_DETAILS_ADMIN_FULFILLED': {
      return {
        ...state,
        itemData: action.payload.data.results,
        item: action.payload.data.results.item,
        category: action.payload.data.results.category,
        itemDetails: action.payload.data.results.itemDetails,
        ratings: action.payload.data.results.ratings,
        getItemDetailsSucces: true,
        getItemDetailsError: false,
        getItemDetailsPending: false,
        getItemDetailsMessage: 'Success get item details',
      };
    }
    case 'GET_CONDITION_PENDING': {
      return {
        ...state,
        getConditionError: false,
        getConditionPending: true,
        getConditionMessage: 'Getting item condition',
      };
    }
    case 'GET_CONDITION_REJECTED': {
      return {
        ...state,
        getConditionError: false,
        getConditionPending: true,
        getConditionMessage: 'Get item condition error',
      };
    }
    case 'GET_CONDITION_FULFILLED': {
      return {
        ...state,
        condition: action.payload.data.results,
        conditionPageInfo: action.payload.data.pageInfo,
        getConditionError: false,
        getConditionPending: true,
        getConditionMessage: 'Get item condition success',
      };
    }
    case 'GET_COLOR_PENDING': {
      return {
        ...state,
        getColorsError: false,
        getColorsPending: true,
        getColorsMessage: 'Getting all colors...',
      };
    }
    case 'GET_COLOR_REJECTED': {
      return {
        ...state,
        getColorsError: true,
        getColorsPending: false,
        getColorsMessage: 'Get all colors error',
      };
    }
    case 'GET_COLOR_FULFILLED': {
      return {
        ...state,
        colors: action.payload.data.results,
        colorsPageInfo: action.payload.data.pageInfo,
        getColorsError: true,
        getColorsPending: false,
        getColorsMessage: 'Get all colors success',
      };
    }
    case 'POST_ITEM_PENDING': {
      return {
        ...state,
        postItemSuccess: false,
        postItemError: false,
        postItemPending: true,
        postItemMessage: 'Posting item...',
      };
    }
    case 'POST_ITEM_REJECTED': {
      return {
        ...state,
        postItemSuccess: false,
        postItemError: true,
        postItemPending: false,
        postItemMessage: 'Post item rejected',
      };
    }
    case 'POST_ITEM_FULFILLED': {
      return {
        ...state,
        postItemSuccess: true,
        postItemError: false,
        postItemPending: false,
        postItemMessage: 'Post item fulfilled',
      };
    }
    case 'GET_SELLER_ITEM_PENDING': {
      return {
        ...state,
        getDataSuccess: false,
        getDataError: false,
        getDataPending: true,
        getDataMessage: 'Getting items...',
      };
    }
    case 'GET_SELLER_ITEM_REJECTED': {
      return {
        ...state,
        getDataSuccess: false,
        getDataError: true,
        getDataPending: false,
        getDataMessage: 'Get Item rejected',
      };
    }
    case 'GET_SELLER_ITEM_FULFILLED': {
      return {
        ...state,
        getDataSuccess: true,
        getDataError: false,
        getDataPending: false,
        sellerProducts: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
        getDataMessage: 'Success getItem',
      };
    }
    case 'LOGOUT': {
      return {
        ...initialState,
      };
    }
    case 'CLEAR': {
      return {
        ...state,
        getDataSuccess: false,
        getDataError: false,
        getDataPending: false,

        postItemSuccess: false,
        postItemError: false,
        postItemPending: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
