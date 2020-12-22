const initialState = {
  allCategories: [],
  pageInfoCategories: {},
  categoriesIsLoading: false,
  categoriesIsError: false,
  categoriesMessage: '',

  category: {},
  items: [],
  categoryPageInfo: {},
  categoryIsPending: false,
  categoryhIsError: false,
  categoryMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_PENDING': {
      return {
        ...state,
        categoriesIsLoading: true,
        categoriesIsError: false,
        categoriesMessage: 'Getting detail categories',
      };
    }
    case 'GET_CATEGORIES_REJECTED': {
      return {
        ...state,
        categoriesIsLoading: false,
        categoriesIsError: true,
        categoriesMessage: 'Get detail category rejected',
      };
    }
    case 'GET_CATEGORIES_FULFILLED': {
      return {
        ...state,
        allCategories: action.payload.data.results,
        pageInfoCategories: action.payload.data.pageInfo,
        categoriesIsLoading: false,
        categoriesIsError: false,
        categoriesMessage: 'Get category success',
      };
    }
    case 'GET_CATEGORY_DETAIL_PENDING': {
      return {
        ...state,
        categoryIsPending: true,
        categoryhIsError: false,
        categoryMessage: 'Getting category detail...',
      };
    }
    case 'GET_CATEGORY_DETAIL_REJECTED': {
      return {
        ...state,
        categoryIsPending: false,
        categoryhIsError: true,
        categoryMessage: 'Get category detail is error',
      };
    }
    case 'GET_CATEGORY_DETAIL_FULFILLED': {
      return {
        ...state,
        category: action.payload.data.category,
        items: action.payload.data.items,
        categoryPageInfo: action.payload.data.pageInfo,
        categoryIsPending: false,
        categoryhIsError: true,
        categoryMessage: 'Get category detail is success',
      };
    }
    default: {
      return state;
    }
  }
};
