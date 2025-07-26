import React from 'react';
import { useSelector } from 'react-redux';
import { selectHighlightProducts } from '../../../store/slices/jewelrySlice';
import ProductGrid from './ProductGrid';
import { motion } from 'framer-motion';
import './BestSellerSection.css'; // Reuse styles for consistency

const HighlightSection = React.memo(() => {
  const highlightProducts = useSelector(selectHighlightProducts);

  return (
    <section id="highlight-section" className="best-seller-section">
      <motion.div
        className="best-seller-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="section-header">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <p className="section-subtitle">Khám phá tất cả sản phẩm nổi bật của chúng tôi</p>
        </div>
        <ProductGrid products={highlightProducts} />
        <div className="section-actions">
          <button className="view-all-button">Xem tất cả</button>
        </div>
      </motion.div>
    </section>
  );
});

HighlightSection.displayName = 'HighlightSection';

export default HighlightSection; 