import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ related, allProducts }) => {
  if (!related || !allProducts) return null;
  const relatedProducts = allProducts.filter((p) => related.includes(p.id));
  if (relatedProducts.length === 0) return null;
  return (
    <div>
      <h3>Sản phẩm liên quan</h3>
      <Row gutter={[16, 16]}>
        {relatedProducts.map((product) => (
          <Col xs={12} md={6} key={product.id}>
            <Link to={`/product/${product.id}`}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.image} style={{ height: 120, objectFit: 'cover' }} />}
                title={product.name}
              >
                <div style={{ fontWeight: 700, color: '#d0021b' }}>{product.price.toLocaleString('vi-VN')}₫</div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

RelatedProducts.propTypes = {
  related: PropTypes.arrayOf(PropTypes.string),
  allProducts: PropTypes.array
};

export default RelatedProducts; 