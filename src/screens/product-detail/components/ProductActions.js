import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space } from 'antd';

const ProductActions = ({ product }) => {
  return (
    <Space direction="horizontal" size="middle">
      <Button type="primary" size="large">Thêm vào giỏ</Button>
      <Button size="large">Mua ngay</Button>
    </Space>
  );
};

ProductActions.propTypes = {
  product: PropTypes.object
};

export default ProductActions;

 