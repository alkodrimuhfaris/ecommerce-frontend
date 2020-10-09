import React, { Component } from 'react'
import { Alert, Button, Form, Input, Label, FormGroup, Container, ButtonGroup } from 'reactstrap'
import {connect} from 'react-redux'
import {ReactComponent as Logo} from '../../Assets/icons/icon.svg'
import {Link} from 'react-router-dom'
import auth from '../../redux/actions/auth'

class Login extends Component {
  state ={
    email: '',
    password: '',
    params: 'customer',
    custBtn: false,
    sellerBtn: true
  }
  login = (e)=>{
    e.preventDefault()
    const {email} = this.state
    const data = {
      email
    }
    this.props.forgotPass(data, params)
    this.props.history.push('/')
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

  componentDidMount(){
    console.log(this.state.params)
    console.log(this.props)
  }


  render() {
    return (
      <React.Fragment style={{height:'100vh'}} className='position-relative'>
        <Container style={{width:400, top:'50%', left:'50%', transform: `translateX(-50%) translateY(-50%)`}} className='position-absolute'>
            <div className='d-flex align-items-center flex-column'>
              <Logo/>
              <div className='text-center my-4 h6'>Reset password</div>
            </div>
            
            <Form onSubmit={this.login}>
              <FormGroup className='mt-2'>
                <Input value={this.state.email} onChange={this.onChangeText} type="email" name="email" id="email" placeholder='Email' />
              </FormGroup>
              <Button type='submit' className='mt-2 rounded-pill' block color='success'>Login</Button>
            </Form>
            <div className='text-center my-3'>Don't have a Tuku account? <span><Link to='/signup'>Register!</Link></span></div>
          </Container>

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({auth: state.auth})

const mapDispatchToProps = {
  login: auth.login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
