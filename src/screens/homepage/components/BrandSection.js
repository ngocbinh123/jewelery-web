import React from 'react';
import { useSelector } from 'react-redux';
import { selectBrands } from '../../../store/slices/jewelrySlice';
import './BrandSection.css';

const BrandSection = React.memo(() => {
  const brands = useSelector(selectBrands);

  return (
    <section className="brand-section">
      <div className="brand-container">
        <div className="section-header">
          <h2 className="section-title">Đối tác của chúng tôi</h2>
          <p className="section-subtitle">Hợp tác cùng các thương hiệu hàng đầu</p>
        </div>
        
        <div className="brand-grid">
          {brands.map((brand, index) => (
            <div key={index} className="brand-item">
              <div className="brand-logo">
                <div className="brand-placeholder">
                  {brand.name}
                </div>
              </div>
            </div>
          ))}
          
          {/* Add more placeholder brands for visual balance */}
          <div className="brand-item">
            <div className="brand-logo">
              <div className="brand-placeholder">CARTIER</div>
            </div>
          </div>
          <div className="brand-item">
            <div className="brand-logo">
              <div className="brand-placeholder">TIFFANY</div>
            </div>
          </div>
          <div className="brand-item">
            <div className="brand-logo">
              <div className="brand-placeholder">BULGARI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BrandSection.displayName = 'BrandSection';

export default BrandSection; 