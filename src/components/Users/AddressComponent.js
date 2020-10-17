import React, { useEffect, useState } from 'react'
import { Input, Col, Row, Media, Nav, NavItem, Button, Form, FormGroup, Label, FormText } from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import addressAction from '../../redux/actions/address'
import EditAddress from './EditAddress'
import NewAddress from './NewAddress'
import modalButton from '../../redux/actions/modalButton'


export default function AddressComponents() {
  const token = useSelector(state => state.auth.token)
  const address = useSelector(state => state.address.addressData)
  const getAddressSuccess = useSelector(state => state.address.success)
  const newOpen = useSelector(state => state.modalButton.modalNewAddress)
  const editOpen = useSelector(state => state.modalButton.modalEditAddress)
  const dispatch = useDispatch()


  useEffect(()=>{
    (!address.length || !getAddressSuccess) && dispatch(addressAction.getAddress(token))
  },[address, token, getAddressSuccess])

  const modalEdit = id => {
    dispatch(modalButton.openAddressEdit(token, id))
  }

  const modalNew = id => {
    dispatch(modalButton.openAddressNew())
  }

  return (
    <React.Fragment>
      <Row>
        <Button onClick={() => modalNew()} className='btn-custom w-100 h6 text-secondary'>
          <Col xs='12' style={{border:'1px dashed', height:'5em'}} className='my-3 py-3 position-relative border-secondary rounded'>
            <div className='img-center'>
              Add new address
            </div>
          </Col>
        </Button>
        {
          address.length &&
          address.map(item => {
            return (
              <Col xs='12' className='mb-3 py-3  rounded border border-success'>
                <div className='my-2 h6'>
                  {item.address_name}
                </div>
                <div className='my-2'>
                  {item.address.concat(' '+item.city).concat(' '+item.postal_code)}
                </div>
                <Button onClick={() => modalEdit(item.id)} className='btn-custom my-2 text-success stretched-link'>
                  <strong>Change Address</strong>
                </Button>
              </Col>
            )
          })
        }
        <NewAddress/>
        <EditAddress/>
      </Row>
    </React.Fragment>
  )
}
