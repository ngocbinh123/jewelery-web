import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions, Badge } from 'antd';

const ProductMeta = ({ product }) => {
  if (!product) return null;
  return (
    <Descriptions title="Thông tin chi tiết" bordered column={1} size="small">
      <Descriptions.Item label="SKU">{product.sku}</Descriptions.Item>
      <Descriptions.Item label="Kích thước">{product.size}</Descriptions.Item>
      <Descriptions.Item label="Chất liệu">{product.material}</Descriptions.Item>
      <Descriptions.Item label="Tình trạng">
        {product.inStock ? <Badge status="success" text="Còn hàng" /> : <Badge status="error" text="Hết hàng" />}
      </Descriptions.Item>
    </Descriptions>
  );
};

ProductMeta.propTypes = {
  product: PropTypes.object
};

export default ProductMeta; 