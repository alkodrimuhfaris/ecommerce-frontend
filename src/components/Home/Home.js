import React from 'react';
import {Container, Row, Col, Spinner, Button} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import tukuIcon from '../../Assets/icons/category.png';
import NavBarClient from '../NavBarClient';
import CarouselHome from './Carousel';
import ItemCard from '../ItemCard';

import homeAction from '../../redux/actions/home';
import '../../Assets/style/Home.css';
import useWindowDimension from '../Helpers/useWindowDimension';

export default function Home() {
  const {xs, md} = useWindowDimension();
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.home.newData);
  const popularProducts = useSelector((state) => state.home.popularData);
  const pageInfo = useSelector((state) => state.getCategories.pageInfo);
  const categories = useSelector((state) => state.getCategories.categories);
  const getCategories = useSelector((state) => state.getCategories);
  const [pageCategory, setPageCategory] = React.useState(1);

  React.useEffect(() => {
    dispatch(homeAction.getPublicNew());
    dispatch(homeAction.getPublicPopular());
  }, []);

  React.useEffect(() => {
    dispatch(homeAction.getCategories(pageCategory));
  }, [pageCategory]);

  const next = (e) => {
    e.preventDefault();
    if (pageInfo.currentPage < pageInfo.pages) {
      setPageCategory(pageInfo.currentPage + 1);
    }
  };

  const prev = (e) => {
    e.preventDefault();
    if (pageInfo.currentPage > 1) {
      setPageCategory(pageInfo.currentPage - 1);
    }
  };

  return (
    <>
      <NavBarClient />
      <Container>
        <CarouselHome />

        <div className="h3">Category</div>
        <div className="text-muted">What are you looking for</div>

        <div className="row no-gutters position-relative mb-5">
          {getCategories.pending ? (
            <Col xs="12">
              <div className="py-3 d-flex align-items-center justify-content-center">
                <Spinner color="success" size="sm" />
              </div>
            </Col>
          ) : (
            categories.map((item) => (
              <Col xs="3" className={xs || md ? 'p-1' : 'p-3'}>
                <div className="position-relative overflow-hidden category-image-wrapper">
                  <img
                    className="center-position w-100 position-absolute"
                    src={
                      item.categories_image
                        ? `${process.env.REACT_APP_URL_BACKEND}/${item.categories_image}`
                        : tukuIcon
                    }
                    alt={`category_${item.id}`}
                  />
                  <div className="center-position filter-category-image position-absolute">
                    &nbsp;
                  </div>
                  <text
                    style={{
                      fontSize: xs || md ? '0.5em' : '0.75em',
                    }}
                    className="center-position position-absolute text-categories text-center text-white">
                    <strong>{item.name}</strong>
                  </text>
                </div>
              </Col>
            ))
          )}
          <div className="position-absolute btn-left-wrapper">
            <Button
              color="light"
              style={{
                height: xs || md ? '2em' : '2.5em',
                width: xs || md ? '2em' : '2.5em',
              }}
              className="shadow-lg button-circle position-relative"
              onClick={(e) => prev(e)}>
              <FiChevronLeft className="center-position position-absolute" />
            </Button>
          </div>
          <div className="shadow-sm position-absolute btn-right-wrapper">
            <Button
              color="light"
              style={{
                height: xs || md ? '2em' : '2.5em',
                width: xs || md ? '2em' : '2.5em',
              }}
              className="button-circle position-relative"
              onClick={(e) => next(e)}>
              <FiChevronRight className="center-position position-absolute" />
            </Button>
          </div>
        </div>

        <div className="h3">New</div>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <div className="text-muted">You've never seen it before</div>

        <Row className="no-gutters justify-content-md-center mt-3 mb-5">
          {newProducts.length
            ? newProducts.map((product) => <ItemCard product={product} />)
            : null}
        </Row>

        <div className="h3">Popular</div>
        <div className="text-muted">
          Find clothes that are trending recently
        </div>

        <Row className="no-gutters justify-content-md-center mt-3 mb-5">
          {popularProducts.length
            ? popularProducts.map((product) => <ItemCard product={product} />)
            : null}
        </Row>
      </Container>
    </>
  );
}
