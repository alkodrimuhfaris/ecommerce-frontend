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
import {ReactComponent as ProfilePict} from '../Assets/images/carousel2.png'
import { useHistory } from "react-router-dom";
import {Provider} from 'react-redux'
//Import store
import store from '../redux/store'


export default function NavbarClient(props) {
  const [openNavbar, setOpenNavbar] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [queryPage, setQueryPage] = useState({})
  let history = useHistory()


  const useSearchHandle = (event) => {
    useState(setSearchVal(searchVal = event.target.value))
  }

  const useSearchSubmit = (event) => {
    event.preventDefault()
    useState(setQueryPage(
      queryPage = {
       ...this.props.queryPage,
       search: searchVal
      })
    ) 
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

  return(
    <Provider store={store}>
      <Router>
        <Navbar className='bg-white text-dark shadow p-3 mb-5 justify-content-start' light expand="md">
          <Container>
            <NavbarBrand style={{width:'15%'}}><img src={brandIcon} className="img-fluid" alt="logo" /></NavbarBrand>
            <div style = {{width: '40%'}} className='d-flex'>
              <Form onSubmit={useSearchSubmit}>
                <InputGroup style = {{width: '80%'}}>
                  <Input name='search' style={{borderRadius:'50px 0 0 50px'}} id='search' value={searchVal} onChange={useSearchHandle} />
                  <InputGroupAddon outline color='secondary' addonType="append"><Button outline color='success' style={{borderRadius:'0 50px 50px 0'}} type='submit' onClick={searchSubmit}><SearchIcon /></Button></InputGroupAddon>
                </InputGroup>
                <Button outline color = 'success' className='ml-2'><FilterIcon/></Button>
              </Form>
            </div>
            <NavbarToggler onClick={ () => useState(setOpenNavbar(!openNavbar))} />
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
                      <NavLink className='mx-2 my-1' onClick={e => pushTo('/profile',e)}>
                        <div>
                          <image src={store.getState().profile.avatar} className='img-fluid rounded-circle'/>
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