import React, {useEffect, useState} from 'react';
import {Col, Row, Button, Spinner} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai';
import addressAction from '../../redux/actions/address';
import UpdateAddress from './UpdateAddress';
import NewAddress from './NewAddress';
import modalButton from '../../redux/actions/modalButton';
import ModalConfirm from '../ModalConfirm';
import ModalLoading from '../ModalLoading';

export default function AddressComponents({
  addressSelector = false,
  selectAddress = (id) => {
    console.log(id);
  },
  selectedAddress = 0,
}) {
  const token = useSelector((state) => state.auth.token);
  const address = useSelector((state) => state.address.addressData);
  const deleteAddress = useSelector((state) => state.deleteAddress);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [propsModalConfirm, setPropsModalConfirm] = useState({});
  const getAddressPending = useSelector(
    (state) => state.address.getAddressPending,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addressAction.getProvince(token));
  }, []);

  useEffect(() => {
    dispatch(addressAction.getAddress(token));
  }, [token]);

  useEffect(() => {
    if (deleteAddress.success) {
      setPropsModalConfirm({
        title: 'Success!',
        content: 'Success delete address',
        close: () => {
          dispatch(addressAction.getAddress(token));
          setModalConfirm(false);
        },
        confirm: () => {
          dispatch(addressAction.getAddress(token));
          setModalConfirm(false);
        },
      });
      setModalConfirm(true);
    } else if (deleteAddress.error) {
      setPropsModalConfirm({
        title: 'Error!',
        content: 'There is an error when deleting address!',
        close: () => {
          dispatch(addressAction.getAddress(token));
          setModalConfirm(false);
        },
        confirm: () => {
          dispatch(addressAction.getAddress(token));
          setModalConfirm(false);
        },
      });
      setModalConfirm(true);
    }
  }, [deleteAddress.pending]);

  const modalEdit = (id) => {
    dispatch(modalButton.openAddressEdit(token, id));
  };

  const modalNew = () => {
    dispatch(modalButton.openAddressNew());
  };

  const addressDelete = (id) => {
    setPropsModalConfirm({
      title: 'Warning',
      content: 'Are you sure want to delete this address?',
      confirm: () => {
        dispatch(addressAction.deleteAddress(token, id));
        setModalConfirm(false);
      },
      close: () => {
        setModalConfirm(false);
      },
    });
    setModalConfirm(true);
  };

  return (
    <>
      <Row>
        <ModalConfirm modalOpen={modalConfirm} {...propsModalConfirm} />
        <ModalLoading modalOpen={deleteAddress.pending} />
        <Button
          color="success"
          outline
          onClick={() => modalNew()}
          block
          className="mb-3 btn-add-address d-flex align-items-center justify-content-center">
          Add new address
        </Button>
        {/* eslint-disable-next-line no-nested-ternary */}
        {getAddressPending ? (
          <Col
            xs="12"
            className="py-3 d-flex align-items-center justify-content-center">
            <Spinner color="success" size="sm" />
          </Col>
        ) : address.length ? (
          address.map((item) => (
            <Col
              xs="12"
              className={`mb-3 py-3 position-relative rounded border${
                // eslint-disable-next-line no-nested-ternary
                addressSelector
                  ? // eslint-disable-next-line no-nested-ternary
                    selectedAddress
                    ? selectedAddress === item.id
                      ? ' border-success'
                      : ''
                    : item.primary_address
                    ? ' border-success'
                    : ''
                  : item.primary_address
                  ? ' border-success'
                  : ''
              }`}>
              {addressSelector ? null : (
                <Button
                  onClick={() => addressDelete(item.id)}
                  color="white"
                  className="position-absolute btn-delete-address">
                  <AiOutlineClose
                    color="#7C4935"
                    style={{width: '1em', height: '1em'}}
                  />
                </Button>
              )}
              <div className="my-2 h6">
                <strong>{item.address_name}</strong>
              </div>
              <div className="my-2">
                {item.address
                  .concat(` ${item.city}`)
                  .concat(` ${item.postal_code}`)}
              </div>
              {addressSelector ? (
                <Button
                  onClick={() => selectAddress(item.id)}
                  outline
                  color="success"
                  className="btn-custom-no-outline stretched-link my-2">
                  Select Address
                </Button>
              ) : (
                <Button
                  onClick={() => modalEdit(item.id)}
                  outline
                  color="success"
                  className="btn-custom-no-outline my-2">
                  Change Address
                </Button>
              )}
            </Col>
          ))
        ) : (
          <Col
            xs="12"
            className="py-3 d-flex align-items-center justify-content-center">
            <text className="text-center text-danger">
              <small>You haven&apos;t create any address, create one!</small>
            </text>
          </Col>
        )}
        <NewAddress />
        <UpdateAddress />
      </Row>
    </>
  );
}
