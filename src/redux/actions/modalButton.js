import services from '../../helpers/services'

export default {
  openAddressNew: ()=>({
    type: 'MODAL_NEW_ADDRESS_OPEN'
  }),
  closeAddressNew: () => ({
    type: 'MODAL_NEW_ADDRESS_CLOSE'
  }),
  openAddressEdit: (token,id) => ({
    type: 'MODAL_EDIT_ADDRESS_OPEN',
    payload: services(token).get('/mycart/'+id)
  }),
  closeAddressEdit: () => ({
    type: 'MODAL_EDIT_ADDRESS_CLOSE'
  })
}