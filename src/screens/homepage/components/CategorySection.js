import React from 'react';
import './CategorySection.css';
import { motion } from 'framer-motion';

const CategorySection = React.memo(() => {
  const categories = [
    { id: 'ring', name: 'Nhẫn', icon: '💍', count: '15+ sản phẩm' },
    { id: 'necklace', name: 'Dây chuyền', icon: '📿', count: '20+ sản phẩm' },
    { id: 'earring', name: 'Bông tai', icon: '💎', count: '12+ sản phẩm' },
    { id: 'bracelet', name: 'Lắc tay', icon: '⭕', count: '18+ sản phẩm' },
    { id: 'watch', name: 'Đồng hồ', icon: '⌚', count: '8+ sản phẩm' }
  ];

  return (
    <section className="category-section">
      <motion.div
        className="category-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="section-header">
          <h2 className="section-title">Mua sắm theo danh mục</h2>
          <p className="section-subtitle">Khám phá bộ sưu tập đa dạng của chúng tôi</p>
        </div>
        
        <div className="category-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <div className="category-icon">
                {category.icon}
              </div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-count">{category.count}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

CategorySection.displayName = 'CategorySection';

export default CategorySection; 