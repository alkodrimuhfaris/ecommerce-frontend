import React, {useEffect, useState} from 'react';
import {Container, Col, Row, Media, Nav, NavItem} from 'reactstrap';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {FaPencilAlt, FaRegClipboard, FaMoneyCheck} from 'react-icons/fa';
import {FiUser} from 'react-icons/fi';
import {BiMap} from 'react-icons/bi';
import profileAction from '../../redux/actions/profile';
import NavBarClient from '../NavBarClient';
import ProfileComponent from './ProfileComponent';
import AddressComponent from './AddressComponent';
import TransactionComponent from './TransactionComponent';
import Balance from './Balance';
import useWindowDimension from '../Helpers/useWindowDimension';
import placeholder from '../../Assets/images/profile.jpg';

export default function Profile() {
  const {md, lg} = useWindowDimension();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.userData);
  const userUpdated = useSelector((state) => state.profile.isUpdated);
  const dispatch = useDispatch();
  const history = useHistory();
  const thisPath = useLocation().pathname;
  const [name, setName] = useState('');
  const [showAvatar, setShowAvatar] = useState('');
  const [choosenPath, setChoosenPath] = useState(0);

  useEffect(() => {
    switch (thisPath) {
      case '/profile': {
        setChoosenPath(0);
        break;
      }
      case '/address': {
        setChoosenPath(1);
        break;
      }
      case '/transaction': {
        setChoosenPath(2);
        break;
      }
      case '/balance': {
        setChoosenPath(3);
        break;
      }
      default: {
        setChoosenPath(0);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (userUpdated) {
      dispatch(profileAction.getProfile(token));
    }
  }, [token, userUpdated]);

  useEffect(() => {
    setName(user.name);
    setShowAvatar(
      user.avatar
        ? `${process.env.REACT_APP_URL_BACKEND}/${user.avatar}`
        : placeholder,
    );
  }, [user]);

  const linkArr = [
    {
      name: 'My Profile',
      path: '/profile',
      Icon: ({color}) => (
        <FiUser color={color} className="rounded-circle img-center" />
      ),
      bgColor: {backgroundColor: '#456BF3'},
    },
    {
      name: 'Shipping Address',
      path: '/address',
      Icon: ({color}) => (
        <BiMap color={color} className="rounded-circle img-center" />
      ),
      bgColor: {backgroundColor: '#F36F45'},
    },
    {
      name: 'My Orders',
      path: '/transaction',
      Icon: ({color}) => (
        <FaRegClipboard color={color} className="rounded-circle img-center" />
      ),
      bgColor: {backgroundColor: '#4B5230'},
    },
    {
      name: 'Balance',
      path: '/balance',
      Icon: ({color}) => (
        <FaMoneyCheck color={color} className="rounded-circle img-center" />
      ),
      bgColor: {backgroundColor: '#F3456F'},
    },
  ];

  const component = (className = 'my-3') => {
    switch (thisPath) {
      case '/profile': {
        return <ProfileComponent className={className} />;
      }
      case '/address': {
        return <AddressComponent className={className} />;
      }
      case '/transaction': {
        return <TransactionComponent className={className} />;
      }
      case '/balance': {
        return <Balance className={className} />;
      }
      default: {
        return <ProfileComponent className={className} />;
      }
    }
  };

  const heading = {
    title: () => {
      switch (thisPath) {
        case '/profile': {
          return 'My Profile';
        }
        case '/address': {
          return 'Choose Another Address';
        }
        case '/transaction': {
          return 'History of your transaction';
        }
        case '/balance': {
          return 'Tuku Balance!';
        }
        default: {
          return 'My Profile';
        }
      }
    },
    subTitle: () => {
      switch (thisPath) {
        case '/profile': {
          return 'Manage your profile information';
        }
        case '/address': {
          return 'Manage your shipping address';
        }
        case '/transaction': {
          return 'List of all your transaction';
        }
        case '/balance': {
          return 'Top up your balance here';
        }
        default: {
          return 'Manage your profile information';
        }
      }
    },
  };

  const goToProfile = (e, index, path) => {
    e.preventDefault();
    setChoosenPath(index);
    history.push(path);
  };

  return (
    <>
      <NavBarClient />
      <Row style={{width: '100%', margin: '0'}}>
        <Col
          xs="12"
          md="3"
          className={`py-2 px-4 ${
            md ? 'fixed-bottom justify-content-around w-100 bg-white' : null
          }`}>
          {!md ? (
            <Media className="align-items-center my-3">
              <Media left>
                <div className="position-relative rounded-circle overflow-hidden border-circle square3p5em">
                  <Media
                    object
                    src={showAvatar}
                    className="img-fluid img-center"
                  />
                </div>
              </Media>
              <Media body className="ml-3">
                <div className="strong h5">{name}</div>
                <div className="text-muted small">
                  <span>
                    <FaPencilAlt />
                  </span>{' '}
                  Ubah profil
                </div>
              </Media>
            </Media>
          ) : null}
          <Nav vertical={!md} horizontal={md} className="row">
            {linkArr.map((item, index) => {
              const {name: pathName, path, Icon, bgColor} = item;
              // eslint-disable-next-line no-nested-ternary
              const color = !lg
                ? 'white'
                : index === choosenPath
                ? 'white'
                : 'black';
              // eslint-disable-next-line no-nested-ternary
              const background = !lg
                ? bgColor
                : index === choosenPath
                ? {backgroundColor: '#457373'}
                : {backgroundColor: 'white'};

              return (
                <NavItem className="col-3 col-md-12">
                  <Media className="align-items-center my-2 w-100">
                    <Link
                      onClick={(e) => goToProfile(e, index, path)}
                      to="/profile"
                      style={{textDecoration: 'none'}}
                      className={`d-flex align-items-center ${
                        lg ? 'w-100 flex-column justify-content-center' : ''
                      }`}>
                      <Media
                        left
                        className="position-relative square-1-5em rounded-circle"
                        style={background}>
                        <Icon color={color} />
                      </Media>
                      {!lg ? (
                        <Media body className="ml-2">
                          <text
                            className={
                              choosenPath === index
                                ? 'small text-dark font-weight-bold'
                                : 'small text-dark '
                            }>
                            {pathName}
                          </text>
                        </Media>
                      ) : null}
                    </Link>
                  </Media>
                </NavItem>
              );
            })}
          </Nav>
        </Col>
        <Col
          xs="12"
          md="9"
          style={{backgroundColor: '#f5f5f5', height: 'calc(100vh - 5.5em)'}}
          className="p-5">
          <div
            className="w-100 h-100 p-5 overflow-auto"
            style={{backgroundColor: '#fff'}}>
            <div className="border-bottom pb-3">
              <div className="h4">{heading.title()}</div>
              <div className="text-muted small">{heading.subTitle()}</div>
            </div>
            <Container>{component()}</Container>
          </div>
        </Col>
      </Row>
    </>
  );
}
