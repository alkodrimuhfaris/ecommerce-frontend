import React from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import brandIcon from '../Assets/icons/icon.svg'
import {ReactComponent as SearchIcon} from '../Assets/icons/searchIcon.svg'
import {ReactComponent as CartIcon} from '../Assets/icons/shopping-cart.svg'
import {ReactComponent as FilterIcon} from '../Assets/icons/filter.svg'
import {ReactComponent as NotificationIcon} from '../Assets/icons/bell.svg'
import {ReactComponent as MessageIcon} from '../Assets/icons/message.svg'

class NavbarClient extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      openNavbar: false,
      searchVal: '',
      queryPage: {}
    }
  }

  searchHandle = (event) => {
    this.setState({
      searchVal: event.target.value,
    })
  }

  searchSubmit = (event) => {
    event.preventDefault()
    let queryPage = {
     ...this.props.queryPage,
     search: this.state.searchVal
    }
  }

  login = e =>{
    e.preventDefault()
    this.props.history.push('/login')
  }

  signup = e => {
    e.preventDefault()
    this.props.history.push('/signup')
  }

  cart = e => {
    e.preventDefault()
    this.props.history.push('/cart')
  }

  cart = e => {
    e.preventDefault()
    this.props.history.push('/cart')
  }

  notif = e => {
    e.preventDefault()
  }

  message = e => {
    e.preventDefault()
  }

  profile = e =>{
    e.preventDefault()
  }

  componentDidMount(){
    console.log(this.props.isLogin)
    console.log(this.props)
  }

  render(){
    return(
      <Navbar className='bg-white text-dark shadow p-3 mb-5 justify-content-start' light expand="md">
        <Container>
          <NavbarBrand style={{width:'15%'}}><img src={brandIcon} className="img-fluid" alt="logo" /></NavbarBrand>
          <div style = {{width: '40%'}} className='d-flex'>
            <InputGroup style = {{width: '80%'}}>
              <Input name='search' style={{borderRadius:'50px 0 0 50px'}} id='search' value={this.state.searchVal} onChange={this.searchHandle} />
              <InputGroupAddon outline color='secondary' addonType="append"><Button outline color='success' style={{borderRadius:'0 50px 50px 0'}} type='submit' onClick={this.searchSubmit}><SearchIcon /></Button></InputGroupAddon>
            </InputGroup>
            <Button outline color = 'success' className='ml-2'><FilterIcon/></Button>
          </div>
          <NavbarToggler onClick={ () => this.setState({openNavbar: !this.state.openNavbar})} />
          <Collapse isOpen={this.state.openNavbar} navbar>
            <Nav className="ml-auto" navbar>
              {(this.props.auth.isLogin) ? 
                <Router>
                  <NavItem>
                    <NavLink className='mx-2 my-1' onClick={this.cart}><CartIcon /></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className='mx-2 my-1' onClick={this.notif}><NotificationIcon /></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className='mx-2 my-1' onClick={this.message}><MessageIcon /></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className='mx-2 my-1' onClick={this.message}>
                      <div>
                        <image src={this.props.avatar} className='img-fluid rounded-circle'/>
                      </div>
                    </NavLink>
                  </NavItem>
               </Router>
               : 
               <Router>
                <NavItem>
                  <NavLink className='mx-2 my-1' href='#'><CartIcon /></NavLink>
                </NavItem>
                <NavItem>
                  <Button className='mx-2 my-1 rounded-pill' color='success' onClick={this.login}>Login</Button>
                </NavItem>
                <NavItem>
                  <Button className='mx-2 my-1 rounded-pill' outline color='secondary' onClick={this.signup}>Signup</Button>
                </NavItem>
              </Router>
            }
              
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default NavbarClient