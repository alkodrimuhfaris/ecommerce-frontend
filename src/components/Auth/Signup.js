import React, { Component } from 'react'
import { Alert, Button, Form, Input, Label, FormGroup, Container, ButtonGroup } from 'reactstrap'
import {connect} from 'react-redux'
import {ReactComponent as Logo} from '../../Assets/icons/icon.svg'
import {Link} from 'react-router-dom'
import signup from '../../redux/actions/signup'

class Login extends Component {
  state ={
    name: '',
    email: '',
    phone: '',
    store_name: '',
    password: '',

    params: 'customer',
    custBtn: false,
    sellerBtn: true
  }
  signupHandler = (e)=>{
    e.preventDefault()
    const {email, password, name, phone, store_name, params} = this.state
    let data={}
    if (params==='customer') {
      data = {
        name,
        email,
        password,
      }
    } else if (params==='seller') {
      data = {
        name,
        email,
        password,
        store_name,
        phone
      }
    }
    this.props.createUser(data, params)
  }
  onChangeText = (e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  toggleRole = (params, e)  =>{
    e.preventDefault()
    if (params==='customer'){
      this.setState({
        params,
        custBtn: false,
        sellerBtn: true
      })
    } else if (params==='seller') {
      this.setState({
        params,
        custBtn: true,
        sellerBtn: false
      })
    }
  }

  componentDidUpdate(){
    console.log('compenent did mount')
    console.log(this.props)
    this.props.signup.userIsCreated && this.props.history.push('/login')
  }


  render() {
    return (
      <React.Fragment style={{height:'100vh'}} className='position-relative'>
        <Container style={{width:400, top:'50%', left:'50%', transform: `translateX(-50%) translateY(-50%)`}} className='position-absolute'>
            <div className='d-flex align-items-center flex-column'>
              <Logo style={{marginTop: 400}}className='mt-5'/>
              <div className='text-center my-4 h6'>Please Log in with your Account</div>
            </div>
            
            <div className='d-flex align-items-center flex-column'>
              <ButtonGroup className='mx-auto my-4'>
                <Button style={{width:100}} color='success' outline={this.state.custBtn} onClick={ e => this.toggleRole('customer', e)}>Customer</Button>
                <Button style={{width:100}} color='success' outline={this.state.sellerBtn} onClick={e => this.toggleRole('seller', e)}>Seller</Button>
              </ButtonGroup>
            </div>

            <Form onSubmit={this.signupHandler}>
              <FormGroup className='mt-1'>
                <Input value={this.state.name} onChange={this.onChangeText} type="name" name="name" id="name" placeholder='Name' />
              </FormGroup>
              <FormGroup className='mt-1'>
                <Input value={this.state.email} onChange={this.onChangeText} type="email" name="email" id="email" placeholder='Email' />
              </FormGroup>

                {(!this.state.sellerBtn) && 
                  <div>
                    <FormGroup className='mt-1'>
                      <Input value={this.state.phone} onChange={this.onChangeText} type="number" name="phone" id="phone" placeholder='Phone Number' />
                    </FormGroup>
                    <FormGroup className='mt-1'>
                      <Input value={this.state.store_name} onChange={this.onChangeText} type="name" name="store_name" id="store_name" placeholder='Store Name' />
                    </FormGroup>
                  </div>}
                  
              <FormGroup className='mt-1'>
                <Input value={this.state.password} onChange={this.onChangeText} type="password" name="password" id="password" placeholder='Password' />
              </FormGroup>
              <div className='text-right'><Link to='/' className='ml-auto'>Forgot Password</Link></div>
              <Button type='submit' className='mt-2 rounded-pill' block color='success'>Register</Button>
            </Form>
            <div className='text-center my-3'>Already have Tuku account? <span><Link to='/login'>Login!</Link></span></div>
          </Container>

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({signup: state.signup})

const mapDispatchToProps = {
  createUser: signup.createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)