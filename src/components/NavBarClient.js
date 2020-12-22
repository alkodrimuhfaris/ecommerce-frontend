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
  Input,
  InputGroup,
  InputGroupAddon,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import brandIcon from '../Assets/icons/icon.svg';
import {ReactComponent as SearchIcon} from '../Assets/icons/searchIcon.svg';
import {ReactComponent as CartIcon} from '../Assets/icons/shopping-cart.svg';
import {ReactComponent as FilterIcon} from '../Assets/icons/filter.svg';
import {ReactComponent as NotificationIcon} from '../Assets/icons/bell.svg';
import {ReactComponent as MessageIcon} from '../Assets/icons/message.svg';

// Import store
import profileAction from '../redux/actions/profile';
import authAction from '../redux/actions/auth';
import defaultProfile from '../Assets/images/profile.jpg';
import searchAction from '../redux/actions/searchQuery';
import '../Assets/style/NavBar.css';

export default function NavbarClient() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const query = useSelector((state) => state.searchQuery.query);
  const token = useSelector((state) => state.auth.token);
  const isSeller = useSelector((state) => state.auth.isSeller);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const profile = useSelector((state) => state.profile.userData);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      dispatch(profileAction.getProfile(token));
    }
    console.log(isSeller);
  }, []);

  const useSearchSubmit = (event) => {
    event.preventDefault();
    const queryNew = {
      ...query,
      search: searchVal,
    };
    dispatch(searchAction.addQuery(queryNew));
    history.push('/search');
  };

  const pushTo = (path, e) => {
    e.preventDefault();
    history.push(path);
  };

  const notif = (e) => {
    e.preventDefault();
  };

  const message = (e) => {
    e.preventDefault();
  };

  const logout = () => {
    dispatch(authAction.logout());
    history.push('/login');
  };

  return (
    <Router>
      <Navbar
        className="bg-white text-dark shadow justify-content-start sticky-top"
        light
        expand="md">
        <Container>
          <NavbarBrand style={{width: '15%'}}>
            <Button
              style={{
                width: '100%',
                backgroundColor: '#fff',
                border: 'none',
              }}
              onClick={(e) => pushTo('/', e)}>
              <img src={brandIcon} className="img-fluid" alt="logo" />
            </Button>
          </NavbarBrand>
          <div style={{width: '60%'}}>
            <Form
              onSubmit={useSearchSubmit}
              style={{width: '80%'}}
              className="d-flex">
              <InputGroup style={{width: '80%'}}>
                <Input
                  name="search"
                  style={{borderRadius: '50px 0 0 50px'}}
                  id="search"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <InputGroupAddon outline color="secondary" addonType="append">
                  <Button
                    outline
                    color="success"
                    style={{borderRadius: '0 50px 50px 0'}}
                    type="submit">
                    <SearchIcon />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <Button type="button" outline color="success" className="ml-2">
                <FilterIcon />
              </Button>
            </Form>
          </div>
          <NavbarToggler onClick={() => setOpenNavbar(!openNavbar)} />
          <Collapse isOpen={openNavbar} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  className="mx-2 my-1"
                  onClick={(e) => pushTo('/cart', e)}>
                  <CartIcon />
                </NavLink>
              </NavItem>
              {isLogin ? (
                <Router>
                  <NavItem>
                    <NavLink className="mx-2 my-1" onClick={notif}>
                      <NotificationIcon />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="mx-2 my-1" onClick={message}>
                      <MessageIcon />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="mx-2 my-1">
                      <UncontrolledDropdown className="position-relative">
                        <DropdownToggle className="rounded-circle position-relative overflow-hidden drop-down-toggle">
                          <img
                            src={
                              Object.keys(profile) && profile.avatar
                                ? process.env.REACT_APP_URL_BACKEND +
                                  profile.avatar
                                : defaultProfile
                            }
                            alt="avatar"
                            className="position-absolute img-fluid avatar"
                          />
                        </DropdownToggle>
                        <DropdownMenu className="drop-down-menu">
                          <DropdownItem>
                            <NavLink
                              className="mx-2 my-1"
                              onClick={(e) => pushTo('/profile', e)}>
                              Profile
                            </NavLink>
                          </DropdownItem>
                          {isSeller ? (
                            <DropdownItem>
                              <NavLink
                                className="mx-2 my-1"
                                onClick={(e) => pushTo('/admin', e)}>
                                Admin
                              </NavLink>
                            </DropdownItem>
                          ) : null}
                          <DropdownItem>
                            <NavLink
                              className="mx-2 my-1"
                              onClick={() => logout()}>
                              Log Out
                            </NavLink>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </NavLink>
                  </NavItem>
                </Router>
              ) : (
                <Router>
                  <NavItem>
                    <Button
                      className="mx-2 my-1 rounded-pill"
                      color="success"
                      onClick={(e) => pushTo('/login', e)}>
                      Login
                    </Button>
                  </NavItem>
                  <NavItem>
                    <Button
                      className="mx-2 my-1 rounded-pill"
                      outline
                      color="secondary"
                      onClick={(e) => pushTo('/signup', e)}>
                      Signup
                    </Button>
                  </NavItem>
                </Router>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Router>
  );
}
