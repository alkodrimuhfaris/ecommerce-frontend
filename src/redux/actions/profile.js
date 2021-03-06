import services from '../../helpers/services';

export default {
  getProfile: (token) => ({
    type: 'GET_PROFILE',
    payload: services(token).get('/users'),
  }),
  patchProfile: (token, data) => ({
    type: 'PATCH_PROFILE',
    payload: services(token).patch('/users', data),
  }),
  deleteAvatar: (token) => ({
    type: 'DELETE_AVATAR',
    payload: services(token).delete('/users/avatar'),
  }),
  clearState: () => ({
    type: 'CLEAR_STATE',
  }),
};
