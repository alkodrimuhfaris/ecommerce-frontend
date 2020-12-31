import React, {useEffect, useState} from 'react';
import {Row, Col, Container, Button, Input, Card, Spinner} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import NavBarClient from '../NavBarClient';
import cartActions from '../../redux/actions/cart';
import checkoutActions from '../../redux/actions/checkout';
import photoDefault from '../../Assets/images/TukuIcon.png';
import useWindowDimension from '../Helpers/useWindowDimension';
import currencyFormat from '../../helpers/currencyFormat';
import ModalLoading from '../ModalLoading';
import ModalConfirm from '../ModalConfirm';

export default function Cart() {
  const {xs, md} = useWindowDimension();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const cart = useSelector((state) => state.cart);
  const dataCart = useSelector((state) => state.cart.dataCart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState([]);
  const [price, setPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [selectedArr, setSelectedArr] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);
  const [numberSelected, setNumberSelected] = useState(0);
  const deleteCart = useSelector((state) => state.deleteCart);
  const [propsNotif, setPropsNotif] = useState({});
  const [openNotif, setOpenNotif] = useState(false);
  const isInitialMount = React.useRef(true);

  useEffect(() => {
    dispatch(cartActions.getCart(token));
  }, []);

  useEffect(() => {
    let numberSel = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of selectedArr) {
      if (item.selected) {
        numberSel++;
      }
    }
    setNumberSelected(numberSel);
  }, [selectedArr]);

  // set delete all function
  useEffect(() => {
    if (selectedArr.length) {
      if (selectedArr.length === numberSelected) {
        setDeleteAll(true);
      } else {
        setDeleteAll(false);
      }
    }
  }, [selectedArr, numberSelected]);

  // set quantity and array for delete cart
  useEffect(() => {
    if (dataCart.length) {
      setQuantity(
        dataCart.map((item) => {
          item = item.quantity;
          return item;
        }),
      );
      setSelectedArr(
        dataCart.map((item) => {
          item = {
            selected: false,
            id: item.id,
          };
          return item;
        }),
      );
    }
  }, [dataCart]);

  // set price
  useEffect(() => {
    if (dataCart.length) {
      setPrice(
        dataCart.map((item, i) => {
          item = quantity[i] * item.price;
          return item;
        }),
      );
    }
    console.log(price);
  }, [dataCart, quantity]);

  // sum of all price
  useEffect(() => {
    if (price.length && selectedArr.length) {
      let total = 0;
      const selectedPriceArr = price.filter((item, index) => {
        item = selectedArr[index].selected;
        return item;
      });
      if (selectedPriceArr.length) {
        total = selectedPriceArr.reduce((a, b) => a + b);
      }
      console.log(total);
      setTotalPrice(total);
    }
  }, [price, selectedArr]);

  // notif for delete cart
  useEffect(() => {
    if (isInitialMount.current) {
      dispatch(cartActions.clearCartCheckout());
      isInitialMount.current = false;
    } else {
      if (deleteCart.success) {
        setPropsNotif({
          title: 'Success',
          content: 'Success delete selected cart!',
          confirm: () => {
            dispatch(cartActions.getCart(token));
            setOpenNotif(false);
          },
          close: () => {
            dispatch(cartActions.getCart(token));
            setOpenNotif(false);
          },
        });
        setOpenNotif(true);
      }
      if (deleteCart.error) {
        setPropsNotif({
          title: 'Error',
          content: 'Error delete selected cart!',
          confirm: () => {
            dispatch(cartActions.getCart(token));
            setOpenNotif(false);
          },
          close: () => {
            dispatch(cartActions.getCart(token));
            setOpenNotif(false);
          },
        });
        setOpenNotif(true);
      }
    }
  }, [deleteCart.pending]);

  // increasing quantity
  const increaseQty = (i) => {
    setQuantity((prevQty) => {
      console.log(prevQty);
      return prevQty.map((item, index) => {
        item = index === i ? item + 1 : item;
        return item;
      });
    });
    console.log(quantity[i]);
    console.log(quantity);
  };

  // decrease quantity
  const decreaseQty = (i) => {
    setQuantity((prevQty) => {
      console.log(prevQty);
      return prevQty.map((item, index) => {
        item = index === i ? item - 1 : item;
        return item;
      });
    });
    console.log(quantity[i]);
    console.log(quantity);
  };

  // handle click delete
  const handleCheckDelete = (index) => {
    const arrDel = [...selectedArr];
    let {selected: deleteItem} = arrDel[index];
    deleteItem = !deleteItem;
    arrDel[index] = {
      ...arrDel[index],
      selected: deleteItem,
    };
    setSelectedArr(arrDel);
  };

  // handle delete all
  const handleDeleteAll = () => {
    if (selectedArr.length) {
      if (deleteAll) {
        console.log('undo delete all');
        let undoSelect = [...selectedArr];
        undoSelect = undoSelect.map((item) => {
          item = {
            ...item,
            selected: false,
          };
          return item;
        });
        setSelectedArr(undoSelect);
      } else {
        let selectAll = [...selectedArr];
        selectAll = selectAll.map((item) => {
          item = {
            ...item,
            selected: true,
          };
          return item;
        });
        setSelectedArr(selectAll);
      }
    }
  };

  const doDelete = () => {
    let newDelete = selectedArr.filter((item) => {
      item = item.selected;
      return item;
    });
    newDelete = newDelete.map((item) => {
      const deleteItem = {...item};
      delete deleteItem.selected;
      return deleteItem;
    });
    console.log(newDelete);
    setPropsNotif({
      title: 'Warning!',
      content: 'Are you sure want to remove from cart?',
      confirm: () => {
        dispatch(cartActions.deleteCart(token, newDelete));
        setOpenNotif(false);
      },
      close: () => {
        setOpenNotif(false);
      },
    });
    setOpenNotif(true);
  };

  const checkout = () => {
    const sellerArr = [
      ...new Set(
        dataCart
          .filter((item, index) => {
            item = selectedArr[index].selected;
            return item;
          })
          .map((item) => {
            item = item.seller_id;
            return item;
          }),
      ),
    ];
    const courierArr = sellerArr.map(() => '');
    const serviceArr = sellerArr.map(() => 0);
    const itemdetails_id = dataCart.map((item) => {
      item = item.itemdetails_id;
      return item;
    });
    console.log(courierArr);
    console.log(serviceArr);
    console.log(itemdetails_id);
    console.log(quantity);
    const data = {
      couriers: courierArr,
      services: serviceArr,
      itemdetails_id,
      quantity,
    };
    let newDelete = selectedArr.filter((item) => {
      item = item.selected;
      return item;
    });
    newDelete = newDelete.map((item) => {
      const deleteItem = {...item};
      delete deleteItem.selected;
      return deleteItem;
    });
    console.log(data);
    dispatch(cartActions.cartToCheckout(newDelete));
    dispatch(checkoutActions.addCheckoutData(data));
    history.push('/checkout');
  };

  return (
    <>
      <NavBarClient />
      <Container>
        {/* modal for notif */}
        <ModalConfirm modalOpen={openNotif} {...propsNotif} />

        {/* modal for loading state */}
        <ModalLoading modalOpen={deleteCart.pending} />

        <div className="h3 my-3">My Bag</div>
        <Row>
          <Col xs="12" md="7">
            <Card className="shadow-lg my-3">
              <div className="row no-gutters w-100">
                <Col xs="1" className="checkbox-wrapper-cart">
                  <div className="checkbox-inside">
                    <Input
                      type="checkbox"
                      name="primary_address"
                      id="primary_address"
                      color="success"
                      style={{paddingBottom: '0.25em'}}
                      className="ml-1 checkbox"
                      checked={deleteAll}
                      value={deleteAll}
                      onChange={() => handleDeleteAll()}
                    />
                  </div>
                </Col>
                <Col
                  xs="9"
                  className="d-flex align-items-center justify-content-start">
                  <text>
                    <strong>Select all items</strong>
                    <text className="text-muted">
                      {' '}
                      ({numberSelected} items selected)
                    </text>
                  </text>
                </Col>
                <Col
                  xs="2"
                  className="d-flex justify-content-end align-items-center p-2">
                  <Button
                    color="success"
                    disabled={!numberSelected}
                    outline
                    onClick={() => doDelete()}
                    className="btn-delete-cart">
                    Delete
                  </Button>
                </Col>
              </div>
            </Card>
            {/* eslint-disable-next-line no-nested-ternary */}
            {cart.dataCartPending ? (
              <div className="py-3 d-flex align-items-center justify-content-center">
                <Spinner color="success" size="sm" />
              </div>
            ) : !dataCart.length ? (
              <div className="py-3 d-flex align-items-center justify-content-center">
                <text className="text-center text-danger">
                  <small>
                    You haven&apos;t add anything in your cart, start shopping!
                  </small>
                </text>
              </div>
            ) : (
              dataCart.map((item, i) => (
                <Card className="d-flex py-2 mb-3 shadow-lg align-items-center justify-content-center">
                  <div className="row no-gutters w-100">
                    <Col xs="1" className="checkbox-wrapper-cart">
                      <div className="checkbox-inside">
                        <Input
                          type="checkbox"
                          name="primary_address"
                          id="primary_address"
                          color="success"
                          style={{paddingBottom: '0.25em'}}
                          className="ml-1 checkbox"
                          checked={
                            selectedArr[i] ? selectedArr[i].selected : false
                          }
                          value={
                            selectedArr[i] ? selectedArr[i].selected : false
                          }
                          onChange={() => handleCheckDelete(i)}
                        />
                      </div>
                    </Col>
                    <Col xs="5" className="p-1">
                      <div className="d-flex justify-content-start align-items-center">
                        <div
                          className="position-relative rounded overflow-hidden"
                          style={{
                            width: xs || md ? '3em' : '3.5em',
                            height: xs || md ? '3em' : '3.5em',
                          }}>
                          <img
                            src={
                              item.product_image_1
                                ? `${process.env.REACT_APP_URL_BACKEND}/${item.product_image_1}`
                                : photoDefault
                            }
                            className="img-fluid cart-img position-absolute"
                            alt={`product_${item.id}`}
                          />
                        </div>
                        <div className="ml-2 text-cart-wrapper align-items-start justify-content-center">
                          <div>
                            <text
                              style={{
                                fontSize: xs || md ? '0.75em' : '1em',
                                overflow: 'hidden',
                                lineHeight: '1.3em',
                                height: '2.5em',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflowWrap: 'break-word',
                                textOverflow: 'ellipsis',
                                width: '100%',
                              }}>
                              <strong>{item.name}</strong>
                            </text>
                            <text
                              style={{
                                fontSize: xs || md ? '0.5em' : '0.75em',
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
                              {item.color_name}
                            </text>
                            <text
                              style={{
                                fontSize: xs || md ? '0.5em' : '0.75em',
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
                              {item.store_name}
                            </text>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col
                      xs="3"
                      className="d-flex align-items-center justify-content-center">
                      <div className="d-flex w-100 align-items-center justify-content-center">
                        <Button
                          color="secondary"
                          disabled={quantity[i] <= 1}
                          className="shadow-lg rounded-circle position-relative"
                          style={{
                            width: '2em',
                            height: '2em',
                          }}
                          onClick={() => decreaseQty(i)}>
                          <text
                            className="position-absolute"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}>
                            &#8722;
                          </text>
                        </Button>
                        <div className="count-text">
                          <text className="text-center">{quantity[i]}</text>
                        </div>
                        <Button
                          color="light"
                          className="shadow-lg rounded-circle position-relative"
                          style={{
                            width: '2em',
                            height: '2em',
                          }}
                          onClick={() => increaseQty(i)}>
                          <text
                            className="position-absolute"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}>
                            &#43;
                          </text>
                        </Button>
                      </div>
                    </Col>
                    <Col
                      xs="3"
                      className="d-flex justify-content-end align-items-center p-2">
                      <text
                        style={{
                          fontSize: xs || md ? '0.75em' : '1em',
                        }}>
                        <strong>{currencyFormat(price[i])}</strong>
                      </text>
                    </Col>
                  </div>
                </Card>
              ))
            )}
          </Col>
          <Col xs="12" md="5" className="my-3">
            <Card className="shadow-lg py-3">
              <Container>
                <div className="mb-3">
                  <text>
                    <strong>Shopping summary</strong>
                  </text>
                </div>
                <div className="mb-2 d-flex justify-content-between">
                  <text className="text-muted">Total Price</text>
                  <text>
                    <strong>{currencyFormat(totalPrice)}</strong>
                  </text>
                </div>
                <Button
                  disabled={!numberSelected}
                  block
                  className="rounded-pill "
                  color="success"
                  onClick={checkout}>
                  BUY
                </Button>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
