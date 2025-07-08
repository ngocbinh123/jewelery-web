import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../store/slices/jewelrySlice';
import ProductGrid from './ProductGrid';
import './BestSellerSection.css';

const BestSellerSection = React.memo(() => {
  const allProducts = useSelector(selectProducts);
  
  // Get featured products (first 4 products)
  const bestSellerProducts = allProducts.slice(0, 4);

  return (
    <section id="best-seller-section" className="best-seller-section">
      <div className="best-seller-container">
        <div className="section-header">
          <h2 className="section-title">Bán chạy nhất</h2>
          <p className="section-subtitle">Khám phá các sản phẩm được yêu thích nhất</p>
        </div>
        
        <ProductGrid products={bestSellerProducts} />
        
        <div className="section-actions">
          <button className="view-all-button">Xem tất cả</button>
        </div>
      </div>
    </section>
  );
});

BestSellerSection.displayName = 'BestSellerSection';

export default BestSellerSection; 