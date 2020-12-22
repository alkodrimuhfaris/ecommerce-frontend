import React, {useEffect, useState} from 'react';
import {
  Container,
  Col,
  Row,
  Media,
  Nav,
  NavItem,
  Button,
  Form,
  FormGroup,
  Label,
  FormText,
} from 'reactstrap';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {FaPencilAlt, FaRegClipboard} from 'react-icons/fa';
import {BiMap} from 'react-icons/bi';
import profileAction from '../../redux/actions/profile';
import NavBarClient from '../NavBarClient';
import userIcon from '../../Assets/icons/user.svg';
import ProfileComponent from './ProfileComponent';
import AddressComponent from './AddressComponent';

export default function Profile(props) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.userData);
  const userUpdated = useSelector((state) => state.profile.isUpdated);
  const dispatch = useDispatch();
  const thisPath = useLocation().pathname;

  const [name, setName] = useState('');
  const [showAvatar, setShowAvatar] = useState('');

  useEffect(() => {
    dispatch(profileAction.getProfile(token));
    setName(user.name);
    setShowAvatar(
      user.avatar && `${process.env.REACT_APP_URL_BACKEND}/${user.avatar}`,
    );
  }, [dispatch, token, user, userUpdated]);

  const component = (className = 'my-3') => {
    switch (thisPath) {
      case '/profile': {
        return <ProfileComponent className={className} />;
      }
      case '/address': {
        return <AddressComponent className={className} />;
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
        default: {
          return 'Manage your profile information';
        }
      }
    },
  };

  return (
    <>
      <NavBarClient />
      <Row style={{width: '100%', margin: '0'}}>
        <Col xs="12" md="3" className="py-2 px-4">
          <Media className="align-items-center my-3">
            <Media left>
              <div className="position-relative border-circle square3p5em">
                <Media
                  object
                  src={showAvatar || 'https://via.placeholder.com/50'}
                  className="rounded-circle img-fluid img-center"
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
          <Nav vertical>
            <NavItem>
              <Media className="align-items-center my-1">
                <Media
                  left
                  className="position-relative square-1-5em rounded-circle"
                  style={{backgroundColor: '#456BF3'}}>
                  <Media
                    object
                    src={userIcon}
                    className="rounded-circle img-center"
                  />
                </Media>
                <Link
                  to="/profile"
                  style={{textDecoration: 'none'}}
                  className="text-dark">
                  <Media body className="ml-2">
                    <div
                      className={
                        thisPath === '/profile'
                          ? 'small font-weight-bold'
                          : 'small'
                      }>
                      My account
                    </div>
                  </Media>
                </Link>
              </Media>
            </NavItem>
            <NavItem>
              <Media className="align-items-center my-1">
                <Media
                  left
                  className="position-relative square-1-5em rounded-circle"
                  style={{backgroundColor: '#F36F45'}}>
                  <BiMap color="white" className="rounded-circle img-center" />
                </Media>
                <Link
                  to="/address"
                  style={{textDecoration: 'none'}}
                  className="text-dark">
                  <Media body className="ml-2">
                    <div
                      className={
                        thisPath === '/address'
                          ? 'small font-weight-bold'
                          : 'small'
                      }>
                      Shipping address
                    </div>
                  </Media>
                </Link>
              </Media>
            </NavItem>
            <NavItem>
              <Media className="align-items-center my-1">
                <Media
                  left
                  className="position-relative square-1-5em rounded-circle"
                  style={{backgroundColor: '#F3456F'}}>
                  <FaRegClipboard
                    color="white"
                    className="rounded-circle img-center"
                  />
                </Media>
                <Link
                  to="/profile"
                  style={{textDecoration: 'none'}}
                  className="text-dark">
                  <Media body className="ml-2">
                    <div className="small strong">My Orders</div>
                  </Media>
                </Link>
              </Media>
            </NavItem>
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
