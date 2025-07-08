import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/slices/jewelrySlice';
import { Row, Col, Alert } from 'antd';
import ProductImages from './components/ProductImages';
import ProductInfo from './components/ProductInfo';
import ProductActions from './components/ProductActions';
import ProductDescription from './components/ProductDescription';
import ProductMeta from './components/ProductMeta';
import RelatedProducts from './components/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <Alert message="Không tìm thấy sản phẩm" type="error" showIcon />;
  }

  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={10}>
          <ProductImages images={product.images} />
        </Col>
        <Col xs={24} md={14}>
          <ProductInfo product={product} />
          <div style={{ margin: '24px 0' }}>
            <ProductActions product={product} />
          </div>
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
        <Col xs={24} md={16}>
          <ProductDescription description={product.description} />
        </Col>
        <Col xs={24} md={8}>
          <ProductMeta product={product} />
        </Col>
      </Row>
      <Row style={{ marginTop: 48 }}>
        <Col span={24}>
          <RelatedProducts related={product.relatedProducts} allProducts={products} />
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail; 