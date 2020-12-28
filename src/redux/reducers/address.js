const initialState = {
  addressData: [],
  getAddressSuccess: false,
  getAddressError: false,
  getAddressPending: false,
  getAddressMessage: '',

  updateAddressSuccess: false,
  updateAddressError: false,
  updateAddressPending: false,
  updateAddressMessage: '',

  createAddressSuccess: false,
  createAddressError: false,
  createAddressPending: false,
  createAddressMessage: '',

  getProvinceSuccess: false,
  getProvinceError: false,
  getProvincePending: false,
  getProvinceMessage: '',
  provinceData: [],

  getCitySuccess: false,
  getCityError: false,
  getCityPending: false,
  getCityMessage: '',
  cityData: [],

  getAddressIdPending: false,
  getAddressIdError: false,
  getAddressIdSuccess: false,
  getAddressIdMessage: '',
  addressDetail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROVINCE_PENDING': {
      return {
        ...state,
        getProvinceSuccess: false,
        getProvinceError: false,
        getProvincePending: true,
        getProvinceMessage: 'Getting all of the province',
      };
    }
    case 'GET_PROVINCE_REJECTED': {
      return {
        ...state,
        getProvinceSuccess: false,
        getProvinceError: true,
        getProvincePending: false,
        getProvinceMessage: 'Get all of the province error',
      };
    }
    case 'GET_PROVINCE_FULFILLED': {
      return {
        ...state,
        getProvinceSuccess: true,
        getProvinceError: false,
        getProvincePending: false,
        getProvinceMessage: 'Get all of the province success',
        provinceData: action.payload.data.results,
      };
    }
    case 'GET_CITY_PENDING': {
      return {
        ...state,
        getCitySuccess: false,
        getCityError: false,
        getCityPending: true,
        getCityMessage: 'Getting city...',
      };
    }
    case 'GET_CITY_REJECTED': {
      return {
        ...state,
        getCitySuccess: false,
        getCityError: true,
        getCityPending: false,
        getCityMessage: 'Get city rejected',
      };
    }
    case 'GET_CITY_FULFILLED': {
      return {
        ...state,
        getCitySuccess: true,
        getCityError: false,
        getCityPending: false,
        getCityMessage: 'Get city success',
        cityData: action.payload.data.results,
      };
    }
    case 'GET_ADDRESS_PENDING': {
      return {
        ...state,
        getAddressSuccess: false,
        getAddressError: false,
        getAddressPending: true,
        getAddressMessage: 'Getting address...',
      };
    }
    case 'GET_ADDRESS_REJECTED': {
      return {
        ...state,
        getAddressSuccess: false,
        getAddressError: true,
        getAddressPending: false,
        getAddressMessage: 'There is an error when getting address',
      };
    }
    case 'GET_ADDRESS_FULFILLED': {
      const {results, message} = action.payload.data;
      return {
        ...state,
        getAddressSuccess: true,
        getAddressError: false,
        getAddressPending: false,
        getAddressMessage: message,
        addressData: results,
      };
    }
    case 'PATCH_ADDRESS_PENDING': {
      return {
        ...state,
        updateAddressSuccess: false,
        updateAddressError: false,
        updateAddressPending: true,
        updateAddressMessage: 'Updating address...',
      };
    }
    case 'PATCH_ADDRESS_REJECTED': {
      return {
        ...state,
        updateAddressSuccess: false,
        updateAddressError: true,
        updateAddressPending: false,
        updateAddressMessage: 'there is an error patching the data',
      };
    }
    case 'PATCH_ADDRESS_FULFILLED': {
      const {success, message} = action.payload.data;
      if (success) {
        return {
          ...state,
          updateAddressSuccess: true,
          updateAddressError: false,
          updateAddressPending: false,
          updateAddressMessage: message,
        };
      }
      return {
        ...state,
        updateAddressSuccess: false,
        updateAddressError: true,
        updateAddressPending: false,
        updateAddressMessage: 'there is an error',
      };
    }
    case 'POST_NEW_ADDRESS_PENDING': {
      return {
        ...state,
        createAddressSuccess: false,
        createAddressError: false,
        createAddressPending: true,
        createAddressMessage: 'Creating address...',
      };
    }
    case 'POST_NEW_ADDRESS_REJECTED': {
      return {
        ...state,
        createAddressSuccess: false,
        createAddressError: true,
        createAddressPending: false,
        createAddressMessage: 'there is an error patching the data',
      };
    }
    case 'POST_NEW_ADDRESS_FULFILLED': {
      const {success, message} = action.payload.data;
      if (success) {
        return {
          ...state,
          createAddressSuccess: true,
          createAddressError: false,
          createAddressPending: false,
          createAddressMessage: message,
        };
      }
      return {
        ...state,
        createAddressSuccess: false,
        createAddressError: true,
        createAddressPending: false,
        createAddressMessage: 'There is an error on creating address',
      };
    }
    case 'GET_ADDRESS_ID_PENDING': {
      return {
        ...state,
        getAddressIdPending: true,
        getAddressIdError: false,
        getAddressIdSuccess: false,
        getAddressIdMessage: 'Getting detail address...',
      };
    }
    case 'GET_ADDRESS_ID_REJECTED': {
      return {
        ...state,
        getAddressIdPending: false,
        getAddressIdError: true,
        getAddressIdSuccess: false,
        getAddressIdMessage: 'Get detail address failed',
      };
    }
    case 'GET_ADDRESS_ID_FULFILLED': {
      return {
        ...state,
        getAddressIdPending: false,
        getAddressIdError: false,
        getAddressIdSuccess: true,
        getAddressIdMessage: 'Get detail address success',
        addressDetail: action.payload.data.result,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
