import React from 'react';
import {
  Container,
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import {connect} from 'react-redux';
import NavBarClient from '../NavBarClient';
import carouselImg from '../../Assets/images/carousel2.png';
import arrow from '../../Assets/icons/arrow.svg';
import itemAction from '../../redux/actions/items';
import photoDefault from '../../Assets/images/TukuIcon.png';
import StarRating from '../StarRating';
import {Link} from 'react-router-dom';
import currencyFormat from '../../helpers/currencyFormat';
// @ts-ignore

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getNewItems('1', '15');
    this.props.getPopularItems('1', '15');
  }

  // componentDidUpdate(){
  //   this.props.getNewItems('1', '15')
  //   this.props.getPopularItems('1', '15')
  // }

  imgProduct = (product) =>
    // process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_1
    // || process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_2
    // || process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_3
    // || process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_4
    // ||
    photoDefault;

  titleStyle = {
    overflow: 'hidden',
    width: '100%',
    lineHeight: '1.1em',
    height: '2.2em',
    marginBottom: '1em',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
  };

  storeStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '0.75em',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    margin: '0.5em 0 0.5em 0',
  };

  render() {
    const newProducts = this.props.items.dataNewItems;
    const popularProducts = this.props.items.dataPopularItems;
    return (
      <>
        <NavBarClient />
        <Container>
          <div className="my-5">

            <div className="upper-carousel">
              <div className="position-relative">
                <div className="overflow-auto">
                  <div className="d-flex">
                    <div className="card position-relative mr-3 ml-3">
                      <a className="card-container" href="#">
                        <img className="rounded" src={carouselImg} alt="" />
                        <div
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                          }}
                          className="w-100 position-absolute text-center"
                        >
                          Trends in 2020
                        </div>
                      </a>
                    </div>
                  </div>

                  <button className="btn position-absolute rounded-circle prev">
                  <img src={arrow} alt="prev" />
                </button>

                <button className="btn position-absolute rounded-circle next">
                  <img src={arrow} alt="next" />
                </button>
              </div>

              <div className="dots d-flex justify-align-between">
                <button className="rounded-circle">&nbsp;</button>
                <button className="rounded-circle">&nbsp;</button>
                <button className="rounded-circle">&nbsp;</button>
                <button className="rounded-circle">&nbsp;</button>
                <div className="dot-wrapper"></div>
                <div className="dot-wrapper"></div>
                <div className="dot-wrapper"></div>
                <div className="dot-wrapper"></div>
              </div>
            </div>

          </div>

          <div className="h3">New</div>
          <div className="text-muted">You've never seen it before</div>

          <Row className="justify-content-md-center mt-3 mb-5">
            {newProducts.length &&
            newProducts.map((product)=> {
                return (
                  <Col xs="5" sm="4" md="3" lg="2" className="m-2">
                    <Link
                      to={`/product/${product.id}`}
                      style={{textDecoration: 'none', color: 'black'}}
                    >
                      <Card className="shadoq">
                        <CardImg
                          top
                          width="100%"
                          src={this.imgProduct(product)}
                          alt="Product image"
                        />
                        <Container className="my-3">
                          <div style={this.titleStyle}>{product.name}</div>
                          <CardSubtitle>
                            <strong className="text-success">
                              {currencyFormat(product.price)}
                            </strong>
                          </CardSubtitle>
                          <CardSubtitle
                            style={this.storeStyle}
                            className="text-muted"
                          >
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
                      </Card>
                    </Link>
                  </Col>
                );
              })}
          </Row>

          <div className="h3">Popular</div>
          <div className="text-muted">Find clothes that are trending recently</div>

          <Row className="justify-content-md-center mt-3 mb-5">
            {popularProducts.length &&
              popularProducts.map((product) => {
                return (
                  <Col xs="5" sm="4" md="3" lg="2" className="m-2">
                    <Link
                      to={`/product/${product.id}`}
                      style={{textDecoration: 'none', color: 'black'}}
                    >
                      <Card className="shadow">
                        <CardImg
                          top
                          width="100%"
                          height="50%"
                          src={this.imgProduct(product)}
                          alt="Product image"
                        />
                        <Container className="my-3">
                          <div style={this.titleStyle}>{product.name}</div>
                          <CardSubtitle>
                            <strong className="text-success">
                              {currencyFormat(product.price)}
                            </strong>
                          </CardSubtitle>
                          <CardSubtitle
                            style={this.storeStyle}
                            className="text-muted"
                          >
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
                      </Card>
                    </Link>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  items: state.items,
});

const mapDispatchToProps = {
  getNewItems: itemAction.getNewItems,
  getPopularItems: itemAction.getPopularItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
