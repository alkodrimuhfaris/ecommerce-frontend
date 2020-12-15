import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import carousel2 from '../../Assets/images/carousel2.png';
import carousel3 from '../../Assets/images/carousel3.png';
import '../../Assets/style/Home.css';

const items = [
  {
    key: 0,
    src: carousel2,
    altText: 'Trending 2020',
    caption: 'Trending 2020',
  },
  {
    key: 1,
    src: carousel3,
    altText: 'All new items',
    caption: 'All new items',
  },
];

export default function HomeCarousel(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => (
    <CarouselItem
      className="container-image"
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.key}
    >
      <img className="img-carousel" src={item.src} alt={item.altText} />
      <CarouselCaption className="caption-carousel" captionHeader={item.caption} />
    </CarouselItem>
  ));

  return (
    <Carousel
      className="carousel"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}
