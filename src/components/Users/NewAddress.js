import React, { useEffect, useState } from 'react'
import { CustomInput, Input, Col, Row, Modal, Button, Form, FormGroup, Label } from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import addressAction from '../../redux/actions/address'
import {AiOutlineClose} from 'react-icons/ai'
import modalAction from '../../redux/actions/modalButton'


export default function ModalNew() {
  const token = useSelector(state => state.auth.token)
  const open = useSelector(state => state.modalButton.modalNewAddress)
  const isCreated = useSelector(state => state.address.isAdded)
  const dispatch = useDispatch()
  const formData = new FormData()

  // const address = {
  //   "id": 19,
  //   "user_id": 35,
  //   "address_name": "Address that i want to get rid off",
  //   "recipient_name": "Iga si Iguana",
  //   "phone": 89633449007,
  //   "city": "Palembang",
  //   "address": "Jalan Kancil Putih No 14 A",
  //   "postal_code": 14321,
  //   "maps_pin_point": null,
  //   "created_at": "2020-10-17T07:15:33.000Z",
  //   "updated_at": null,
  //   "primary_address": 1
  // }

  const close = () => {
    dispatch(modalAction.closeAddressNew())
  }

  const save = () => {
    dispatch(addressAction.postAddress(token))
  }

  useEffect(()=>{
    isCreated ? alert('address is created!') : alert('there is problem creating address')
    isCreated && dispatch(modalAction.closeAddressNew())
  },[isCreated])

  

  return (
    <React.Fragment>
      <Modal isOpen={open}>
        <div className='mr-auto my-2'>
          <Button onClick={() => close()} className='btn-custom'>
            <AiOutlineClose color='secondary'/>
          </Button>
        </div>
        <div className='h3 text-center my-4'>Add new address</div>
        <Row>
          <Form>
            <Col xs='12' className='my-3'>
              <FormGroup>
                <Label for="address_name" className='small text-secondary'>Save address as (ex : home address, office address)</Label>
                <Input type="name" name="address_name" id="address_name"/>
              </FormGroup>
            </Col>
            <Col xs='12' md='6' className='my-3'>
              <FormGroup>
                <Label for="recipient_name" className='small text-secondary'>Recipient’s name</Label>
                <Input type="name" name="recipient_name" id="recipient_name"/>
              </FormGroup>
            </Col>
            <Col xs='12' md='6' className='my-3'>
              <FormGroup>
                <Label for="phone" className='small text-secondary'>Recipient's telephone number</Label>
                <Input type="number" name="phone" id="phone"/>
              </FormGroup>
            </Col>
            <Col xs='12' md='6' className='my-3'>
              <FormGroup>
                <Label for="address" className='small text-secondary'>Address</Label>
                <Input type="name" name="address" id="address"/>
              </FormGroup>
            </Col>
            <Col xs='12' md='6' className='my-3'>
              <FormGroup>
                <Label for="postal_code" className='small text-secondary'>Postal Code</Label>
                <Input type="name" name="postal_code" id="postal_code"/>
              </FormGroup>
            </Col>
            <Col xs='12' md='6' className='my-3'>
              <FormGroup>
                <Label for="city" className='small text-secondary'>City or Subdistrict</Label>
                <Input type="name" name="city" id="city"/>
              </FormGroup>
            </Col>
            <Col xs='12' md='6' className='my-3'>
              <FormGroup row>
                <CustomInput type="primary_address" id="primary_address" color='success' />
                <Label for='primary_address' className='small text-secondary'>Make it the primary address</Label>
              </FormGroup>
            </Col>
            <Col xs='12' md='6' className='d-flex'>
              <Button outline color='secondary' className='rouded-pill text-secondary' onClick={() => close()}>Cancel</Button>
              <Button color='success' className='rouded-pill' onClick={() => save()}>Save</Button>
            </Col>
          </Form>
        </Row>
      </Modal>
    </React.Fragment>
  )
}
