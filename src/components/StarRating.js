import React from 'react';
import {FaStar} from 'react-icons/fa';

function StarRating({
  count = 5,
  inactiveColor = '#ddd',
  activeColor = '#f8ce0b',
  size = '1em',
  margin = 0,
  rating = 3.5,
}) {
  const starsOuter = [...Array(count)].map(() => (
    <FaStar
      size={size}
      style={{margin: `0 ${margin} 0 ${margin}`, color: inactiveColor}}
    />
  ));

  const starsInner = [...Array(count)].map(() => (
    <FaStar
      size={size}
      style={{margin: `0 ${margin} 0 ${margin}`, color: activeColor}}
    />
  ));

  rating = `${Math.round((rating / count) * 100)}%`;

  const starOuter = {
    display: 'inline-block',
  };

  const starInner = {
    top: 0,
    left: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: rating,
  };

  return (
    <div>
      <div style={starOuter} className="position-relative">
        {starsOuter}
        <div style={starInner} className="position-absolute">
          {starsInner}
        </div>
      </div>
    </div>
  );
}

export default StarRating;
