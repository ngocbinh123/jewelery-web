import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Rate, Tag } from 'antd';

const { Title, Paragraph } = Typography;

const ProductInfo = ({ product }) => {
  if (!product) return null;
  return (
    <div>
      <Title level={2}>{product.name}</Title>
      <Paragraph type="secondary">{product.material}</Paragraph>
      <div style={{ margin: '12px 0' }}>
        <span style={{ fontWeight: 700, fontSize: 24, color: '#d0021b' }}>{product.price.toLocaleString('vi-VN')}₫</span>
        {product.oldPrice && (
          <span style={{ marginLeft: 12, textDecoration: 'line-through', color: '#888' }}>{product.oldPrice.toLocaleString('vi-VN')}₫</span>
        )}
      </div>
      <Rate allowHalf disabled defaultValue={product.rating} style={{ fontSize: 18 }} />
      <div style={{ margin: '12px 0' }}>
        {product.tags && product.tags.map((tag, idx) => <Tag key={idx}>{tag}</Tag>)}
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object
};

export default ProductInfo; 