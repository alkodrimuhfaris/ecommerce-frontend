import React, { useEffect, useState } from 'react'
import NavBarClient from '../NavBarClient';
import { Input, Col, Row, Media, Nav, NavItem, Button, Form, FormGroup, Label, FormText } from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import profileAction from '../../redux/actions/profile'
import {FaPencilAlt} from 'react-icons/fa'


export default function Profile(props) {
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.profile.userData)
  const userUpdated = useSelector(state => state.profile.isUpdated)
  const dispatch = useDispatch()

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[phone, setPhone] = useState(0)
  const[gender, setGender] = useState('male')
  const[birthdate, setBirthdate] = useState('')
  const[dataForm, setDataForm] = useState({})

  useEffect(()=>{
    dispatch(profileAction.getProfile(token))
    setName(user.name)
    setEmail(user.email)
    setPhone(user.phone)
    setGender(user.gender)
    setBirthdate(user.birthdate)
  },[dispatch, token, userUpdated])

  useEffect(()=>{
    setDataForm(
      name, email, phone, gender, birthdate
    )
  },[name, email, phone, gender, birthdate])

  const updateUser = e => {
    e.preventDefault()
    
  }

  return (
    <React.Fragment>
      <NavBarClient className='shadow' />
        <Row style={{width:'100vw', height: 'calc(100vh - 5em)', margin:'0'}}>
          <Col xs='2' md='3'  className='overflow-scroll py-2 px-4'>
            <Media className='align-items-center my-3'>
              <Media left>
                <Media object src='https://via.placeholder.com/50' className='rounded-circle img-fluid' />
              </Media>
              <Media body className='ml-3'>
                <div className='strong h5'>
                  Syamsul Bahrudin
                </div>
                <div className='text-muted small'>
                  <span><FaPencilAlt/></span> Ubah profil
                </div>
              </Media>
            </Media>
            <Nav vertical>
              <NavItem>
                <Media className='align-items-center my-1'>
                  <Media left>
                    <Media object src='https://via.placeholder.com/25' className='rounded-circle' />
                  </Media>
                  <Media body className='ml-2'>
                    <div className='small strong'>My account</div>
                  </Media>
                </Media>
              </NavItem>
              <NavItem>
                <Media className='align-items-center my-1'>
                  <Media left>
                    <Media object src='https://via.placeholder.com/25' className='rounded-circle' />
                  </Media>
                  <Media body className='ml-2'>
                    <div className='small strong'>My account</div>
                  </Media>
                </Media>
              </NavItem>
              <NavItem>
                <Media className='align-items-center my-1'>
                  <Media left>
                    <Media object src='https://via.placeholder.com/25' className='rounded-circle' />
                  </Media>
                  <Media body className='ml-2'>
                    <div className='small strong'>My account</div>
                  </Media>
                </Media>
              </NavItem>
            </Nav>
          </Col>
          <Col xs='10' md='9' style={{backgroundColor:'#f5f5f5'}} className='overflow-scroll p-5'>
            <div className='w-100 h-100 p-5 overflow-auto' style={{backgroundColor:'#fff'}}>
              <div className='border-bottom pb-3'>
                <div className='h4'>My profile</div>
                <div className='text-muted small'>Manage your profile information</div>
              </div>
              <Form className='my-3'>
                <Row>
                  <Col xs='12' md='8'>
                    <FormGroup row>
                      <Label className='text-right' for="name" sm={3}>Name</Label>
                      <Col sm={9}>
                        <Input type="name" name="name" id="name" placeholder="Name" 
                        value={name} onChange={(e) => setName(e.target.value)}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className='text-right' for="email" sm={3}>Email</Label>
                      <Col sm={9}>
                        <Input type="email" name="email" id="email" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className='text-right' for="phone" sm={3}>Phone Number</Label>
                      <Col sm={9}>
                        <Input type="number" name="phone" id="phone" placeholder="Phone Number" 
                        value={phone} onChange={(e) => setPhone(e.target.value)}/>
                      </Col>
                    </FormGroup>
                    <FormGroup tag="fieldset" row>
                      <Col sm={3} className='text-right'>Gender</Col>
                      <Col sm={4} className='d-flex justify-content-between'>
                      {['male', 'female'].map(item => {
                        return(
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio" 
                              value={item} checked={item===gender} onChange={e => setGender(e.target.value)}/><span>{item}</span>
                            </Label>
                          </FormGroup>
                        )
                      }) }
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className='text-right' for="birthdate" sm={3}>Date of birth</Label>
                      <Col sm={9}>
                        <Input type="date" name="birthdate" id="birthdate" placeholder="Date of birth"
                        value={birthdate} onChange={e => setBirthdate(e.target.value)} />
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 9, offset: 3 }}>
                        <Button color='success' type='submit' className='rounded-pill'>Submit</Button>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xs='12' md='4'>
                    <Media className='flex-column align-items-center'>
                      <Media top className='rounded-circle position-relative'
                      style={{width:'7em', height:'7em'}}>
                        <Media object src='https://via.placeholder.com/130' 
                        className='img-fluid position-absolute rounded-circle img-fluid'
                        style={{top:'50%', left:'50%', transform:'translate(-50%, -50%)'}} />
                      </Media>
                      <Media body className='my-3'>
                        <label className='btn btn-outline-secondary rounded-pill'>
                          <span>Select File</span>
                          <Input type='file' accept='.jpg,.jpeg,.png' style={{display:'none'}}/>
                        </label>
                      </Media>
                    </Media>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
    
    </React.Fragment>
  )
}
