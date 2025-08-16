import React, { useEffect, useMemo, useCallback } from 'react';
import { Layout, Row, Col, Drawer, Button, FloatButton } from 'antd';
import { FilterOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  selectFilters,
  selectViewMode,
  selectSortBy,
  selectSortOrder,
  selectPagination,
  selectSidebarCollapsed,
  selectLoading,
  setSidebarCollapsed,
  setCurrentPage,
  setPageSize,
  setLoading
} from '../../store/slices/collectionSlice';
import { 
  selectFilteredProducts,
  selectCollections,
  selectProducts
} from '../../store/slices/jewelrySlice';
import CollectionHeader from './components/CollectionHeader';
import FilterSidebar from './components/FilterSidebar';
import SortControls from './components/SortControls';
import ProductList from './components/ProductList';
import './CollectionPage.css';

const { Content, Sider } = Layout;

/**
 * CollectionPage Component
 * Responsibility: Main page orchestrating all collection functionality
 * Follows Single Responsibility and Dependency Inversion Principles
 */
const CollectionPage = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redux state selectors
  const filters = useSelector(selectFilters);
  const viewMode = useSelector(selectViewMode);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const pagination = useSelector(selectPagination);
  const sidebarCollapsed = useSelector(selectSidebarCollapsed);
  const loading = useSelector(selectLoading);
  
  const products = useSelector(selectProducts);
  const collections = useSelector(selectCollections);
  const filteredProducts = useSelector(selectFilteredProducts);

  // Apply filters and sorting to products
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Apply best seller filter if on best-seller page
    if (location.pathname === '/best-seller') {
      const bestSellerIds = ['p1', 'p3', 'p6']; // From jewelery-data.json
      result = result.filter(product => bestSellerIds.includes(product.id));
    }
    
    // Apply new arrivals filter if on new-arrivals page
    if (location.pathname === '/new-arrivals') {
      const newArrivalIds = ['p2', 'p4', 'p5']; // From jewelery-data.json
      result = result.filter(product => newArrivalIds.includes(product.id));
    }
    
    // Apply featured products filter if on featured-products page
    if (location.pathname === '/featured-products') {
      // Show all products for featured products page
      // No additional filtering needed
    }

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }



    // Apply collection filter
    if (filters.collection !== 'all') {
      result = result.filter(product => product.collectionId === filters.collection);
    }

    // Apply price range filter (include products with null prices)
    result = result.filter(product => {
      if (product.price === null || product.price === undefined) {
        return true; // Include products without prices
      }
      return product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    });

    // Apply material filter
    if (filters.material !== 'all') {
      result = result.filter(product => 
        product.materialType === filters.material ||
        product.material.toLowerCase().includes(filters.material.toLowerCase())
      );
    }

    // Apply special filters
    if (filters.isNew) {
      result = result.filter(product => product.isNew);
    }

    if (filters.isSale) {
      result = result.filter(product => product.isSale);
    }

    // Apply inStock filter
    if (filters.inStock) {
      result = result.filter(product => product.inStock !== false);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price_low':
          comparison = (a.price || 0) - (b.price || 0);
          break;
        case 'price_high':
          comparison = (b.price || 0) - (a.price || 0);
          break;
        case 'newest':
          comparison = a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
          break;
        case 'rating':
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [products, filters, sortBy, sortOrder]);

  // Calculate pagination info
  const paginationInfo = useMemo(() => {
    const total = processedProducts.length;
    const startIndex = (pagination.current - 1) * pagination.pageSize + 1;
    const endIndex = Math.min(pagination.current * pagination.pageSize, total);
    
    return {
      total,
      start: total > 0 ? startIndex : 0,
      end: endIndex
    };
  }, [processedProducts.length, pagination]);

  // Get page title and subtitle
  const getPageInfo = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const collectionId = params.get('collection');
    const category = params.get('category');
    
    // Check if this is the best seller page
    if (location.pathname === '/best-seller') {
      return {
        title: 'Bán chạy nhất',
        subtitle: 'Khám phá các sản phẩm được yêu thích nhất',
        breadcrumbItems: [{ title: 'Bán chạy nhất' }]
      };
    }
    
    // Check if this is the new arrivals page
    if (location.pathname === '/new-arrivals') {
      return {
        title: 'Hàng mới về',
        subtitle: 'Khám phá các sản phẩm mới nhất',
        breadcrumbItems: [{ title: 'Hàng mới về' }]
      };
    }
    
    // Check if this is the featured products page
    if (location.pathname === '/featured-products') {
      return {
        title: 'Sản phẩm nổi bật',
        subtitle: 'Khám phá tất cả sản phẩm nổi bật của chúng tôi',
        breadcrumbItems: [{ title: 'Sản phẩm nổi bật' }]
      };
    }
    
    if (collectionId) {
      const collection = collections.find(c => c.id === collectionId);
      return {
        title: collection?.name || 'Bộ sưu tập',
        subtitle: collection?.description,
        breadcrumbItems: [{ title: collection?.name }]
      };
    }
    
    if (category) {
      const categoryNames = {
        ring: 'Nhẫn',
        necklace: 'Dây chuyền',
        earring: 'Bông tai',
        bracelet: 'Lắc tay'
      };
      return {
        title: categoryNames[category] || 'Sản phẩm',
        subtitle: `Khám phá bộ sưu tập ${categoryNames[category]?.toLowerCase()} đa dạng`,
        breadcrumbItems: [{ title: categoryNames[category] }]
      };
    }
    
    return {
      title: 'Bộ sưu tập',
      subtitle: 'Khám phá toàn bộ sản phẩm trang sức cao cấp',
      breadcrumbItems: []
    };
  }, [location.pathname, location.search, collections]);

  // Event handlers
  const handleFilterChange = useCallback((filterType, value) => {
    dispatch(setCurrentPage(1)); // Reset to first page when filters change
  }, [dispatch]);

  const handleSortChange = useCallback((sortBy, sortOrder) => {
    dispatch(setCurrentPage(1)); // Reset to first page when sort changes
  }, [dispatch]);

  const handleViewModeChange = useCallback((mode) => {
    // View mode changes don't need to reset pagination
  }, []);

  const handlePageChange = useCallback((page, pageSize) => {
    dispatch(setCurrentPage(page));
    if (pageSize !== pagination.pageSize) {
      dispatch(setPageSize(pageSize));
    }
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, pagination.pageSize]);

  const handlePageSizeChange = useCallback((current, size) => {
    dispatch(setPageSize(size));
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  const handleProductClick = useCallback((product) => {
    navigate(`/product/${product.id}`);
  }, [navigate]);

  const handleQuickView = useCallback((product) => {
    // TODO: Implement quick view modal
    console.log('Quick view:', product);
  }, []);



  const toggleSidebar = useCallback(() => {
    dispatch(setSidebarCollapsed(!sidebarCollapsed));
  }, [dispatch, sidebarCollapsed]);

  // Initialize data loading
  useEffect(() => {
    dispatch(setLoading(true));
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const pageInfo = getPageInfo();

  return (
    <div className="collection-page">
      {/* Page Header */}
      <CollectionHeader
        title={pageInfo.title}
        subtitle={pageInfo.subtitle}
        totalProducts={paginationInfo.total}
        breadcrumbItems={pageInfo.breadcrumbItems}
      />

      <div className="collection-page-container">
        <Layout className="collection-layout">
          {/* Desktop Sidebar */}
          <Sider
            width={280}
            className="collection-sidebar desktop-sidebar"
            collapsed={false}
            collapsedWidth={0}
            breakpoint="md"
            collapsible={false}
          >
            <FilterSidebar
              onFilterChange={handleFilterChange}
              showAdvancedFilters={true}
            />
          </Sider>

          {/* Main Content */}
          <Layout className="collection-content-layout">
            <Content className="collection-content">
              {/* Sort Controls */}
              <SortControls
                totalProducts={paginationInfo.total}
                currentRange={{ 
                  start: paginationInfo.start, 
                  end: paginationInfo.end 
                }}
                onSortChange={handleSortChange}
                onViewModeChange={handleViewModeChange}
              />

              {/* Product List */}
              <ProductList
                products={processedProducts}
                onProductClick={handleProductClick}
                onQuickView={handleQuickView}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </Content>
          </Layout>
        </Layout>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        title="Bộ lọc sản phẩm"
        placement="left"
        closable={true}
        onClose={toggleSidebar}
        open={sidebarCollapsed}
        className="mobile-filter-drawer"
        width={320}
      >
        <FilterSidebar
          onFilterChange={handleFilterChange}
          showAdvancedFilters={true}
        />
      </Drawer>

      {/* Mobile Filter Button */}
      <FloatButton.Group className="mobile-float-buttons">
        <FloatButton
          icon={<FilterOutlined />}
          tooltip="Bộ lọc"
          onClick={toggleSidebar}
          className="filter-float-btn"
        />
        <FloatButton.BackTop
          icon={<ArrowUpOutlined />}
          tooltip="Về đầu trang"
          className="back-top-btn"
        />
      </FloatButton.Group>
    </div>
  );
});

CollectionPage.displayName = 'CollectionPage';

export default CollectionPage; 