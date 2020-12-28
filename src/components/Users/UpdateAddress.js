import React, {useEffect, useState} from 'react';
import {
  Input,
  Col,
  Row,
  Modal,
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  FormFeedback,
} from 'reactstrap';
import Select from 'react-select';
import {useSelector, useDispatch} from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import '../../Assets/style/Address.css';
import modalAction from '../../redux/actions/modalButton';
import addressAction from '../../redux/actions/address';
import ModalConfirm from '../ModalConfirm';
import ModalLoading from '../ModalLoading';

const schemaAddress = Yup.object().shape({
  address_name: Yup.string('Input the right address name').required(
    'Address name is required!',
  ),
  recipient_name: Yup.string('Input the right recipient name format!').required(
    'Recipient name is required!',
  ),
  phone: Yup.string('Input the right phone number')
    .required('Phone must be provided!')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
      'Input right phone number format!',
    ),
  address: Yup.string('Input the right address!')
    .min(2, 'Address is too short')
    .required('Address is needed!'),
  city_id: Yup.number('Select the right city id!')
    .min(1, 'city can not be empty!')
    .required('City id is required!'),
  province_id: Yup.number('Select the right province id!')
    .min(1, 'province can not be empty!')
    .required('Province id is required!'),
  postal_code: Yup.string('Input the right postal code!')
    .matches(/^([1-9])[0-9]{4}$/, 'Input the right postal code format!')
    .required('Postal code is required'),
  primary_address: Yup.boolean(
    'Input the right format for primary address!',
  ).required('Primary address is required'),
});

