import React, { Component } from 'react'
import { Alert, Button, Form, Input, Label, FormGroup, Container, ButtonGroup } from 'reactstrap'
import {connect} from 'react-redux'
import {ReactComponent as Logo} from '../../Assets/icons/icon.svg'
import {Link} from 'react-router-dom'
import auth from '../../redux/actions/auth'
import signup from '../../redux/actions/signup'
import profile from '../../redux/actions/profile'
import StarRating from '../StarRating'

class Login extends Component {
  state ={
    email: '',
    password: '',
    params: 'customer',
    custBtn: false,
    sellerBtn: true,
    signUpAlert: false
  }
  login = (e)=>{
    e.preventDefault()
    const {email, password, params} = this.state
    const data = {
      email,
      password
    }
    this.props.login(data, params)
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
    console.log(this.state)
    let {state} = this.props.location
    // console.log(state)
    // if(state){
    //   console.log('state is true')
    //   return this.props.history.replace(state.from.pathname)
    // }
    const path = state ? state.from.pathname : '/'
    this.props.auth.isLogin && this.props.history.push(state.from.pathname)
    this.state.signUpAlert && setTimeout(() => {
      this.setState({
          signUpAlert: false
      })
    }, 3000)
  }

  componentDidMount(){
    this.state.signUpAlert && setTimeout(() => {
      this.setState({
          signUpAlert: false
      })
   }, 3000)
  }


  render() {
    const {auth, signup} = this.props
    return (
      <React.Fragment style={{height:'100vh'}} className='position-relative'>
        <Container style={{width:400, top:'50%', left:'50%', transform: `translateX(-50%) translateY(-50%)`}} className='position-absolute'>
            <div className='d-flex align-items-center flex-column'>
              <Logo/>
              <div className='text-center my-4 h6'>Please Log in with your Account</div>
            </div>

            <div className='d-flex align-items-center flex-column'>
              <ButtonGroup className='mx-auto my-4'>
                <Button style={{width:100}} color='success' outline={this.state.custBtn} onClick={ e => this.toggleRole('customer', e)}>Customer</Button>
                <Button style={{width:100}} color='success' outline={this.state.sellerBtn} onClick={e => this.toggleRole('seller', e)}>Seller</Button>
              </ButtonGroup>
            </div>

            <Alert color={auth.isError?'danger':'success'} isOpen={auth.isError || auth.alertMsg!==''}>{auth.alertMsg}</Alert>
            <Alert color={signup.isError?'danger':'success'} isOpen={this.state.signUpAlert}>{signup.alertMsg}</Alert>

            <Form onSubmit={this.login}>
              <FormGroup className='mt-2'>
                <Input value={this.state.email} onChange={this.onChangeText} type="email" name="email" id="email" placeholder='Email' />
              </FormGroup>
              <FormGroup className='mt-2'>
                <Input value={this.state.password} onChange={this.onChangeText} type="password" name="password" id="password" placeholder='Password' />
              </FormGroup>
              <div className='text-right'><Link to='/' className='ml-auto'>Forgot Password</Link></div>
              <Button type='submit' className='mt-2 rounded-pill' block color='success'>Login</Button>
            </Form>
            <div className='text-center my-3'>Don't have a Tuku account? <span><Link to='/signup'>Register!</Link></span></div>
          </Container>

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({auth: state.auth, signup: state.signup})

const mapDispatchToProps = {
  login: auth.login,
  clearState: signup.clearState
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
