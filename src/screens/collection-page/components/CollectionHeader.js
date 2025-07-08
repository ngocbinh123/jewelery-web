import React from 'react';
import { Breadcrumb, Typography, Space } from 'antd';
import { HomeOutlined, ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './CollectionHeader.css';

const { Title, Text } = Typography;

/**
 * CollectionHeader Component
 * Responsibility: Display page navigation and collection information
 * Follows Single Responsibility Principle
 */
const CollectionHeader = React.memo(({ 
  title = "Bộ sưu tập", 
  subtitle,
  totalProducts = 0,
  breadcrumbItems = [],
  className = ""
}) => {
  const defaultBreadcrumbs = [
    {
      title: (
        <Link to="/">
          <Space>
            <HomeOutlined />
            <span>Trang chủ</span>
          </Space>
        </Link>
      ),
    },
    {
      title: (
        <Space>
          <ShopOutlined />
          <span>Bộ sưu tập</span>
        </Space>
      ),
    },
    ...breadcrumbItems
  ];

  return (
    <div className={`collection-header ${className}`}>
      <div className="collection-header-container">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={defaultBreadcrumbs}
          className="collection-breadcrumb"
        />
        
        {/* Page Title Section */}
        <div className="collection-header-content">
          <div className="collection-title-section">
            <Title 
              level={1} 
              className="collection-title"
              data-testid="collection-title"
            >
              {title}
            </Title>
            
            {subtitle && (
              <Text 
                className="collection-subtitle"
                data-testid="collection-subtitle"
              >
                {subtitle}
              </Text>
            )}
          </div>
          
          {/* Product Count */}
          <div className="collection-meta">
            <Text className="product-count">
              {totalProducts > 0 
                ? `${totalProducts} sản phẩm` 
                : 'Đang tải...'
              }
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
});

CollectionHeader.displayName = 'CollectionHeader';

export default CollectionHeader; 