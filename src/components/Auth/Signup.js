import React, { Component } from 'react'
import { Alert, Button, Form, Input, Label, FormGroup, Container, ButtonGroup, Modal } from 'reactstrap'
import {connect} from 'react-redux'
import {ReactComponent as Logo} from '../../Assets/icons/icon.svg'
import {Link} from 'react-router-dom'
import signup from '../../redux/actions/signup'
import { Formik, Field } from "formik"
import * as Yup from "yup"
import '../../Assets/style/Form.css'
import Loading from '../Loading'

const schemaCustomer = Yup.object().shape({
  name: Yup.string()
    .required("Name is required!.")
    .min(1, "Name is too short."),
  email: Yup.string().email("Input the right format!").required("Email is Required."),
  password: Yup.string()
    .required("Input your password!")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
});

const schemaSeller = Yup.object().shape({
  name: Yup.string()
    .required("Name is required!.")
    .min(1, "Name is too short."),
  email: Yup.string().email("Input the right format!").required("Email is Required."),
  password: Yup.string()
    .required("Input your password!")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  phone: Yup.string()
    .required("Phone must be provided!")
    .matches(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i, "Input right phone number format!"),
  storeName: Yup.string()
    .required("Store Name is required!.")
    .min(1, "Store Name is too short."),
});

class Login extends Component {
  state ={
    params: 'customer',
    custBtn: false,
    sellerBtn: true
  }

  signupHandler = (values)=>{
    const {email, password, name, phone, storeName: store_name} = values
    const {params} = this.state
    console.log(params)
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

  toggleRole = (params, e)  =>{
    console.log(params)
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

  componentDidUpdate(prevProps, prevState){
    console.log(this.state.params)
    if (prevProps.signup.isError !== this.props.signup.isError) {
      if (this.props.signup.isError) {
        alert(this.props.signup.alertMsg)
        this.props.clearState()
      }
    }
    if (this.props.signup.userIsCreated) {
      alert('sign up successful!')
      this.props.signup.userIsCreated && this.props.history.push('/login')
    }
  }


  render() {
    return (
      <React.Fragment style={{height:'100vh', position: 'relative'}} className='position-relative'>
        
        {this.props.signup.isLoading ? <Loading /> : null}

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
            <Formik
              initialValues={
                this.state.params==='seller'?
                {
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                  storeName: ""
                } :
                {
                  name: "",
                  email: "",
                  password: ""
                }
              }
              validationSchema={this.state.params==='seller' ? schemaSeller : schemaCustomer}
              validateOnBlur
              onSubmit={(values) => {
                console.log(values)
                this.signupHandler(values)
              }}
            >
              {(props) => {
                const {
                  touched,
                  errors,
                  handleSubmit,
                  values,
                  handleChange,
                  handleBlur,
                } = props;

                return (

              <Form>
                <FormGroup className='mt-1'>
                  <Input
                    tag={Field}
                    value={values.name}
                    onChange={handleChange}
                    type="name"
                    name="name"
                    id="name"
                    placeholder='Name'
                    onBlur={handleBlur}/>
                  {errors.name || touched.name ? (
                    <div className="error-form">{errors.name}</div>
                  ) : null}
                </FormGroup>
                <FormGroup className='mt-1'>
                  <Input
                    tag={Field}
                    value={values.email}
                    onChange={handleChange}
                    onBlir={handleBlur}
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Email' />
                  {errors.email || touched.email ? (
                    <div className="error-form">{errors.email}</div>
                  ) : null}
                </FormGroup>
              
                  {(!this.state.sellerBtn) ? 
                    (<div>
                      <FormGroup className='mt-1'>
                        <Input
                          tag={Field}
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="name"
                          name="phone"
                          id="phone"
                          placeholder='Phone Number'
                        />
                        {errors.phone || touched.phone ? (
                          <div className="error-form">{errors.phone}</div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className='mt-1'>
                        <Input
                          tag={Field}
                          value={values.storeName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="name"
                          name="storeName"
                          id="storeName"
                          placeholder='Store Name'
                        />
                        {errors.storeName || touched.storeName ? (
                          <div className="error-form">{errors.storeName}</div>
                        ) : null}
                      </FormGroup>
                    </div>) : null}
                    
                <FormGroup className='mt-1'>
                  <Input
                    tag={Field}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    name="password"
                    id="password"
                    placeholder='Password'
                  />
                  {errors.password || touched.password ? (
                    <div className="error-form">{errors.password}</div>
                  ) : null}
                </FormGroup>
                <div className='text-right'><Link to='/' className='ml-auto'>Forgot Password</Link></div>
                <Button onClick={handleSubmit} type='submit' className='mt-2 rounded-pill' block color='success'>Register</Button>
              </Form>
              )}}
            </Formik>
            <div className='text-center my-3'>Already have Tuku account? <span><Link to='/login'>Login!</Link></span></div>
          </Container>

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({signup: state.signup})

const mapDispatchToProps = {
  createUser: signup.createUser,
  clearState: signup.clearState
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)