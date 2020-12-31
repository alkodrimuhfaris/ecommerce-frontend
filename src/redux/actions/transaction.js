import qs from 'qs';
import services from '../../helpers/services';

export default {
  getAllTransaction: (token, query = {}) => ({
    type: 'GET_TRANSACTION',
    payload: services(token).get(`/transaction/all?${qs.stringify(query)}`),
  }),
  getTransactionById: (token, id) => ({
    type: 'GET_TRANSACTION_ID',
    payload: services(token).get(`/transaction/all/${id}`),
  }),
  payTransaction: (token, id) => ({
    type: 'PAY_TRANSACTION',
    payload: services(token).post(`/checkout/commit/payment/${id}`),
  }),
  clearNotifTransaction: () => ({
    type: 'CLEAR_TRANSACTION_NOTIF',
  }),
  topUp: (token, nominal = 0) => ({
    type: 'TOP_UP',
    payload: services(token).post(
      `/users/balance/topup`,
      qs.stringify({nominal}),
    ),
  }),
  clearNotifTopUp: () => ({
    type: 'CLEAR_TOPUP_NOTIF',
  }),
};
