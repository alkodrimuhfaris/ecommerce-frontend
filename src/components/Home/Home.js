import React from 'react';
import {Container, Row} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import NavBarClient from '../NavBarClient';
import CarouselHome from './Carousel';
import ItemCard from '../ItemCard';

import homeAction from '../../redux/actions/home';
import '../../Assets/style/Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.home.newData);
  const popularProducts = useSelector((state) => state.home.popularData);

  React.useEffect(() => {
    dispatch(homeAction.getPublicNew());
    dispatch(homeAction.getPublicPopular());
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
            ? newProducts.map((product) => <ItemCard product={product} />)
            : null}
        </Row>

        <div className="h3">Popular</div>
        <div className="text-muted">
          Find clothes that are trending recently
        </div>

        <Row className="justify-content-md-center mt-3 mb-5">
          {popularProducts.length
            ? popularProducts.map((product) => <ItemCard product={product} />)
            : null}
        </Row>
      </Container>
    </>
  );
}
