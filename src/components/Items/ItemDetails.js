import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Row, Col, Container, Button, Input, Tooltip} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {FaStar} from 'react-icons/fa';
import {Helmet} from 'react-helmet';
import NavBarClient from '../NavBarClient';
import itemActions from '../../redux/actions/items';
import StarRating from '../StarRating';
import cartActions from '../../redux/actions/cart';
import currencyFormat from '../../helpers/currencyFormat';
import ModalConfirm from '../ModalConfirm';
import ModalLoading from '../ModalLoading';
import ItemCard from '../ItemCard';
import '../../Assets/style/ItemDetail.css';

export default function ItemDetails() {
  const {id} = useParams();
  const product = useSelector((state) => state.items.detailItem);
  const colorProduct = useSelector((state) => state.items.detailColorItem);
  const detailItemPending = useSelector(
    (state) => state.items.detailItemPending,
  );
  const productsNew = useSelector((state) => state.items.dataNewItems);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const [colorSelected, setColorSelected] = useState(null);
  const [selectQty, setSelectQty] = useState(1);
  const cart = useSelector((state) => state.cart);
  const [ratingArr] = Object.keys(product).length ? product.rating : [0];
  const imgArr = [
    product.product_image_1,
    product.product_image_2,
    product.product_image_3,
    product.product_image_4,
  ].filter((item) => item);
  const [picShow, setPicShow] = useState(
    `${process.env.REACT_APP_URL_BACKEND}/${product.product_image_1}`,
  );
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [addBagAlert, setAddBagAlert] = useState(false);

  const toggle = () => {
    if (!colorSelected) {
      setTooltipOpen(!tooltipOpen);
    } else {
      setTooltipOpen(false);
    }
  };

  useEffect(() => {
    dispatch(itemActions.getNewItems('1', '15'));
  }, []);

  useEffect(() => {
    dispatch(itemActions.getDetailItem(id));
  }, [id]);

  const selectedPict = (link, e) => {
    e.preventDefault();
    setPicShow(link);
  };

  useEffect(() => {
    setPicShow(
      `${process.env.REACT_APP_URL_BACKEND}/${product.product_image_1}`,
    );
  }, [product]);

  const pushTo = (path, e) => {
    e.preventDefault();
    history.push(path);
  };

  const addBagHandler = (e) => {
    e.preventDefault();
    if (colorSelected) {
      dispatch(cartActions.postCart(token, selectQty, id, colorSelected));
    }
  };

  useEffect(() => {
    if (cart.postCartSuccess || cart.postCartError) {
      // eslint-disable-next-line no-undef
      setAddBagAlert(true);
    }
  }, [cart.postCartPending]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${
          product.name ? product.name : 'Tuku!'
        } Find All you need here! || Tuku!`}</title>
      </Helmet>
      <NavBarClient />
      <Container>
        <ModalLoading modalOpen={detailItemPending} />
        <Row className="my-5">
          <Col xs="12" sm="4" md="4">
            <Row>
              <Col xs="12" className="mb-2">
                <div className="position-relative rounded picture-product-show-wrapper">
                  <img
                    src={picShow}
                    alt="pic showed"
                    className="rounded img-fluid picture-product"
                  />
                </div>
              </Col>
              <Col xs="12" className="mb-2">
                <div className="d-flex">
                  {imgArr.length
                    ? imgArr.map((link, index) => {
                        const uri = `${process.env.REACT_APP_URL_BACKEND}/${link}`;
                        return link ? (
                          <div className="w-25">
                            <button
                              style={index === 0 ? {} : {marginLeft: '10%'}}
                              type="button"
                              className="btn rounded position-relative picture-selector-wrapper"
                              onClick={(e) => selectedPict(uri, e)}>
                              <img
                                src={uri}
                                alt="pic selector"
                                className="rounded position-absolute img-fluid w-100 image-selector"
                              />
                            </button>
                          </div>
                        ) : null;
                      })
                    : null}
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs="12" sm="8" md="8">
            <Row>
              <Col xs="12" className="h3">
                {product.name}
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="text-muted">
                {product.store_name}
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs="12" className="d-flex">
                <span>
                  <StarRating rating={ratingArr.ratingAvg} />
                </span>
                <span className="ml-1 text-muted">
                  ({ratingArr.ratingCount || 0})
                </span>
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs="12">Price</Col>
              <Col xs="12" className="text-success h5">
                {currencyFormat(product.price)}
              </Col>
            </Row>
            <Row className="my-3">
              <Tooltip
                target="openTooltip"
                isOpen={tooltipOpen}
                toggle={toggle}
                placement="top">
                Choose one of the color!
              </Tooltip>
              <Col xs="12" className="h6">
                <text name="openTooltip" id="openTooltip">
                  Color
                </text>
              </Col>
              <Col xs="12" className="d-flex">
                {colorProduct.length
                  ? colorProduct.map((details) => {
                      const border =
                        colorSelected === details.id ? '1px solid red' : 'none';
                      return (
                        <div
                          style={{width: '2em', height: '2em', border}}
                          className="mr-2 position-relative rounded-circle">
                          <Button
                            disabled={!details.available}
                            style={{
                              backgroundColor: details.hex,
                              opacity: details.available ? 1 : 0.2,
                              width: '80%',
                              height: '80%',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                            className="rounded-circle position-absolute border-0"
                            onClick={() => setColorSelected(details.id)}
                            active={colorSelected === details.id}>
                            &nbsp;
                          </Button>
                        </div>
                      );
                    })
                  : null}
              </Col>
            </Row>
            <Row>
              <Col xs="6" md="4" lg="3">
                <div>
                  <strong>Quantity</strong>
                </div>
                <div className="d-flex">
                  <Button
                    color="secondary"
                    disabled={selectQty <= 0}
                    className="rounded-circle"
                    onClick={() =>
                      setSelectQty((prevSelectQty) => prevSelectQty - 1)
                    }>
                    &#8722;
                  </Button>
                  <Input
                    className="text-center border-0"
                    style={{border: 'none', width: '4em'}}
                    type="number"
                    name="quantity"
                    value={selectQty}
                    onChange={(e) => setSelectQty(e.target.value)}
                  />
                  <Button
                    color="light"
                    disabled={product.stock <= selectQty}
                    className="rounded-circle"
                    onClick={() =>
                      setSelectQty((prevSelectQty) => prevSelectQty + 1)
                    }>
                    &#43;
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="my-3">
              <Col xs="6" md="3" className="my-1">
                <Button
                  outline
                  color="dark"
                  className="w-100 rounded-pill"
                  style={{fontSize: '0.75em'}}
                  // onClick={(e) => pushTo('/chat', e)}
                  disabled
                >
                  Chat
                </Button>
              </Col>
              <Col xs="6" md="3" className="my-1">
                <Button
                  outline
                  color="dark"
                  className="w-100 rounded-pill"
                  style={{fontSize: '0.75em'}}
                  onMouseEnter={toggle}
                  onMouseLeave={toggle}
                  onClick={colorSelected ? (e) => addBagHandler(e) : null}>
                  Add bag
                </Button>
                <ModalLoading modalOpen={cart.postCartPending} />
                <ModalConfirm
                  modalOpen={addBagAlert}
                  title={
                    // eslint-disable-next-line no-nested-ternary
                    cart.postCartSuccess
                      ? 'Success!'
                      : cart.postCartError
                      ? 'Error!'
                      : 'Warning'
                  }
                  content={
                    // eslint-disable-next-line no-nested-ternary
                    cart.postCartSuccess
                      ? 'Success add item to cart'
                      : cart.postCartError
                      ? 'Error add item to cart'
                      : 'There is something not right'
                  }
                  confirm={() => setAddBagAlert(false)}
                  close={() => setAddBagAlert(false)}
                />
              </Col>
              <Col xs="12" md="6">
                <Button
                  color="success"
                  className="w-100 rounded-pill"
                  style={{fontSize: '0.75em'}}
                  onMouseEnter={toggle}
                  onMouseLeave={toggle}
                  onClick={
                    colorSelected ? (e) => pushTo('/checkout', e) : null
                  }>
                  Buy Now
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="h4 my-4">Informasi Produk</div>
        <div className="h5 mt-4">Condition</div>
        <div className="h5 text-success my-2">{product.item_condition}</div>

        <div className="h5 mt-4">Description</div>
        <article className="text-muted my-2">{product.description}</article>

        <div className="h5 mt-4">Product Review</div>
        <Row>
          <Col xs="5" md="3" lg="3">
            <div>
              <span className="display-4">
                {Math.round(ratingArr.ratingAvg * 10) / 10}
              </span>
              <span>/5</span>
            </div>
            <div>
              <StarRating rating={ratingArr.ratingAvg} />
            </div>
          </Col>
          <Col xs="7" md="4" lg="4">
            {ratingArr &&
              ratingArr.starCount.map((starCount, i) => {
                const width = `${(starCount * 100) / ratingArr.ratingCount}%`;
                i = 5 - i;
                console.log(i);
                return (
                  <Row>
                    <Col xs="1">
                      <FaStar style={{color: '#f8ce0b'}} />
                    </Col>
                    <Col xs="1" className="text-muted">
                      {i}
                    </Col>
                    <Col xs="7">
                      <div
                        className="position-relative"
                        style={{width: '100%', height: '100%'}}>
                        <div
                          className="bg-success position-absolute"
                          style={{
                            width,
                            height: '20%',
                            left: 0,
                            transform: 'translateY(180%)',
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs="1" className="px-0">
                      {starCount}
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>

        <div className="w-100 border-bottom my-3" />

        <div className="h3">You can also like this</div>
        <div className="text-muted">You&apos;ve never seen it before</div>

        <Row className="justify-content-md-center mt-3 mb-5">
          {productsNew.length &&
            productsNew.map((productItem) => (
              <ItemCard product={productItem} />
            ))}
        </Row>
      </Container>
    </>
  );
}
