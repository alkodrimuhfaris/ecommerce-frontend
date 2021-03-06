import {combineReducers} from 'redux';

import auth from './auth';
import signup from './signup';
import profile from './profile';
import items from './items';
import cart from './cart';
import address from './address';
import modalButton from './modalButton';
import home from './home';
import admin from './admin';
import adminDelete from './adminDelete';
import adminUpdate from './adminUpdate';
import searchQuery from './searchQuery';
import category from './category';
import password from './password';
import deleteAddress from './deleteAddress';
import deleteCart from './deleteCart';
import getCheckout from './getCheckout';
import checkoutData from './checkoutData';
import deliveryFee from './deliveryFees';
import processPayment from './processPayment';
import cartToCheckout from './cartToCheckout';
import getCategories from './getCategories';
import allTransaction from './allTransaction';
import detailTransaction from './detailTransaction';
import payTransaction from './payTransaction';
import topUp from './topUp';

export default combineReducers({
  auth,
  signup,
  profile,
  items,
  cart,
  address,
  modalButton,
  home,
  admin,
  adminDelete,
  adminUpdate,
  searchQuery,
  category,
  password,
  deleteAddress,
  deleteCart,
  getCheckout,
  checkoutData,
  deliveryFee,
  processPayment,
  cartToCheckout,
  getCategories,
  allTransaction,
  detailTransaction,
  payTransaction,
  topUp,
});
