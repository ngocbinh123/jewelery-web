import React from 'react';
import { Card, Tag, Button, Space, Typography, Tooltip } from 'antd';
import { 
  HeartOutlined, 
  HeartFilled, 
  EyeOutlined, 
  SwapOutlined 
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectWishlist, 
  selectCompareList,
  addToWishlist, 
  removeFromWishlist,
  addToCompare,
  removeFromCompare 
} from '../../../store/slices/collectionSlice';
import './ProductCard.css';

const { Text, Title } = Typography;
const { Meta } = Card;

/**
 * ProductCard Component
 * Responsibility: Display individual product with actions
 * Follows Single Responsibility Principle and Open/Closed Principle
 */
const ProductCard = React.memo(({ 
  product,
  viewMode = 'grid', // 'grid' | 'list'
  showQuickActions = true,
  className = "",
  onProductClick,
  onQuickView
}) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const compareList = useSelector(selectCompareList);
  
  const isInWishlist = wishlist.includes(product.id);
  const isInCompare = compareList.includes(product.id);
  const canAddToCompare = compareList.length < 3;

  // Price formatting utility
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (product.isSale && product.oldPrice) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  };

  // Event handlers following Single Responsibility Principle
  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation();
    if (isInCompare) {
      dispatch(removeFromCompare(product.id));
    } else if (canAddToCompare) {
      dispatch(addToCompare(product.id));
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView?.(product);
  };



  const handleProductClick = () => {
    onProductClick?.(product);
  };

  // Product icon based on type
  const getProductIcon = () => {
    const iconMap = {
      ring: '💍',
      necklace: '📿',
      earring: '💎',
      bracelet: '⭕'
    };
    return iconMap[product.type] || '💎';
  };

  // Render grid view
  const renderGridView = () => (
    <Card
      className={`product-card grid-view ${className}`}
      hoverable
      onClick={handleProductClick}
      cover={
        <div className="product-image-container">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
          ) : (
            <div className="product-image-placeholder">
              <span className="product-type-icon">
                {getProductIcon()}
              </span>
            </div>
          )}
          
          {/* Product badges */}
          <div className="product-badges">
            {product.isNew && <Tag color="green">Mới</Tag>}
            {product.isSale && (
              <Tag color="red">-{getDiscountPercentage()}%</Tag>
            )}
          </div>

          {/* Quick actions overlay */}
          {showQuickActions && (
            <div className="quick-actions-overlay">
              <Space direction="vertical" size="small">
                <Tooltip title={isInWishlist ? "Bỏ yêu thích" : "Yêu thích"}>
                  <Button
                    type="text"
                    icon={isInWishlist ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleWishlistToggle}
                    className={`action-btn ${isInWishlist ? 'active' : ''}`}
                  />
                </Tooltip>
                
                <Tooltip title="Xem nhanh">
                  <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={handleQuickView}
                    className="action-btn"
                  />
                </Tooltip>
                
                <Tooltip title={
                  isInCompare ? "Bỏ khỏi so sánh" : 
                  !canAddToCompare ? "Tối đa 3 sản phẩm" : "So sánh"
                }>
                  <Button
                    type="text"
                    icon={<SwapOutlined />}
                    onClick={handleCompareToggle}
                    disabled={!canAddToCompare && !isInCompare}
                    className={`action-btn ${isInCompare ? 'active' : ''}`}
                  />
                </Tooltip>
              </Space>
            </div>
          )}
        </div>
      }
      actions={[]}
    >
      <Meta
        title={
          <Tooltip title={product.name}>
            <Title level={5} ellipsis className="product-title">
              {product.name}
            </Title>
          </Tooltip>
        }
        description={
          <div className="product-details">
            <Text type="secondary" className="product-material">
              {product.material}
            </Text>
            
            <div className="product-pricing">
              {product.isSale && product.oldPrice && (
                <Text delete className="old-price">
                  {formatPrice(product.oldPrice)}
                </Text>
              )}
              <Text strong className="current-price">
                {product.price ? formatPrice(product.price) : 'Liên hệ'}
              </Text>
            </div>
            
            <Text type="secondary" className="product-sku">
              SKU: {product.sku}
            </Text>
          </div>
        }
      />
    </Card>
  );

  // Render list view
  const renderListView = () => (
    <Card
      className={`product-card list-view ${className}`}
      hoverable
      onClick={handleProductClick}
    >
      <div className="list-content">
        <div className="product-image-container">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
          ) : (
            <div className="product-image-placeholder">
              <span className="product-type-icon">
                {getProductIcon()}
              </span>
            </div>
          )}
          
          <div className="product-badges">
            {product.isNew && <Tag color="green">Mới</Tag>}
            {product.isSale && (
              <Tag color="red">-{getDiscountPercentage()}%</Tag>
            )}
          </div>
        </div>

        <div className="product-info">
          <div className="product-main-info">
            <Title level={4} className="product-title">
              {product.name}
            </Title>
            <Text type="secondary" className="product-material">
              {product.material}
            </Text>
            <Text className="product-description">
              {product.description}
            </Text>
          </div>

          <div className="product-pricing">
            {product.isSale && product.oldPrice && (
              <Text delete className="old-price">
                {formatPrice(product.oldPrice)}
              </Text>
            )}
            <Text strong className="current-price">
              {product.price ? formatPrice(product.price) : 'Liên hệ'}
            </Text>
          </div>
        </div>

        <div className="product-actions">
          <Space direction="vertical" size="small">
            {showQuickActions && (
              <>
                <Button
                  icon={isInWishlist ? <HeartFilled /> : <HeartOutlined />}
                  onClick={handleWishlistToggle}
                  className={`action-btn ${isInWishlist ? 'active' : ''}`}
                >
                  {isInWishlist ? 'Đã yêu thích' : 'Yêu thích'}
                </Button>
                
                <Button
                  icon={<EyeOutlined />}
                  onClick={handleQuickView}
                  className="action-btn"
                >
                  Xem nhanh
                </Button>
              </>
            )}
            

          </Space>
        </div>
      </div>
    </Card>
  );

  return viewMode === 'grid' ? renderGridView() : renderListView();
});

ProductCard.displayName = 'ProductCard';

export default ProductCard; 