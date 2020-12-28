import jwtDecode from 'jwt-decode';

const initialState = {
  isLogin: false,
  isError: false,
  isLoading: false,
  alertMsg: '',
  token: '',
  isSeller: false,
  id: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'AUTH_USER_LOGIN_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: false,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'AUTH_USER_LOGIN_FULFILLED': {
      const {message, token} = action.payload.data;
      const {role_id, id} = jwtDecode(token);
      const isSeller = role_id === 3;
      console.log(isSeller);
      localStorage.setItem('token', token);
      localStorage.setItem('isSeller', isSeller);
      localStorage.setItem('id', id);
      if (token) {
        return {
          isLogin: true,
          isError: false,
          alertMsg: message,
          isLoading: false,
          token,
          isSeller,
          id,
        };
      }
      return {
        ...state,
        isLogin: false,
        isError: true,
        alertMsg: message,
        isLoading: false,
      };
    }
    case 'AUTH_USER_LOGOUT': {
      localStorage.removeItem('token');
      localStorage.removeItem('isSeller');
      localStorage.removeItem('id');
      return {
        ...state,
        isLogin: false,
        isError: false,
        alertMsg: 'log out successfully!',
        isLoading: false,
        token: '',
        id: 0,
        isSeller: false,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        alertMsg: '',
      };
    }
    case 'SET_TOKEN': {
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        isSeller: action.payload.isSeller,
        id: action.payload.id,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
