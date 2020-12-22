import React from 'react';
import {Container, Card, CardImg, CardSubtitle, Row, Col} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import NavBarClient from '../NavBarClient';
import photoDefault from '../../Assets/images/TukuIcon.png';
import StarRating from '../StarRating';
import currencyFormat from '../../helpers/currencyFormat';
import CarouselHome from './Carousel';

import homeAction from '../../redux/actions/home';
import '../../Assets/style/Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.home.newData);
  const popularProducts = useSelector((state) => state.home.popularData);
  const isSeller = useSelector((state) => state.auth.isSeller);

  React.useEffect(() => {
    dispatch(homeAction.getPublicNew());
    dispatch(homeAction.getPublicPopular());
    console.log(isSeller);
  }, []);

  return (
    <>
      <NavBarClient />
      <Container>
        <CarouselHome />

        <div className="h3">New</div>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <div className="text-muted">You've never seen it before</div>

        <Row className="justify-content-md-center mt-3 mb-5">
          {newProducts.length
            ? newProducts.map((product) => (
                <Col xs="5" sm="4" md="3" lg="2" className="m-2">
                  <Link
                    to={`/product/${product.id}`}
                    style={{textDecoration: 'none', color: 'black'}}>
                    <Card className="shadoq">
                      <CardImg
                        top
                        width="100%"
                        src={
                          product.product_image_1
                            ? product.product_image_1
                            : photoDefault
                        }
                        alt="Product image"
                      />
                      <Container className="my-3">
                        <div className="title-style">{product.name}</div>
                        <CardSubtitle>
                          <strong className="text-success">
                            {currencyFormat(product.price)}
                          </strong>
                        </CardSubtitle>
                        <CardSubtitle className="text-muted store-style">
                          {product.store_name || 'Tuku Store'}
                        </CardSubtitle>
                        <CardSubtitle className="d-flex">
                          <span>
                            <StarRating rating={product.rating} />
                          </span>
                          <span className="ml-1 text-muted">
                            {`(${product.ratingCount || 0})`}
                          </span>
                        </CardSubtitle>
                      </Container>
                    </Card>
                  </Link>
                </Col>
              ))
            : null}
        </Row>

        <div className="h3">Popular</div>
        <div className="text-muted">
          Find clothes that are trending recently
        </div>

        <Row className="justify-content-md-center mt-3 mb-5">
          {popularProducts.length
            ? popularProducts.map((product) => (
                <Col xs="5" sm="4" md="3" lg="2" className="m-2">
                  <Link
                    to={`/product/${product.id}`}
                    style={{textDecoration: 'none', color: 'black'}}>
                    <Card className="shadow">
                      <CardImg
                        top
                        width="100%"
                        height="50%"
                        src={
                          product.product_image_1
                            ? product.product_image_1
                            : photoDefault
                        }
                        alt="Product image"
                      />
                      <Container className="my-3">
                        <div className="title-style">{product.name}</div>
                        <CardSubtitle>
                          <strong className="text-success">
                            {currencyFormat(product.price)}
                          </strong>
                        </CardSubtitle>
                        <CardSubtitle className="text-muted store-style">
                          {product.store_name || 'Tuku Store'}
                        </CardSubtitle>
                        <CardSubtitle className="d-flex">
                          <span>
                            <StarRating rating={product.rating} />
                          </span>
                          <span className="ml-1 text-muted">
                            {`(${product.ratingCount || 0})`}
                          </span>
                        </CardSubtitle>
                      </Container>
                    </Card>
                  </Link>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </>
  );
}
