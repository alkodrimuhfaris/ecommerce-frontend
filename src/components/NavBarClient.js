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
  Label,
  FormGroup,
} from 'reactstrap';
import Select from 'react-select';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {FiSearch, FiFilter, FiShoppingCart} from 'react-icons/fi';
import {HiOutlineMail} from 'react-icons/hi';
import {IoMdNotificationsOutline} from 'react-icons/io';
import sortOpt from './Helpers/sortOption';
import brandIcon from '../Assets/icons/icon.svg';
import Popover from './Popover';

// Import store
import profileAction from '../redux/actions/profile';
import authAction from '../redux/actions/auth';
import defaultProfile from '../Assets/images/profile.jpg';
import searchAction from '../redux/actions/searchQuery';
import useWindowDimension from './Helpers/useWindowDimension';
import '../Assets/style/NavBar.css';

export default function NavbarClient({inSearchPage = false, ...props}) {
  const {width, md} = useWindowDimension();
  const [openNavbar, setOpenNavbar] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [sort, setSort] = useState({
    value: {sort: {created_at: 'DESC'}},
    label: 'Terbaru',
  });
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');
  const [filterPopOver, setFilterPopOver] = useState(false);
  const query = useSelector((state) => state.searchQuery.query);
  const token = useSelector((state) => state.auth.token);
  const isSeller = useSelector((state) => state.auth.isSeller);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const profile = useSelector((state) => state.profile.userData);
  const dispatch = useDispatch();
  const history = useHistory();
  const filterRef = React.useRef(null);
  const [profilePopOver, setProfilePopOver] = useState(false);

  useEffect(() => {
    console.log(width);
  }, [width]);

  useEffect(() => {
    if (token) {
      dispatch(profileAction.getProfile(token));
    }
    console.log(isSeller);
  }, []);

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

  const useSearchSubmit = (e) => {
    e.preventDefault();
    const thisSearch = searchVal ? {name: searchVal} : undefined;
    const thisSort = Object.keys(sort).length ? sort.value.sort : undefined;
    const date = {before, after};
    const queryAdmin = {
      ...query,
      search: thisSearch,
      date,
      sort: thisSort,
    };
    dispatch(searchAction.addQuery(queryAdmin));
    if (!inSearchPage) {
      history.push('/search');
    }
  };

  const handleDefault = (e) => {
    e.preventDefault();
    setSort({value: {sort: {created_at: 'DESC'}}, label: 'Terbaru'});
    setSearchVal('');
    setBefore('');
    setAfter('');
  };

  return (
    <Router>
      <Navbar
        className="w-100 bg-white text-dark shadow justify-content-start sticky-top"
        light
        expand="md">
        <Container>
          <NavbarBrand style={{width: md ? '20%' : '15%'}}>
            <Button
              style={{
                width: '100%',
                minWidth: '75px',
                backgroundColor: '#fff',
                border: 'none',
              }}
              onClick={(e) => pushTo('/', e)}>
              <img src={brandIcon} className="img-fluid" alt="logo" />
            </Button>
          </NavbarBrand>
          <div style={{width: md ? '50%' : '60%'}}>
            <Form
              onSubmit={useSearchSubmit}
              style={{width: '95%'}}
              className="d-flex">
              <InputGroup style={{width: '80%'}}>
                <Input
                  className={`${md ? 'input-search-md' : 'input-search'}`}
                  name="search"
                  style={{borderRadius: '50px 0 0 50px'}}
                  id="search"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <InputGroupAddon
                  outline
                  className={md ? 'search-add-on' : ''}
                  color="secondary"
                  addonType="append">
                  <Button
                    outline
                    className={`position-relative ${
                      md ? 'input-btn-md' : 'input-btn'
                    }`}
                    color="success"
                    style={{borderRadius: '0 50px 50px 0'}}
                    type="submit">
                    <FiSearch
                      size={md ? '0.75em' : '1em'}
                      className={md ? 'search-icon-md' : 'search-icon'}
                    />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <div className="ml-2 position-relative d-flex align-items-center">
                <Button
                  ref={filterRef}
                  type="button"
                  id="filterBtn"
                  name="filterBtn"
                  onClick={() => setFilterPopOver((prevState) => !prevState)}
                  outline
                  color="success"
                  className={`btn-popover ${
                    md ? 'btn-popover-md' : 'btn-popover-lg'
                  }`}>
                  <FiFilter
                    size={md ? '0.75em' : '1em'}
                    className="filter-icon"
                  />
                </Button>
                <Popover isOpen={filterPopOver}>
                  <div className="pt-2 px-2">
                    <Form>
                      <Label for="sortKey">Sort by</Label>
                      <Select
                        id="sortKey"
                        className="mb-4"
                        value={sort}
                        options={sortOpt}
                        onChange={(e) => setSort({sort: e})}
                      />
                      <FormGroup>
                        <Label for="filterDateFrom">From Date</Label>
                        <Input
                          type="date"
                          name="dateFromVal"
                          id="filterDateFrom"
                          value={after}
                          onChange={(e) => setAfter({after: e.target.value})}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="filterDateTo">To Date</Label>
                        <Input
                          type="date"
                          name="dateToVal"
                          id="filterDateTo"
                          value={before}
                          onChange={(e) => setBefore({before: e.target.value})}
                        />
                        <div className="d-flex justify-content-between">
                          <Button
                            color="success"
                            className="rounded-pill my-3 mr-1"
                            onClick={() =>
                              setFilterPopOver((prevState) => !prevState)
                            }>
                            Close
                          </Button>
                          <Button
                            outline
                            color="danger"
                            className="rounded-pill ml-1 my-3"
                            onClick={handleDefault}>
                            Abort All
                          </Button>
                        </div>
                      </FormGroup>
                    </Form>
                  </div>
                </Popover>
              </div>
              {/* <div className="ml-2 filter-wrapper square-btn-wrapper">
              </div> */}
            </Form>
          </div>
          <NavbarToggler onClick={() => setOpenNavbar(!openNavbar)} />
          <Collapse isOpen={openNavbar} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="d-flex align-items-center">
                <NavLink
                  className="mx-3 my-1 d-flex align-items-center justify-content-center"
                  onClick={(e) => pushTo('/cart', e)}>
                  <FiShoppingCart size="1em" />
                  {md ? (
                    <text className="mx-2 my-1 text-secondary">Carts</text>
                  ) : null}
                </NavLink>
              </NavItem>
              {isLogin ? (
                <Router className="d-flex align-items-center">
                  <NavItem className="d-flex align-items-center">
                    <NavLink
                      className="mx-3 my-1 d-flex align-items-center"
                      onClick={notif}>
                      <IoMdNotificationsOutline size="1em" />
                      {md ? (
                        <text className="mx-2 my-1 text-secondary">
                          Notifications
                        </text>
                      ) : null}
                    </NavLink>
                  </NavItem>
                  <NavItem className="d-flex align-items-center">
                    <NavLink
                      className="mx-3 my-1 d-flex align-items-center"
                      onClick={message}>
                      <HiOutlineMail size="1em" />
                      {md ? (
                        <text className="mx-2 my-1 text-secondary">
                          Messages
                        </text>
                      ) : null}
                    </NavLink>
                  </NavItem>
                  <NavItem className="position-relative">
                    <NavLink
                      onClick={() =>
                        setProfilePopOver((prevState) => !prevState)
                      }
                      className="mx-2 my-2 d-flex align-items-center">
                      <div className="d-flex w-auto align-items-center position-relative">
                        <Button
                          id="profile-popover"
                          name="profile-popover"
                          className="rounded-circle p-0 position-relative drop-down-toggle">
                          <div className="rounded-circle w-100 h-100 overflow-hidden position-relative">
                            <img
                              src={
                                Object.keys(profile) && profile.avatar
                                  ? `${process.env.REACT_APP_URL_BACKEND}/${profile.avatar}`
                                  : defaultProfile
                              }
                              alt="avatar"
                              className="position-absolute img-fluid avatar"
                            />
                          </div>
                        </Button>
                        {md ? (
                          <text className="mx-2 my-2 text-secondary">
                            Profile
                          </text>
                        ) : null}
                        <Popover isOpen={profilePopOver}>
                          <Button
                            block
                            outline
                            color="success"
                            style={{
                              border: 0,
                              borderRadius: 0,
                              borderTopLeftRadius: '0.5em',
                              borderTopRightRadius: '0.5em',
                            }}
                            onClick={(e) => pushTo('/profile', e)}>
                            Profile
                          </Button>
                          {isSeller ? (
                            <Button
                              block
                              outline
                              color="success"
                              style={{
                                border: 0,
                                borderRadius: 0,
                              }}
                              onClick={(e) => pushTo('/admin', e)}>
                              Admin
                            </Button>
                          ) : null}
                          <Button
                            block
                            outline
                            color="success"
                            style={{
                              border: 0,
                              borderRadius: 0,
                              borderBottomLeftRadius: '0.5em',
                              borderBottomRightRadius: '0.5em',
                            }}
                            onClick={() => logout()}>
                            Log Out
                          </Button>
                        </Popover>
                      </div>
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
