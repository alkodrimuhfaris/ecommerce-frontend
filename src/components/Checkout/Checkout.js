/* eslint-disable no-nested-ternary */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Card, Button, Spinner, Container} from 'reactstrap';
import Select from 'react-select';
import NavBarClient from '../NavBarClient';
import actions from '../../redux/actions/index';
import ModalChooseAddress from './ModalChooseAddress';
import useWindowDimension from '../Helpers/useWindowDimension';
import currencyFormat from '../../helpers/currencyFormat';
import photoDefault from '../../Assets/images/TukuIcon.png';
import SelectPayment from './SelectPayment';

export default function Checkout() {
  const {xs, md} = useWindowDimension();
  const {checkoutActions, addressActions} = actions;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const checkoutData = useSelector((state) => state.checkoutData);
  const getCheckout = useSelector((state) => state.getCheckout);
  const bookingSummary = useSelector(
    (state) => state.getCheckout.bookingSummary,
  );
  const bookingDetail = useSelector((state) => state.getCheckout.bookingDetail);
  const address = useSelector((state) => state.address.addressData);
  const deliveryOption = useSelector((state) => state.deliveryFee.data);
  const [selectedAddressId, setSelectedAddressId] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState({});
  const [modalSelectedAddress, setModalSelectedAddress] = React.useState(false);
  const [deliveryFee, setDeliveryFee] = React.useState([]);
  const [deliveryFeeInput, setDeliveryFeeInput] = React.useState([]);
  const [selectPaymentOpen, setSelectPayment] = React.useState(false);
  const isInitialMount = React.useRef(true);

  // get address array when component mounting
  React.useEffect(() => {
    dispatch(addressActions.getAddress(token));
  }, []);

  // creating delivery fee array conditioner
  React.useEffect(() => {
    if (bookingDetail.length && !deliveryFee.length) {
      const valueDelivery = bookingDetail.map(() => ({}));
      const delivFee = bookingDetail.map((item) => {
        const {seller_id, items} = item;
        const itemdetails_id = [];
        const quantity = [];
        items.forEach((element) => {
          const {item_detail} = element;
          item_detail.forEach((elItemDetail) => {
            const {item_detail_id, quantity: quantityDetail} = elItemDetail;
            itemdetails_id.push(item_detail_id);
            quantity.push(quantityDetail);
          });
        });
        item = {
          seller_id,
          itemdetails_id,
          quantity,
        };
        return item;
      });
      setDeliveryFeeInput(delivFee);
      setDeliveryFee(valueDelivery);
    }
  }, [bookingDetail]);

  React.useEffect(() => {
    if (deliveryFeeInput.length) {
      dispatch(
        checkoutActions.getDeliveryFee(
          token,
          deliveryFeeInput,
          selectedAddressId,
        ),
      );
    }
  }, [deliveryFeeInput, selectedAddressId]);

  // automatically get checkout data
  React.useEffect(() => {
    const data = {...checkoutData};
    const {quantity, itemdetails_id} = data;
    if (quantity.length && itemdetails_id.length) {
      if (selectedAddressId) {
        Object.assign(data, {address_id: selectedAddressId});
      }
      dispatch(checkoutActions.getCheckout(token, data));
    }
  }, [checkoutData]);

  // function called just when update if selected address id
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const newDeliveryFee = [...deliveryFee].map(() => ({
        value: '',
        label: 'Choose one of delivery options bellow',
      }));
      setDeliveryFee(newDeliveryFee);
      const {quantity, itemdetails_id} = checkoutData;
      const dataAddressChange = {
        quantity,
        itemdetails_id,
      };
      if (quantity.length && itemdetails_id.length) {
        if (selectedAddressId) {
          Object.assign(dataAddressChange, {address_id: selectedAddressId});
        }
        dispatch(checkoutActions.getCheckout(token, dataAddressChange));
      }
    }
  }, [selectedAddressId]);

  React.useEffect(() => {
    if (address.length) {
      let addressSelect = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const item of address) {
        console.log(!selectedAddressId && item.primary_address);
        if (selectedAddressId) {
          if (selectedAddressId === item.id) {
            addressSelect = {...item};
          }
        } else if (!selectedAddressId && item.primary_address) {
          addressSelect = {...item};
        }
      }
      setSelectedAddress(addressSelect);
    }
  }, [address, selectedAddressId]);

  const selectAddressFunction = (id) => {
    setSelectedAddressId(id);
    setModalSelectedAddress(false);
  };

  const processToPayment = () => {
    setSelectPayment(true);
  };

  // function to select delivery courier
  const selectDeliveryCourier = (e, index) => {
    const {value} = e;
    const {services: serviceArr, couriers: courierArr} = checkoutData;
    serviceArr[index] = value.service_id;
    courierArr[index] = value.courier;
    const data = {
      ...checkoutData,
      services: serviceArr,
      couriers: courierArr,
    };
    const delivFee = [...deliveryFee];
    delivFee[index] = e;
    setDeliveryFee(delivFee);
    dispatch(checkoutActions.addCheckoutData(data));
  };

  return (
    <>
      <NavBarClient />

      <ModalChooseAddress
        modalOpen={modalSelectedAddress}
        selectedAddress={selectedAddressId}
        addressSelector
        selectAddress={selectAddressFunction}
        close={() => setModalSelectedAddress(false)}
      />

      <SelectPayment
        modalOpen={selectPaymentOpen}
        closeModal={() => setSelectPayment(false)}
        bookingSummary={bookingSummary}
        address_id={selectedAddressId}
      />

      <Container>
        <div>
          <h3 className="my-3">Checkout</h3>
        </div>

        <Row>
          <Col xs="12" md="7">
            <Card className="shadow-lg my-3 py-2">
              {Object.keys(selectedAddress).length ? (
                <Container>
                  <div className="mb-2">
                    <text>
                      <strong>{selectedAddress.address_name}</strong>
                    </text>
                  </div>
                  <div className="my-2">
                    {selectedAddress.address
                      .concat(` ${selectedAddress.city}`)
                      .concat(` ${selectedAddress.postal_code}`)}
                  </div>
                  <Button
                    onClick={() =>
                      setModalSelectedAddress((prevState) => !prevState)
                    }
                    outline
                    color="secondary"
                    className="btn-custom-no-outline my-2 stretched-link">
                    Choose Another Address
                  </Button>
                </Container>
              ) : (
                <div className="py-3 d-flex align-items-center justify-content-center">
                  <Spinner color="success" size="sm" />
                </div>
              )}
            </Card>

            {getCheckout.pending ? (
              <div className="py-3 d-flex align-items-center justify-content-center">
                <Spinner color="success" size="sm" />
              </div>
            ) : !bookingDetail.length ? (
              <div className="py-3 d-flex align-items-center justify-content-center">
                <text className="text-center text-danger">
                  <small>There is nothing to checkout, start shopping!</small>
                </text>
              </div>
            ) : (
              bookingDetail.map((item, index) => {
                let delivOpt = [
                  {
                    value: '',
                    label: 'Choose one of delivery options bellow',
                  },
                ];
                if (deliveryOption.length) {
                  // eslint-disable-next-line no-restricted-syntax
                  for (const options of deliveryOption) {
                    const {seller_id, dataDelivery} = options;
                    console.log(item.seller_id);
                    if (seller_id === item.seller_id) {
                      delivOpt = dataDelivery.map((deliveryItem) => {
                        const {courier, etd, price, service} = deliveryItem;
                        const value = deliveryItem;
                        const label =
                          `${courier}-${service} || ` +
                          `${currencyFormat(price)}`;
                        const servicePrice = currencyFormat(price);
                        deliveryItem = {
                          value,
                          label,
                          service: `${courier} || ${service}`,
                          etd: `${etd} hari`,
                          servicePrice,
                        };
                        return deliveryItem;
                      });
                    }
                  }
                }
                return (
                  <Card className="shadow-lg my-3">
                    <Container className="py-2">
                      <div className="row no-gutters w-100">
                        <Col
                          xs={12}
                          className="d-flex mb-2 align-items-center justify-content-start">
                          <text>
                            <strong>{item.store_name}</strong>
                          </text>
                        </Col>
                        <Col xs={12}>
                          {!item.items
                            ? null
                            : !item.items.length
                            ? null
                            : item.items.map((elementItem) => (
                                <div className="row no-gutters w-100">
                                  <Col xs={{size: 6, offset: 1}}>
                                    <div className="d-flex justify-content-start align-items-center">
                                      <div
                                        className="position-relative rounded overflow-hidden"
                                        style={{
                                          width: xs || md ? '2em' : '3em',
                                          height: xs || md ? '2em' : '3em',
                                        }}>
                                        <img
                                          src={
                                            elementItem.product_image
                                              ? `${process.env.REACT_APP_URL_BACKEND}/${elementItem.product_image}`
                                              : photoDefault
                                          }
                                          className="img-fluid cart-img position-absolute"
                                          alt={`product_${elementItem.item_id}`}
                                        />
                                      </div>
                                      <div className="pl-3 text-cart-wrapper align-items-start justify-content-start">
                                        <div>
                                          <text
                                            style={{
                                              fontSize:
                                                xs || md ? '0.75em' : '1em',
                                              overflow: 'hidden',
                                              lineHeight: '1.3em',
                                              height: '2.5em',
                                              display: '-webkit-box',
                                              WebkitLineClamp: 2,
                                              WebkitBoxOrient: 'vertical',
                                              overflowWrap: 'break-word',
                                              textOverflow: 'ellipsis',
                                            }}>
                                            <strong>{elementItem.name}</strong>
                                          </text>
                                          <text
                                            style={{
                                              fontSize:
                                                xs || md ? '0.5em' : '0.75em',
                                              overflow: 'hidden',
                                              lineHeight: '1.3em',
                                              height: '1.3em',
                                              display: '-webkit-box',
                                              WebkitLineClamp: 1,
                                              WebkitBoxOrient: 'vertical',
                                              overflowWrap: 'break-word',
                                              textOverflow: 'ellipsis',
                                            }}
                                            className="text-muted">
                                            {!elementItem.item_detail
                                              ? ''
                                              : !elementItem.item_detail.length
                                              ? ''
                                              : elementItem.item_detail
                                                  .map((elementItemDetail) => {
                                                    elementItemDetail = `${elementItemDetail.color_name}(${elementItemDetail.quantity})`;
                                                    return elementItemDetail;
                                                  })
                                                  .join(', ')}
                                          </text>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col
                                    xs="2"
                                    className="d-flex justify-content-end align-items-center p-2">
                                    <div>
                                      <text
                                        className="text-center"
                                        style={{
                                          fontSize: xs || md ? '0.75em' : '1em',
                                        }}>
                                        <strong>{elementItem.quantity}</strong>
                                      </text>
                                    </div>
                                  </Col>
                                  <Col
                                    xs="3"
                                    className="d-flex justify-content-end align-items-center p-2">
                                    <text
                                      style={{
                                        fontSize: xs || md ? '0.75em' : '1em',
                                      }}>
                                      <strong>
                                        {currencyFormat(elementItem.item_price)}
                                      </strong>
                                    </text>
                                  </Col>
                                </div>
                              ))}
                        </Col>
                        <Col xs={12}>
                          <div className="my-2">
                            <text
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              <strong>Select delivery service</strong>
                            </text>
                          </div>
                          <Select
                            options={delivOpt}
                            id={`delivery_fee_${index}`}
                            name={`delivery_fee_${index}`}
                            value={
                              deliveryFee.length
                                ? deliveryFee[index]
                                  ? Object.keys(deliveryFee[index]).length
                                    ? deliveryFee[index]
                                    : {
                                        value: '',
                                        label:
                                          'Choose one of delivery options bellow',
                                      }
                                  : {
                                      value: '',
                                      label:
                                        'Choose one of delivery options bellow',
                                    }
                                : {
                                    value: '',
                                    label:
                                      'Choose one of delivery options bellow',
                                  }
                            }
                            onChange={(e) => selectDeliveryCourier(e, index)}
                          />
                        </Col>
                        {!deliveryFee.length ? null : !deliveryFee[
                            index
                          ] ? null : Object.keys(deliveryFee[index]).length ? (
                          <Col xs={12}>
                            <div className="row no-gutters my-3 w-100">
                              <Col
                                xs="9"
                                className="d-flex align-items-center justify-content-start">
                                <text
                                  style={{
                                    fontSize: xs || md ? '0.75em' : '1em',
                                  }}>
                                  <strong>Delivery Fee</strong>
                                </text>
                              </Col>
                              <Col
                                xs="3"
                                className="d-flex align-items-center justify-content-end">
                                <text
                                  style={{
                                    fontSize: xs || md ? '0.75em' : '1em',
                                  }}>
                                  <strong>
                                    {deliveryFee[index].servicePrice}
                                  </strong>
                                </text>
                              </Col>
                            </div>
                          </Col>
                        ) : null}
                      </div>
                    </Container>
                  </Card>
                );
              })
            )}
          </Col>
          <Col xs="12" md="5" className="my-3">
            <Card className="shadow-lg py-3">
              {getCheckout.pending ? (
                <div className="py-3 d-flex align-items-center justify-content-center">
                  <Spinner color="success" size="sm" />
                </div>
              ) : !Object.keys(bookingSummary).length ? (
                <div className="py-3 d-flex align-items-center justify-content-center">
                  <text className="text-center text-danger">
                    <small>
                      Your booking summary is empty, start shopping!
                    </small>
                  </text>
                </div>
              ) : (
                <Container>
                  <div className="mb-3">
                    <text>
                      <strong>Shopping summary</strong>
                    </text>
                  </div>
                  <div className="mb-3 pb-2 border-bottom">
                    <div className="mb-1 d-flex justify-content-between">
                      <text className="text-muted">Order</text>
                      <text>
                        <strong>
                          {Number(bookingSummary.prices)
                            ? currencyFormat(bookingSummary.prices)
                            : bookingSummary.prices}
                        </strong>
                      </text>
                    </div>
                    <div className="mb-1 d-flex justify-content-between">
                      <text className="text-muted">Delivery</text>
                      <text>
                        <strong>
                          {Number(bookingSummary.delivery_fees)
                            ? currencyFormat(bookingSummary.delivery_fees)
                            : bookingSummary.delivery_fees}
                        </strong>
                      </text>
                    </div>
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <text>
                      <strong>Shopping summary</strong>
                    </text>
                    <text className="text-right">
                      <strong>
                        {Number(bookingSummary.total)
                          ? currencyFormat(bookingSummary.total)
                          : bookingSummary.total}
                      </strong>
                    </text>
                  </div>
                  <Button
                    block
                    disabled={!Number(bookingSummary.total)}
                    className="rounded-pill "
                    color="success"
                    onClick={processToPayment}>
                    Select Payment
                  </Button>
                </Container>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
