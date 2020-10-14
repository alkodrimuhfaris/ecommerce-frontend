import React, {useState, useEffect} from 'react';
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
  InputGroupAddon,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
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
import {ReactComponent as ProfilePict} from '../Assets/images/carousel2.png'
import { useHistory } from "react-router-dom";
import {Provider, useSelector, useDispatch} from 'react-redux'
//Import store
import store from '../redux/store'
import profileAction from '../redux/actions/profile'
import authAction from '../redux/actions/auth'
import defaultProfile from '../Assets/images/profile.jpg'
import ava from '../Assets/images/ava.jpeg'


export default function NavbarClient(props) {
  const [openNavbar, setOpenNavbar] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [queryPage, setQueryPage] = useState({})
  const token = useSelector(state => state.auth.token)
  const profile = useSelector(state => state.profile.userData)
  const dispatch = useDispatch()

  useEffect(()=>{
    token && dispatch(profileAction.getProfile(token))
  },[dispatch, token])
  let history = useHistory()

  const useSearchHandle = (event) => {
    event.preventDefault()
    setSearchVal(event.target.value)
  }

  const useSearchSubmit = (event) => {
    event.preventDefault()
    setQueryPage(
      queryPage = {
       ...this.props.queryPage,
       search: searchVal
    })
  }

  const pushTo = (path, e) => {
    e.preventDefault()
    history.push(path)
  }

  const notif = e => {
    e.preventDefault()
  }

  const message = e => {
    e.preventDefault()
  }

  const logout = () => {
    dispatch(authAction.logout())
    history.push('/login')
  }

  return(
    <Provider store={store}>
      <Router>
        <Navbar className='bg-white text-dark shadow p-3 mb-5 justify-content-start' light expand="md">
          <Container>
            <NavbarBrand style={{width:'15%'}}>
              <Button style={{width:'100%', backgroundColor:'#fff', border:'none'}} 
                      onClick={e => pushTo('/', e)}
              >
                <img src={brandIcon} className="img-fluid" alt="logo" />
              </Button>
            </NavbarBrand>
            <div style = {{width: '60%'}}>
              <Form onSubmit={useSearchSubmit} style={{width: '80%'}} className='d-flex'>
                <InputGroup style = {{width: '80%'}}>
                  <Input name='search' style={{borderRadius:'50px 0 0 50px'}} id='search' value={searchVal} onChange={useSearchHandle} />
                  <InputGroupAddon outline color='secondary' addonType="append"><Button outline color='success' style={{borderRadius:'0 50px 50px 0'}} type='submit'><SearchIcon /></Button></InputGroupAddon>
                </InputGroup>
                <Button outline color = 'success' className='ml-2'><FilterIcon/></Button>
              </Form>
            </div>
            <NavbarToggler onClick={() => setOpenNavbar(!openNavbar)} />
            <Collapse isOpen={openNavbar} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className='mx-2 my-1' onClick={ e => pushTo('/cart',e)}><CartIcon /></NavLink>
                </NavItem>
                {(store.getState().auth.isLogin) ? 
                  <Router>
                    <NavItem>
                      <NavLink className='mx-2 my-1' onClick={notif}><NotificationIcon /></NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className='mx-2 my-1' onClick={message}><MessageIcon /></NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className='mx-2 my-1'>
                        <UncontrolledDropdown>
                          <DropdownToggle className='rounded-circle position-relative overflow-hidden'
                            style={{width:'2em', height:'2em', backgroundColor:'#fff', border:'none'}}>
                            <img src={
                              ava}
                              className='position-absolute img-fluid'
                              style={{top:'50%', left:'50%', transform:'translate(-50%, -50%'}}
                            />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>
                              <NavLink className='mx-2 my-1' onClick={e => pushTo('/profile',e)}>Profile</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                              <NavLink className='mx-2 my-1' onClick={() => logout()}>Log Out</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                      </NavLink>
                    </NavItem>
                </Router>
                : 
                <Router>
                  <NavItem>
                    <Button className='mx-2 my-1 rounded-pill' color='success' onClick={e => pushTo('/login',e)}>Login</Button>
                  </NavItem>
                  <NavItem>
                    <Button className='mx-2 my-1 rounded-pill' outline color='secondary' onClick={e => pushTo('/signup',e)}>Signup</Button>
                  </NavItem>
                </Router>
              }
                
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Router>
    </Provider>
  )
}