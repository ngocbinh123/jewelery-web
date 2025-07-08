import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const ProductDescription = ({ description }) => (
  <div style={{ marginBottom: 24 }}>
    <Typography.Title level={4}>Mô tả sản phẩm</Typography.Title>
    <Paragraph>{description}</Paragraph>
  </div>
);

ProductDescription.propTypes = {
  description: PropTypes.string
};

export default ProductDescription; 