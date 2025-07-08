import React from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';

const fallbackImg = '/assets/products/placeholder.jpg';

const ProductImages = ({ images }) => {
  if (!images || images.length === 0) return null;
  return (
    <Carousel dots>
      {images.map((img, idx) => (
        <div key={idx}>
          <img
            src={img}
            alt={`product-img-${idx}`}
            style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
            onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
          />
        </div>
      ))}
    </Carousel>
  );
};

ProductImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};

export default ProductImages; 