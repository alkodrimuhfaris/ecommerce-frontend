import React, {useEffect, useState} from 'react';
import {
  Input,
  Col,
  Row,
  Media,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Formik, Field} from 'formik';
import moment from 'moment';
import {AiFillCloseCircle} from 'react-icons/ai';
import placeholder from '../../Assets/images/profile.jpg';
import profileAction from '../../redux/actions/profile';
import '../../Assets/style/Profile.css';
import ModalLoading from '../ModalLoading';
import ModalConfirm from '../ModalConfirm';
import useWindowDimension from '../Helpers/useWindowDimension';
import ChangePassword from './ChangePassword';

const schemaCustomer = Yup.object().shape({
  name: Yup.string('Input the right value!')
    .min(2, 'Name is too short!')
    .nullable(),
  email: Yup.string('Input the right value!')
    .email('Input valid email!')
    .nullable(),
  phone: Yup.string('Input the right value!')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
      'Input right phone number format!',
    )
    .nullable(),
  gender: Yup.string('Select one of the option below')
    .nullable()
    .test('gender-test', 'Choose the right gender role!', (value) => {
      value = value === 'Male' || value === 'Female';
      return value;
    })
    .nullable(),
  birthdate: Yup.string()
    .test('birthday-test', 'Birthday should be a valid date!', (value) =>
      moment(value).isSameOrBefore(new Date()),
    )
    .transform((_value, originalValue) =>
      moment(originalValue).format('YYYY-MM-DD'),
    )
    .nullable(),
});

const schemaSeller = Yup.object().shape({
  name: Yup.string('Input the right value!')
    .min(2, 'Name is too short!')
    .nullable(),
  email: Yup.string('Input the right value!')
    .email('Input valid email!')
    .nullable(),
  phone: Yup.string('Input the right value!')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
      'Input right phone number format!',
    )
    .nullable(),
  gender: Yup.string('Select one of the option below')
    .test('gender-test', 'Choose the right gender role!', (value) => {
      value = value === 'Male' || value === 'Female';
      return value;
    })
    .nullable(),
  birthdate: Yup.string()
    .test('birthday-test', 'Birthday should be a valid date!', (value) =>
      moment(value).isSameOrBefore(new Date()),
    )
    .transform((_value, originalValue) =>
      moment(originalValue).format('YYYY-MM-DD'),
    )
    .nullable(),
  store_name: Yup.string('Input the right value!').min(2, 'Name is too short!'),
  store_description: Yup.string('Input the right value!')
    .min(2, 'Description is too short!')
    .nullable(),
});

