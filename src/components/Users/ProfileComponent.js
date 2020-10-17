import React, { useEffect, useState } from 'react'
import { Input, Col, Row, Media, Nav, NavItem, Button, Form, FormGroup, Label, FormText } from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import profileAction from '../../redux/actions/profile'


export default function Profile(props) {
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.profile.userData)
  const userUpdated = useSelector(state => state.profile.isUpdated)
  const dispatch = useDispatch()
  const formData = new FormData()

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[phone, setPhone] = useState(0)
  const[gender, setGender] = useState('male')
  const[birthdate, setBirthdate] = useState('')
  const[avatar, setAvatar] = useState(null)
  const[showAvatar, setShowAvatar] = useState('')

  useEffect(()=>{
    !Object.keys(user).length && dispatch(profileAction.getProfile(token))
    setName(user.name)
    setEmail(user.email)
    setPhone(user.phone)
    setGender(user.gender)
    setBirthdate(user.birthdate)
    setShowAvatar(user.avatar && process.env.REACT_APP_URL_BACKEND+'/'+user.avatar)
    console.log(token)
    console.log(user)
  },[dispatch, token, user, userUpdated])

  const saveChange = e => {
    e.preventDefault()
    let dataForm ={
      name, email, phone, gender, birthdate
    }
    console.log(dataForm)
    Object.values(dataForm).filter(item => item).length && dispatch(profileAction.patchProfile(token, dataForm))
    avatar && formData.append('avatar', avatar)
    avatar && dispatch(profileAction.patchProfile(token, formData))
    avatar && setAvatar(null)
  }
  return (
    <React.Fragment>
        <Form className='my-3' onSubmit={saveChange}>
          <Row>
            <Col xs='12' md='8' className ='mb-3'>
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
                <Col sm={9} className='d-flex'>
                {['male', 'female'].map((item,i) => {
                  return(
                    <FormGroup className={i>0 && 'ml-4'} check>
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
                  <Media object src={showAvatar || 'https://via.placeholder.com/130' }
                  className='img-fluid position-absolute rounded-circle img-fluid'
                  style={{top:'50%', left:'50%', transform:'translate(-50%, -50%)'}} />
                </Media>
                <Media body className='my-3'>
                  <label className='btn btn-outline-secondary rounded-pill'>
                    <span>Select File</span>
                    <Input onChange={e => setAvatar(e.target.files[0])} type='file' accept='.jpg,.jpeg,.png' style={{display:'none'}}/>
                  </label>
                </Media>
              </Media>
            </Col>
          </Row>
        </Form>
    </React.Fragment>
  )
}
