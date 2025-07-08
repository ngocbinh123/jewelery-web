import React, { useMemo } from 'react';
import { Row, Col, Spin, Empty, Pagination, Alert } from 'antd';
import { useSelector } from 'react-redux';
import { 
  selectViewMode,
  selectPagination,
  selectLoading,
  selectError 
} from '../../../store/slices/collectionSlice';
import ProductCard from './ProductCard';
import './ProductList.css';

/**
 * ProductList Component
 * Responsibility: Display filtered and paginated products
 * Follows Single Responsibility and Open/Closed Principles
 */
const ProductList = React.memo(({ 
  products = [], // Receive processed products as props
  className = "",
  onProductClick,
  onQuickView,
  onAddToCart,
  onPageChange,
  onPageSizeChange
}) => {
  const viewMode = useSelector(selectViewMode);
  const pagination = useSelector(selectPagination);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Calculate paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return products.slice(startIndex, endIndex);
  }, [products, pagination.current, pagination.pageSize]);

  // Calculate current range for display
  const currentRange = useMemo(() => {
    const startIndex = (pagination.current - 1) * pagination.pageSize + 1;
    const endIndex = Math.min(pagination.current * pagination.pageSize, products.length);
    return { start: startIndex, end: endIndex };
  }, [pagination.current, pagination.pageSize, products.length]);

  // Grid configuration based on view mode
  const getGridProps = () => {
    if (viewMode === 'list') {
      return { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
    }
    return { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 };
  };

  // Handle pagination changes
  const handlePaginationChange = (page, pageSize) => {
    onPageChange?.(page, pageSize);
  };

  const handlePageSizeChange = (current, size) => {
    onPageSizeChange?.(current, size);
  };

  // Loading state
  if (loading) {
    return (
      <div className={`product-list loading ${className}`}>
        <div className="loading-container">
          <Spin size="large" tip="Đang tải sản phẩm..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`product-list error ${className}`}>
        <Alert
          message="Lỗi tải dữ liệu"
          description={error}
          type="error"
          showIcon
          className="error-alert"
        />
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className={`product-list empty ${className}`}>
        <Empty
          description="Không tìm thấy sản phẩm phù hợp"
          className="empty-state"
        />
      </div>
    );
  }

  return (
    <div className={`product-list ${viewMode}-view ${className}`}>
      {/* Products Grid/List */}
      <div className="products-container">
        <Row gutter={[16, 16]} className="products-row">
          {paginatedProducts.map((product) => (
            <Col key={product.id} {...getGridProps()}>
              <ProductCard
                product={product}
                viewMode={viewMode}
                onProductClick={onProductClick}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                className="product-list-item"
              />
            </Col>
          ))}
        </Row>
      </div>

      {/* Pagination */}
      {products.length > pagination.pageSize && (
        <div className="pagination-container">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={products.length}
            onChange={handlePaginationChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => 
              `${range[0]}-${range[1]} của ${total} sản phẩm`
            }
            pageSizeOptions={['12', '24', '36', '48']}
            className="product-pagination"
            responsive
          />
        </div>
      )}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList; 