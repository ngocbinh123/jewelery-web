import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectNewArrivalProducts } from '../../../store/slices/jewelrySlice';
import ProductGrid from './ProductGrid';
import { motion } from 'framer-motion';
import './BestSellerSection.css';

const NewArrivalSection = React.memo(() => {
  const newArrivals = useSelector(selectNewArrivalProducts);

  return (
    <section id="new-arrival-section" className="best-seller-section">
      <motion.div
        className="best-seller-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="section-header">
          <h2 className="section-title">Hàng mới về</h2>
          <p className="section-subtitle">Khám phá các sản phẩm mới nhất</p>
        </div>
        <ProductGrid products={newArrivals} />
        <div className="section-actions">
          <Link to="/new-arrivals" className="view-all-button">
            Xem tất cả
          </Link>
        </div>
      </motion.div>
    </section>
  );
});

NewArrivalSection.displayName = 'NewArrivalSection';

export default NewArrivalSection; 