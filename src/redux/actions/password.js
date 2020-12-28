import qs from 'qs';
import services from '../../helpers/services';

export default {
  changePassword: (token, data) => ({
    type: 'CHANGE_PASSWORD',
    payload: services(token).post('/users/password', qs.stringify(data)),
  }),
  clearState: () => ({
    type: 'CLEAR_STATE_PASS',
  }),
};
