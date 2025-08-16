import React from 'react';
import { Link } from 'react-router-dom';
import './ProductGrid.css';

const ProductGrid = React.memo(({ products }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Handle empty products array
  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>Không có sản phẩm nào để hiển thị</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="product-card-link">
          <div className="product-card">
            <div className="product-image">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                  loading="lazy"
                />
              ) : (
                <div className="product-image-placeholder">
                  <span className="product-icon">
                    {product.type === 'ring' ? '💍' : 
                     product.type === 'necklace' ? '📿' : 
                     product.type === 'earring' ? '💎' : '⭕'}
                  </span>
                </div>
              )}
              {product.isNew && <span className="product-badge new-badge">Mới</span>}
              {product.isSale && <span className="product-badge sale-badge">Giảm giá</span>}
              <div className="product-overlay">
                <button className="quick-view-btn">Xem nhanh</button>
              </div>
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-material">{product.material}</p>
              <div className="product-pricing">
                {product.isSale && product.oldPrice && (
                  <span className="old-price">{formatPrice(product.oldPrice)}</span>
                )}
                {product.price ? (
                  <span className="current-price">{formatPrice(product.price)}</span>
                ) : (
                  <span className="current-price">Liên hệ</span>
                )}
              </div>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid; 