export default function ModalNew() {
  const token = useSelector((state) => state.auth.token);
  const open = useSelector((state) => state.modalButton.modalEditAddress);
  const id = useSelector((state) => state.modalButton.idAddress);
  const provinceData = useSelector((state) => state.address.provinceData);
  const cityData = useSelector((state) => state.address.cityData);
  const address = useSelector((state) => state.address);
  const updateAddressPending = useSelector(
    (state) => state.address.updateAddressPending,
  );
  const getAddressIdSuccess = useSelector(
    (state) => state.address.getAddressIdSuccess,
  );
  const addressDetail = useSelector((state) => state.address.addressDetail);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [propsModalConfirm, setPropsModalConfirm] = useState({});
  const [provinceSelected, setProvinceSelected] = useState({
    value: 0,
    label: 'Select province',
  });
  const [provinceOpt, setProvinceOpt] = useState([]);
  const [cityOpt, setCityOpt] = useState([]);
  const [citySelected, setCitySelected] = useState({});
  const [mount, setMount] = useState(true);
  const [cityMount, setCityMount] = useState(false);
  const dispatch = useDispatch();

  const close = () => {
    setMount(true);
    dispatch(modalAction.closeAddressEdit());
  };

  useEffect(() => {
    if (id) {
      dispatch(addressAction.getAddresssById(token, id));
    }
  }, [id]);

  useEffect(() => {
    if (address.updateAddressSuccess) {
      setPropsModalConfirm({
        title: 'Success!',
        content: 'Success update address!',
        confirm: () => {
          setModalConfirm(false);
          dispatch(addressAction.getAddress(token));
          close();
        },
        close: () => {
          setModalConfirm(false);
          dispatch(addressAction.getAddress(token));
          close();
        },
      });
      setModalConfirm(true);
    } else if (address.updateAddressError) {
      setPropsModalConfirm({
        title: 'Warning',
        content: 'Failed update address!',
        confirm: () => {
          setModalConfirm(false);
        },
        close: () => {
          setModalConfirm(false);
        },
      });
      setModalConfirm(true);
    }
  }, [updateAddressPending]);

  useEffect(() => {
    const {province_id} = addressDetail;
    if (getAddressIdSuccess) {
      console.log('set select province');
      console.log(mount);
      if (mount) {
        if (provinceOpt.length) {
          if (province_id) {
            console.log('set select province');
            provinceOpt.forEach((item) => {
              console.log(item);
              if (Number(item.value) === province_id) {
                console.log(item);
                setProvinceSelected(item);
              }
            });
            setCityMount(true);
          }
        }
      }
    }
  }, [getAddressIdSuccess, provinceOpt]);

  // calibrating province data array for react-select option
  useEffect(() => {
    const provinceNewOpt = provinceData.map((item) => {
      item = {
        value: item.province_id,
        label: item.province,
      };
      return item;
    });
    console.log(provinceNewOpt);
    setProvinceOpt(provinceNewOpt);
  }, [provinceData]);

  // calibrating city data array for react-select option
  useEffect(() => {
    const cityNewOpt = cityData.map((item) => {
      item = {
        value: item.city_id,
        label: item.city,
        postal_code: item.postal_code,
      };
      return item;
    });
    console.log(cityNewOpt);
    setCityOpt(cityNewOpt);
  }, [cityData]);

  useEffect(() => {
    if (provinceSelected.value) {
      dispatch(addressAction.getCityProvince(token, provinceSelected.value));
    }
  }, [provinceSelected]);

  useEffect(() => {
    if (cityMount) {
      cityOpt.forEach((item) => {
        if (Number(item.value) === addressDetail.city_id) {
          setCitySelected(item);
          setMount(false);
        }
      });
    }
  }, [cityMount, cityOpt]);

  const provinceSelect = (e, setValue) => {
    setProvinceSelected(e);
    setValue('city_id', 0);
    setValue('postal_code', '');
    setValue('province_id', e.value);
  };

  const citySelect = (e, setValue) => {
    setValue('city_id', e.value);
    setValue('postal_code', e.postal_code);
  };

  const initialValue = {
    address_name: addressDetail.address_name,
    phone: addressDetail.phone,
    address: addressDetail.address,
    province_id: addressDetail.province_id || 0,
    city_id: addressDetail.city_id || 0,
    postal_code: addressDetail.postal_code,
    primary_address: !!addressDetail.primary_address,
    recipient_name: addressDetail.recipient_name,
  };

  const handleAdd = (values) => {
    dispatch(addressAction.patchAddress(token, id, values));
  };

  const selectStyle = {
    control: (provided, state) => ({
      ...provided,
      // eslint-disable-next-line no-nested-ternary
      borderColor: state.selectProps.error
        ? '#7C4935'
        : state.selectProps.touched
        ? '#457373'
        : 'rgba(0,0,0,.2)',
    }),
  };

  return (
    <>
      <Modal isOpen={open} size="lg" className="position-relative">
        {/* loading get address */}
        <ModalLoading modalOpen={address.getAddressIdPending} />

        <ModalLoading modalOpen={address.updateAddressPending} />

        <ModalConfirm modalOpen={modalConfirm} {...propsModalConfirm} />
        <Button
          onClick={() => close()}
          color="white"
          className="position-absolute btn-close">
          <AiOutlineClose
            color="danger"
            style={{width: '1em', height: '1em'}}
          />
        </Button>
        <div
          className="w-100 h-100 p-3 overflow-auto"
          style={{backgroundColor: '#fff', borderRadius: '3em'}}>
          <Container
            className="p-3 overflow-auto header-container"
            style={{backgroundColor: '#fff'}}>
            <div className="d-flex justify-content-center">
              <h4>Update address</h4>
            </div>
            <div className="d-flex justify-content-center">
              <text className="text-muted small">
                Update your selected address here
              </text>
            </div>
          </Container>
          <Formik
            enableReinitialize
            initialValues={initialValue}
            validationSchema={schemaAddress}
            validateOnBlur
            onSubmit={(values) => {
              handleAdd(values);
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
                <Container>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col xs="12" className="my-1">
                        <FormGroup>
                          <Label
                            for="address_name"
                            className="small text-secondary">
                            Save address as (ex : home address, office address)
                          </Label>
                          <Input
                            type="text"
                            name="address_name"
                            id="address_name"
                            tag={Field}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            valid={!errors.address_name && touched.address_name}
                            invalid={errors.address_name}
                          />
                          {errors.address_name || touched.address_name ? (
                            <FormFeedback invalid>
                              {errors.address_name}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="6" className="my-1">
                        <FormGroup>
                          <Label
                            for="recipient_name"
                            className="small text-secondary">
                            Recipient’s name
                          </Label>
                          <Input
                            type="text"
                            name="recipient_name"
                            id="recipient_name"
                            tag={Field}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            valid={
                              !errors.recipient_name && touched.recipient_name
                            }
                            invalid={errors.recipient_name}
                          />
                          {errors.recipient_name || touched.recipient_name ? (
                            <FormFeedback invalid>
                              {errors.recipient_name}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="6" className="my-1">
                        <FormGroup>
                          <Label for="phone" className="small text-secondary">
                            Recipient&apos;s telephone number
                          </Label>
                          <Input
                            type="number"
                            name="phone"
                            id="phone"
                            tag={Field}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            valid={!errors.phone && touched.phone}
                            invalid={errors.phone}
                          />
                          {errors.phone || touched.phone ? (
                            <FormFeedback invalid>{errors.phone}</FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="6" className="my-1">
                        <FormGroup>
                          <Label for="address" className="small text-secondary">
                            Address
                          </Label>
                          <Input
                            type="name"
                            name="address"
                            id="address"
                            tag={Field}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            valid={!errors.address && touched.address}
                            invalid={errors.address}
                          />
                          {errors.address || touched.address ? (
                            <FormFeedback invalid>
                              {errors.address}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="6" className="my-1">
                        <FormGroup>
                          <Label
                            for="postal_code"
                            className="small text-secondary">
                            Postal Code
                          </Label>
                          <Input
                            type="number"
                            name="postal_code"
                            id="postal_code"
                            disabled
                            value={values.postal_code}
                            tag={Field}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            valid={!errors.postal_code && touched.postal_code}
                            invalid={errors.postal_code}
                          />
                          {errors.postal_code || touched.postal_code ? (
                            <text className="error-form">
                              {errors.postal_code}
                            </text>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="6" className="my-1">
                        <FormGroup row>
                          <Col xs="6" md="7">
                            <Label
                              for="province_id"
                              className="small text-secondary">
                              Province
                            </Label>
                            <Select
                              id="province_id"
                              name="province_id"
                              value={provinceSelected}
                              styles={selectStyle}
                              error={errors.province_id}
                              touched={touched.province_id}
                              onChange={(e) => {
                                provinceSelect(e, setFieldValue);
                              }}
                              options={provinceOpt}
                            />
                            {errors.province_id ? (
                              <text className="error-form">
                                {errors.province_id}
                              </text>
                            ) : null}
                          </Col>
                          <Col xs="6" md="5">
                            <Label
                              for="city_id"
                              className="small text-secondary">
                              City or District
                            </Label>
                            <Select
                              id="city_id"
                              name="city_id"
                              value={citySelected}
                              styles={selectStyle}
                              error={errors.city_id}
                              touched={touched.city_id}
                              onChange={(e) => {
                                citySelect(e, setFieldValue);
                              }}
                              options={cityOpt}
                            />
                            {errors.city_id ? (
                              <text className="error-form">
                                {errors.city_id}
                              </text>
                            ) : null}
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col xs="12" className="my-1">
                        <FormGroup className="d-flex align-items-center justify-content-start">
                          <div className="d-flex align-items-center position-relative">
                            <Input
                              type="checkbox"
                              name="primary_address"
                              id="primary_address"
                              color="success"
                              style={{paddingBottom: '0.25em'}}
                              className="ml-1 mb-1 checkbox"
                              checked={values.primary_address}
                              value={values.primary_address}
                              tag={Field}
                              onChange={() => {
                                setFieldValue(
                                  'primary_address',
                                  !values.primary_address,
                                );
                              }}
                              onBlur={handleBlur}
                            />
                            <Label
                              for="primary_address"
                              className="small text-secondary ml-4">
                              Make it the primary address
                            </Label>
                          </div>
                        </FormGroup>
                        {errors.primary_address || touched.primary_address ? (
                          <Container className="my-0">
                            <text className="error-form">
                              {errors.primary_address}
                            </text>
                          </Container>
                        ) : null}
                      </Col>
                    </Row>
                    <Col
                      xs="12"
                      className="d-flex align-item-center justify-content-end">
                      <Row className="col-12 col-md-6">
                        <Col
                          xs="6"
                          className="d-flex align-item-center justify-content-center px-2">
                          <Button
                            outline
                            color="secondary"
                            className="w-100 rounded-pill text-secondary"
                            onClick={() => close()}>
                            Cancel
                          </Button>
                        </Col>
                        <Col
                          xs="6"
                          className="d-flex align-item-center justify-content-center px-2">
                          <Button
                            color="success"
                            className="rounded-pill w-100"
                            type="submit">
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Form>
                </Container>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </>
  );
}
