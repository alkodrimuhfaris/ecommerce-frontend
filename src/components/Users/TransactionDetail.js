/* eslint-disable no-nested-ternary */
import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import {Modal, Button, Container, Spinner, Card, Col} from 'reactstrap';
import {useSelector} from 'react-redux';
import moment from 'moment';
import useWindowDimension from '../Helpers/useWindowDimension';
import photoDefault from '../../Assets/images/TukuIcon.png';
import currencyFormat from '../../helpers/currencyFormat';

export default function TransactionDetail({
  modalOpen = false,
  closeModal = () => {},
}) {
  const {xs, md} = useWindowDimension();
  const [open, setOpen] = React.useState(false);
  const transaction = useSelector((state) => state.detailTransaction.data);
  const detailTransaction = useSelector((state) => state.detailTransaction);

  React.useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen]);

  const close = () => {
    closeModal();
    setOpen(false);
  };

  return (
    <>
      <Modal isOpen={open} centered className="position-relative">
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
          {detailTransaction.pending ? (
            <div className="py-3 d-flex align-items-center justify-content-center">
              <Spinner color="success" size="sm" />
            </div>
          ) : !Object.keys(transaction).length ? null : (
            <>
              <Container
                className="p-3 overflow-auto header-container"
                style={{backgroundColor: '#fff'}}>
                <div className="d-flex justify-content-center">
                  <h4>{transaction.invoice}</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <text className="text-muted small">Detail transaction</text>
                </div>
              </Container>
              <Card>
                <Container className="py-2">
                  <div className="mb-3">
                    <text>
                      <strong>Summary</strong>
                    </text>
                  </div>
                  <div className="mb-3 pb-2 border-bottom">
                    <div className="mb-1 d-flex justify-content-between">
                      <text className="text-muted">Transaction date</text>
                      <text>
                        <strong>
                          {moment(transaction.created_at).format(
                            'ddd, DD mmm YYYY',
                          )}
                        </strong>
                      </text>
                    </div>
                    <div className="mb-1 d-flex justify-content-between">
                      <text className="text-muted">Status</text>
                      <text
                        style={{
                          color: transaction.status ? '#457373' : '#7C4935',
                        }}>
                        <strong>
                          {transaction.status ? 'Paid' : 'Unpaid'}
                        </strong>
                      </text>
                    </div>
                    <div className="mb-1 d-flex justify-content-between">
                      <text className="text-muted">Quantity</text>
                      <text>
                        <strong>{transaction.quantity}</strong>
                      </text>
                    </div>
                    <div className="mb-1 d-flex justify-content-between">
                      <text className="text-muted">Total Order</text>
                      <text>
                        <strong>
                          {currencyFormat(transaction.items_price)}
                        </strong>
                      </text>
                    </div>
                    <div className="mb-1 d-flex justify-content-between">
                      <text className="text-muted">Delivery</text>
                      <text>
                        <strong>
                          {currencyFormat(transaction.delivery_fee)}
                        </strong>
                      </text>
                    </div>
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <text>
                      <strong>Shopping summary</strong>
                    </text>
                    <text className="text-right">
                      <strong>{currencyFormat(transaction.total_price)}</strong>
                    </text>
                  </div>
                </Container>
              </Card>
              {transaction.transactionMerchants.map((item) => (
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
                        {!item.transactionDetails
                          ? null
                          : !item.transactionDetails.length
                          ? null
                          : item.transactionDetails.map((elementItem) => (
                              <div
                                className={`row no-gutters w-100 ${
                                  xs || md ? ' my-2' : 'my-3'
                                }`}>
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
                                        alt={`product_${elementItem.id}`}
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
                                          <strong>
                                            {elementItem.item_name}
                                          </strong>
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
                                            width: '100%',
                                          }}
                                          className="text-muted">
                                          {elementItem.item_color}
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
                                      {currencyFormat(elementItem.total_price)}
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
                            <strong>
                              Transaction On Merchant {item.store_name}
                            </strong>
                          </text>
                        </div>

                        <div className="row no-gutters my-2 w-100">
                          <Col
                            xs="5"
                            className="d-flex align-items-center justify-content-start">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              Shipping Address
                            </text>
                          </Col>
                          <Col
                            xs="7"
                            className="d-flex align-items-center justify-content-end">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              {item.shipping_address}
                            </text>
                          </Col>
                        </div>
                        <div className="row no-gutters my-2 w-100">
                          <Col
                            xs="5"
                            className="d-flex align-items-center justify-content-start">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              Delivery Services
                            </text>
                          </Col>
                          <Col
                            xs="7"
                            className="d-flex align-items-center justify-content-end">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              <strong>
                                {`${item.courier} || ${item.service_name}`}
                              </strong>
                            </text>
                          </Col>
                        </div>
                        <div className="row no-gutters my-2 w-100">
                          <Col
                            xs="5"
                            className="d-flex align-items-center justify-content-start">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              Delivery Fee
                            </text>
                          </Col>
                          <Col
                            xs="7"
                            className="d-flex align-items-center justify-content-end">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              <strong>
                                {currencyFormat(item.delivery_fee)}
                              </strong>
                            </text>
                          </Col>
                        </div>
                        <div className="row no-gutters my-2 w-100">
                          <Col
                            xs="5"
                            className="d-flex align-items-center justify-content-start">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              Order
                            </text>
                          </Col>
                          <Col
                            xs="7"
                            className="d-flex align-items-center justify-content-end">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              <strong>
                                {currencyFormat(item.total_price)}
                              </strong>
                            </text>
                          </Col>
                        </div>
                        <div className="row no-gutters my-2 w-100">
                          <Col
                            xs="5"
                            className="d-flex align-items-center justify-content-start">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              Total
                            </text>
                          </Col>
                          <Col
                            xs="7"
                            className="d-flex align-items-center justify-content-end">
                            <text
                              className="text-muted"
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                              }}>
                              <strong>
                                {currencyFormat(item.total_payment)}
                              </strong>
                            </text>
                          </Col>
                        </div>
                      </Col>
                    </div>
                  </Container>
                </Card>
              ))}
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
