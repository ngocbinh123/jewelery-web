import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectBestSellerProducts } from '../../../store/slices/jewelrySlice';
import ProductGrid from './ProductGrid';
import { motion } from 'framer-motion';
import './BestSellerSection.css';

const BestSellerSection = React.memo(() => {
  const bestSellerProducts = useSelector(selectBestSellerProducts);

  return (
    <section id="best-seller-section" className="best-seller-section">
      <motion.div
        className="best-seller-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="section-header">
          <h2 className="section-title">Bán chạy nhất</h2>
          <p className="section-subtitle">Khám phá các sản phẩm được yêu thích nhất</p>
        </div>
        <ProductGrid products={bestSellerProducts} />
        <div className="section-actions">
          <Link to="/best-seller" className="view-all-button">
            Xem tất cả
          </Link>
        </div>
      </motion.div>
    </section>
  );
});

BestSellerSection.displayName = 'BestSellerSection';

export default BestSellerSection; 