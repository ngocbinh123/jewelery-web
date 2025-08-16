import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Rate, Tag } from 'antd';

const { Title, Paragraph } = Typography;

const ProductInfo = ({ product }) => {
  if (!product || !product.name) return null;
  return (
    <div>
      <Title level={2}>{product.name}</Title>
      <Paragraph type="secondary">{product.material || 'Không có mô tả'}</Paragraph>
      <div style={{ margin: '12px 0' }}>
        <span style={{ fontWeight: 700, fontSize: 24, color: '#d0021b' }}>
          {product.price ? `${product.price.toLocaleString('vi-VN')}₫` : 'Liên hệ'}
        </span>
        {product.oldPrice && (
          <span style={{ marginLeft: 12, textDecoration: 'line-through', color: '#888' }}>
            {product.oldPrice ? `${product.oldPrice.toLocaleString('vi-VN')}₫` : ''}
          </span>
        )}
      </div>
      {product.rating && (
        <Rate allowHalf disabled defaultValue={product.rating} style={{ fontSize: 18 }} />
      )}
      <div style={{ margin: '12px 0' }}>
        {product.tags && Array.isArray(product.tags) && product.tags.map((tag, idx) => 
          tag ? <Tag key={idx}>{tag}</Tag> : null
        )}
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object
};

export default ProductInfo; 