import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Col, CardImg, CardSubtitle} from 'reactstrap';
import StarRating from './StarRating';
import currencyFormat from '../helpers/currencyFormat';
import photoDefault from '../Assets/images/TukuIcon.png';
import '../Assets/style/ItemCard.css';

export default function ItemCard({product}) {
  const titleStyle = {
    overflow: 'hidden',
    width: '100%',
    lineHeight: '1.3em',
    height: '2.5em',
    marginBottom: '1em',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
  };

  const storeStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '0.75em',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    margin: '0.5em 0 0.5em 0',
  };
  return (
    <Col xs="6" sm="4" md="3" lg="2" className="p-2">
      <Link
        to={`/product/${product.id}`}
        style={{textDecoration: 'none', color: 'black'}}>
        <div className="card-wrapper shadow pt-0 pb-1">
          <div className="position-relative image-wrapper">
            <CardImg
              className="position-absolute image-product"
              top
              width="100%"
              src={
                product.product_image_1
                  ? `${process.env.REACT_APP_URL_BACKEND}/${product.product_image_1}`
                  : photoDefault
              }
              alt="Product image"
            />
          </div>
          <Container className="my-3">
            <div style={titleStyle}>{product.name}</div>
            <CardSubtitle>
              <strong color="success">{currencyFormat(product.price)}</strong>
            </CardSubtitle>
            <CardSubtitle style={storeStyle} className="text-muted">
              {product.store_name || 'Tuku Store'}
            </CardSubtitle>
            <CardSubtitle className="d-flex">
              <span>
                <StarRating rating={product.rating} />
              </span>
              <span className="ml-1 text-muted">
                ({product.ratingCount || 0})
              </span>
            </CardSubtitle>
          </Container>
        </div>
      </Link>
    </Col>
  );
}