export default function Profile() {
  const {md} = useWindowDimension();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.userData);
  const profile = useSelector((state) => state.profile);
  const userUpdated = useSelector((state) => state.profile.isUpdated);
  const isSeller = useSelector((state) => state.auth.isSeller);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState({
    uriAvatar: placeholder,
    file: {},
  });
  const [notifSuccess, setNotifSuccess] = useState(false);
  const [propsNotifSuccess, setPropsNotifSuccess] = useState({});
  const [notifForImg, setNotifForImg] = useState(false);
  const [propsNotifImg, setPropsNotifImg] = useState({});
  const [notifDeleteAva, setNotifDeleteAva] = useState(false);
  const [propsNotifAvaDelete, setPropsNotifDeleteAva] = useState({});

  useEffect(() => {
    dispatch(profileAction.getProfile(token));
    return () => dispatch(profileAction.clearState());
  }, [token]);

  useEffect(() => {
    if (userUpdated) {
      dispatch(profileAction.getProfile(token));
      setPropsNotifSuccess({
        title: 'Success!',
        content: 'Success update profile!',
        close: () => setNotifSuccess(false),
        confirm: () => setNotifSuccess(false),
      });
      setNotifSuccess(true);
    } else if (profile.isError) {
      setPropsNotifSuccess({
        title: 'Failed!',
        content: 'Failed to update profile!',
        close: () => setNotifSuccess(false),
        confirm: () => setNotifSuccess(false),
      });
      setNotifSuccess(true);
    }
  }, [profile.isPending]);

  useEffect(() => {
    setAvatar({
      uriAvatar: user.avatar
        ? `${process.env.REACT_APP_URL_BACKEND}/${user.avatar}`
        : placeholder,
      fromDB: true,
      file: {},
    });
  }, [user]);

  useEffect(() => {
    if (profile.deleteAvaSuccess) {
      dispatch(profileAction.getProfile(token));
      setPropsNotifDeleteAva({
        title: 'Success!',
        content: 'Success delete avatar!',
        close: () => setNotifDeleteAva(false),
        confirm: () => setNotifDeleteAva(false),
      });
      setNotifDeleteAva(true);
    } else if (profile.deleteAvaError) {
      setPropsNotifDeleteAva({
        title: 'Fail!',
        content: 'Delete avatar error!',
        close: () => setNotifDeleteAva(false),
        confirm: () => setNotifDeleteAva(false),
      });
      setNotifDeleteAva(true);
    }
  }, [profile.deleteAvaPending]);

  const saveChange = (e) => {
    console.log('change save');
    console.log(e);
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('avatar', avatar.file);
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(e)) {
      if (value) {
        formData.append(key, value);
      }
    }
    dispatch(profileAction.patchProfile(token, formData));
  };

  const avatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files;
      if (file.size > 500 * 1024) {
        setPropsNotifImg({
          title: 'Warning!',
          content: 'Avatar size can not be more than 5 MB!',
          close: () => setNotifForImg(false),
          confirm: () => setNotifForImg(false),
        });
        setNotifForImg(true);
      } else {
        setAvatar({
          uriAvatar: URL.createObjectURL(file),
          file,
        });
      }
    }
  };

  const deleteAvatar = () => {
    if (avatar.fromDB) {
      dispatch(profileAction.deleteAvatar(token));
    }
    console.log('masuk delete avatar');
    setAvatar({
      uriAvatar: placeholder,
      file: {},
    });
    setNotifDeleteAva(false);
    console.log('close notif delete ava');
  };

  const openDelAva = (e) => {
    e.preventDefault();
    setPropsNotifDeleteAva({
      title: 'Warning!',
      content: 'Are you sure want to delete your avatar?',
      close: () => setNotifDeleteAva(false),
      confirm: () => deleteAvatar(),
    });
    setNotifDeleteAva(true);
  };

  const initialValueSeller = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    birthdate: moment(user.birthdate).format('YYYY-MM-DD'),
    store_name: user.store_name,
    store_description: user.store_description,
  };

  const initialValueCustomer = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    birthdate: user.birthdate,
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={isSeller ? initialValueSeller : initialValueCustomer}
        validationSchema={isSeller ? schemaSeller : schemaCustomer}
        validateOnBlur
        onSubmit={(values) => {
          saveChange(values);
        }}>
        {(props) => {
          const {
            touched,
            errors,
            handleSubmit,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
          } = props;

          return (
            <Form className="my-3" onSubmit={handleSubmit}>
              <Row>
                <Col xs="12" md="8" className="mb-3">
                  <FormGroup row>
                    <Label
                      className={!md ? 'text-right' : 'text-left'}
                      for="name"
                      sm={3}
                      xs={12}>
                      Name
                    </Label>
                    <Col sm={9}>
                      <Input
                        tag={Field}
                        type="name"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.name && touched.name}
                        invalid={errors.name}
                      />
                      {errors.name || touched.name ? (
                        <FormFeedback invalid>{errors.name}</FormFeedback>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      className={!md ? 'text-right' : 'text-left'}
                      for="email"
                      sm={3}
                      xs={12}>
                      Email
                    </Label>
                    <Col sm={9}>
                      <Input
                        tag={Field}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.email && touched.email}
                        invalid={errors.email}
                      />
                      {errors.email || touched.email ? (
                        <FormFeedback invalid>{errors.email}</FormFeedback>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      className={!md ? 'text-right' : 'text-left'}
                      for="phone"
                      sm={3}
                      xs={12}>
                      Phone Number
                    </Label>
                    <Col sm={9}>
                      <Input
                        tag={Field}
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Phone Number"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.phone && touched.phone}
                        invalid={errors.phone}
                      />
                      {errors.phone || touched.phone ? (
                        <FormFeedback invalid>{errors.phone}</FormFeedback>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup tag="fieldset" row>
                    <Col
                      sm={3}
                      xs={12}
                      className={!md ? 'text-right' : 'text-left'}>
                      Gender
                    </Col>
                    <Col sm={9} className="d-flex">
                      {['Male', 'Female'].map((item, i) => (
                        <FormGroup className={i > 0 && 'ml-4'} check>
                          <Label check>
                            <Input
                              type="radio"
                              name="gender"
                              id={`gender${item}`}
                              value={item}
                              checked={item === values.gender}
                              onChange={(e) =>
                                setFieldValue('gender', e.target.value)
                              }
                            />
                            <span>{item}</span>
                          </Label>
                        </FormGroup>
                      ))}
                    </Col>
                    <Col sm={{size: 9, offset: 3}} xs={12}>
                      {errors.gender || touched.gender ? (
                        <text className="error-form">{errors.gender}</text>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      className={!md ? 'text-right' : 'text-left'}
                      for="birthdate"
                      sm={3}
                      xs={12}>
                      Date of birth
                    </Label>
                    <Col sm={9}>
                      <Input
                        tag={Field}
                        type="date"
                        name="birthdate"
                        id="birthdate"
                        placeholder="Date of birth"
                        value={moment(values.birthdate).format('YYYY-MM-DD')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.birthdate && touched.birthdate}
                        invalid={errors.birthdate}
                      />
                      {errors.birthdate || touched.birthdate ? (
                        <text className="error-form">{errors.birthdate}</text>
                      ) : null}
                    </Col>
                  </FormGroup>
                  {isSeller ? (
                    <>
                      <h3 className="mt-4 mb-2">Store</h3>
                      <FormGroup row>
                        <Label
                          className={!md ? 'text-right' : 'text-left'}
                          for="store_name"
                          sm={3}
                          xs={12}>
                          Store Name
                        </Label>
                        <Col sm={9}>
                          <Input
                            tag={Field}
                            type="text"
                            name="store_name"
                            id="store_name"
                            placeholder="Store Name"
                            value={values.store_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            valid={!errors.store_name && touched.store_name}
                            invalid={errors.store_name}
                          />
                          {errors.store_name || touched.store_name ? (
                            <FormFeedback invalid>
                              {errors.store_name}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          className={!md ? 'text-right' : 'text-left'}
                          for="store_description"
                          sm={3}
                          xs={12}>
                          Store Description
                        </Label>
                        <Col sm={9}>
                          <Input
                            type="textarea"
                            aria-multiline
                            name="store_description"
                            id="store_description"
                            placeholder="Description of your store"
                            value={values.store_description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            valid={
                              !errors.store_description &&
                              touched.store_description
                            }
                            invalid={errors.store_description}
                          />
                          {errors.store_description ||
                          touched.store_description ? (
                            <FormFeedback invalid>
                              {errors.store_description}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </FormGroup>
                    </>
                  ) : null}
                </Col>

                <Col xs="12" md="4">
                  <Media className="flex-column align-items-center">
                    <Media
                      top
                      className="position-relative"
                      style={{width: '7em', height: '7em'}}>
                      {avatar.uriAvatar !== placeholder ? (
                        <Button
                          type="button"
                          color="white"
                          onClick={(e) => openDelAva(e)}
                          className="close-btn">
                          <AiFillCloseCircle
                            className="position-relative"
                            color="#7C4935"
                            size="1em"
                          />
                        </Button>
                      ) : null}
                      <div
                        className="rounded-circle  position-relative overflow-hidden"
                        style={{width: '100%', height: '100%'}}>
                        <Media
                          object
                          src={avatar.uriAvatar}
                          className="position-absolute img-fluid"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                          }}
                        />
                      </div>
                    </Media>
                    <Media body className="my-3">
                      <Label
                        for="avatar"
                        className="btn btn-outline-secondary rounded-pill">
                        <span>Select File</span>
                        <Input
                          onChange={avatarChange}
                          type="file"
                          id="avatar"
                          accept=".jpg,.jpeg,.png"
                          style={{display: 'none'}}
                        />
                        <ModalConfirm
                          modalOpen={notifDeleteAva}
                          {...propsNotifAvaDelete}
                        />
                        <ModalConfirm
                          modalOpen={notifForImg}
                          {...propsNotifImg}
                        />
                        <ModalLoading modalOpen={profile.deleteAvaPending} />
                      </Label>
                    </Media>
                  </Media>
                </Col>

                <Col xs="12" md="8" className="mb-3">
                  <FormGroup row>
                    <Col
                      md={{size: 9, offset: 3}}
                      sm={12}
                      className={
                        md
                          ? 'd-flex align-items-center justify-content-center'
                          : ''
                      }>
                      <Button
                        color="success"
                        type="submit"
                        className="rounded-pill">
                        Submit
                      </Button>
                    </Col>
                  </FormGroup>
                </Col>

                <ModalLoading
                  modalOpen={profile.getProfilePending || profile.isPending}
                />
                <ModalConfirm modalOpen={notifSuccess} {...propsNotifSuccess} />
              </Row>
            </Form>
          );
        }}
      </Formik>
      <ChangePassword md={md} />
    </>
  );
}
