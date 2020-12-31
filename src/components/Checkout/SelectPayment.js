import React from 'react';
import {Modal, Button, Container, Row, Col, Input} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai';
import {useHistory} from 'react-router-dom';
import actions from '../../redux/actions/index';
import tukuIcon from '../../Assets/icons/tukuIcon.png';
import currencyFormat from '../../helpers/currencyFormat';
import useWindowDimension from '../Helpers/useWindowDimension';
import ModalConfirm from '../ModalConfirm';
import ModalLoading from '../ModalLoading';

export default function SelectPayment({
  modalOpen = false,
  closeModal = () => {},
  bookingSummary = {},
  address_id = 0,
}) {
  const history = useHistory();
  const {xs, md} = useWindowDimension();
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.checkoutData);
  const processPayment = useSelector((state) => state.processPayment);
  const cartSelected = useSelector((state) => state.cartToCheckout.data);
  const token = useSelector((state) => state.auth.token);
  const {checkoutActions, cartActions} = actions;
  const [open, setOpen] = React.useState(false);
  const [paymentSelected, setPaymentSelected] = React.useState(0);
  const [notifPayment, setNotifPayment] = React.useState(false);
  const [propsNotif, setPropsNotif] = React.useState({});

  React.useEffect(() => {
    setOpen(modalOpen);
    console.log(cartSelected);
  }, [modalOpen]);

  const close = () => {
    closeModal();
    setOpen(false);
  };

  React.useEffect(() => {
    if (processPayment.success) {
      setPropsNotif({
        title: 'Succes!',
        content: processPayment.message,
        confirm: () => {
          dispatch(checkoutActions.removeCheckoutData());
          if (cartSelected.length) {
            dispatch(cartActions.deleteCart(token, cartSelected));
          }
          close();
          setOpen(false);
          history.push('/');
        },
        close: () => {
          dispatch(checkoutActions.removeCheckoutData());
          if (cartSelected.length) {
            dispatch(cartActions.deleteCart(token, cartSelected));
          }
          close();
          setOpen(false);
          history.push('/');
        },
      });
      setNotifPayment(true);
    } else if (processPayment.error) {
      setPropsNotif({
        title: 'Failed!',
        content: processPayment.message,
        confirm: () => {
          close();
          setOpen(false);
        },
        close: () => {
          close();
          setOpen(false);
        },
      });
      setNotifPayment(true);
    }
  }, [processPayment.pending]);

  const paymentMethod = [
    {
      name: 'Tuku Payment',
      payment_method: 'tuku_payment',
      image: tukuIcon,
    },
  ];

  const processToPayment = () => {
    console.log(bookingData);
    const {payment_method} = paymentMethod[paymentSelected];
    const data = {...bookingData, payment_method, address_id};
    console.log(data);
    dispatch(checkoutActions.processPayment(token, data));
  };

  return (
    <>
      <Modal isOpen={open} size="sm" className="position-relative">
        <ModalLoading modalOpen={processPayment.pending} />

        <ModalConfirm modalOpen={notifPayment} {...propsNotif} />

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
              <h4>Payment</h4>
            </div>
          </Container>
          <div className="mb-3">
            <text>
              <strong>Select Payment Method</strong>
            </text>
          </div>
          <div className="my-3">
            {paymentMethod.map((item, index) => (
              <Row className="no-gutters">
                <Col xs="3">
                  <div
                    className="position-relative rounded overflow-hidden"
                    style={{
                      width: xs || md ? '2em' : '3em',
                      height: xs || md ? '2em' : '3em',
                    }}>
                    <img
                      src={item.image}
                      className="img-fluid cart-img position-absolute"
                      alt={`payment_${index}`}
                    />
                  </div>
                </Col>
                <Col xs="8" className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <text
                      style={{
                        fontSize: xs || md ? '0.75em' : '1em',
                      }}>
                      <strong>{item.name}</strong>
                    </text>
                  </div>
                </Col>
                <Col xs="1" className="checkbox-wrapper-cart">
                  <div className="checkbox-inside">
                    <Input
                      type="checkbox"
                      name="primary_address"
                      id="primary_address"
                      color="success"
                      style={{paddingBottom: '0.25em'}}
                      className="ml-1 checkbox"
                      checked={index === paymentSelected}
                      value={index === paymentSelected}
                      onChange={() => setPaymentSelected(index)}
                    />
                  </div>
                </Col>
              </Row>
            ))}
          </div>

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
            <Row className="no-gutters mb-3">
              <Col xs="6">
                <div className="d-flex flex-column align-items-start justify-content-center">
                  <text>
                    <strong>Shopping summary</strong>
                  </text>
                  <text className="text-right text-success">
                    <strong>
                      {Number(bookingSummary.total)
                        ? currencyFormat(bookingSummary.total)
                        : bookingSummary.total}
                    </strong>
                  </text>
                </div>
              </Col>
              <Col
                xs="6"
                className="d-flex align-items-center justify-content-end">
                <Button
                  disabled={!Number(bookingSummary.total)}
                  className="rounded-pill "
                  color="success"
                  onClick={processToPayment}>
                  Buy
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal>
    </>
  );
}
