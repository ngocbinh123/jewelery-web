import React, { useMemo } from 'react';
import { 
  Card, 
  Slider, 
  Select, 
  Checkbox, 
  Radio, 
  Button, 
  Typography, 
  Space, 
  Divider,
  Input
} from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectFilters, 
  setFilter, 
  clearFilters 
} from '../../../store/slices/collectionSlice';
import { selectCollections } from '../../../store/slices/jewelrySlice';
import './FilterSidebar.css';

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * FilterSidebar Component
 * Responsibility: Handle all product filtering functionality
 * Follows Single Responsibility and Interface Segregation Principles
 */
const FilterSidebar = React.memo(({ 
  className = "",
  onFilterChange,
  showAdvancedFilters = true
}) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const collections = useSelector(selectCollections);
  
  // Memoized filter options to prevent unnecessary re-renders
  const filterOptions = useMemo(() => ({
    materials: [
      { value: 'all', label: 'Tất cả chất liệu' },
      { value: 'gold', label: 'Vàng' },
      { value: 'silver', label: 'Bạc' },
      { value: 'diamond', label: 'Kim cương' },
      { value: 'pearl', label: 'Ngọc trai' }
    ],
    priceRanges: [
      { value: [0, 5000000], label: 'Dưới 5 triệu' },
      { value: [5000000, 15000000], label: '5 - 15 triệu' },
      { value: [15000000, 30000000], label: '15 - 30 triệu' },
      { value: [30000000, 50000000], label: 'Trên 30 triệu' }
    ]
  }), []);

  // Handler functions following Single Responsibility Principle
  const handleFilterChange = (filterType, value) => {
    dispatch(setFilter({ filterType, value }));
    onFilterChange?.(filterType, value);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    onFilterChange?.('clear', null);
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className={`filter-sidebar ${className}`}>
      {/* Search Section */}
      <Card 
        title="Tìm kiếm" 
        className="filter-card"
        size="small"
      >
        <Input
          placeholder="Tìm sản phẩm..."
          prefix={<SearchOutlined />}
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          allowClear
        />
      </Card>



      {/* Collection Filter */}
      <Card 
        title="Bộ sưu tập" 
        className="filter-card"
        size="small"
      >
        <Select
          value={filters.collection}
          onChange={(value) => handleFilterChange('collection', value)}
          className="w-100"
          placeholder="Chọn bộ sưu tập"
        >
          <Option value="all">Tất cả bộ sưu tập</Option>
          {collections.map(collection => (
            <Option key={collection.id} value={collection.id}>
              {collection.name}
            </Option>
          ))}
        </Select>
      </Card>

      {/* Price Range Filter */}
      <Card 
        title="Khoảng giá" 
        className="filter-card"
        size="small"
      >
        <div className="price-slider-container">
          <Slider
            range
            min={0}
            max={50000000}
            step={1000000}
            value={filters.priceRange}
            onChange={(value) => handleFilterChange('priceRange', value)}
            tooltip={{
              formatter: formatPrice
            }}
          />
          <div className="price-range-display">
            <Text className="price-text">
              {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
            </Text>
          </div>
          
          {/* Quick price range buttons */}
          <div className="quick-price-buttons">
            {filterOptions.priceRanges.map((range, index) => (
              <Button
                key={index}
                size="small"
                type={
                  filters.priceRange[0] === range.value[0] && 
                  filters.priceRange[1] === range.value[1] 
                    ? 'primary' : 'default'
                }
                onClick={() => handleFilterChange('priceRange', range.value)}
                className="quick-price-btn"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <>
          {/* Material Filter */}
          <Card 
            title="Chất liệu" 
            className="filter-card"
            size="small"
          >
            <Select
              value={filters.material}
              onChange={(value) => handleFilterChange('material', value)}
              className="w-100"
              placeholder="Chọn chất liệu"
            >
              {filterOptions.materials.map(material => (
                <Option key={material.value} value={material.value}>
                  {material.label}
                </Option>
              ))}
            </Select>
          </Card>

          {/* Special Filters */}
          <Card 
            title="Lọc đặc biệt" 
            className="filter-card"
            size="small"
          >
            <Space direction="vertical" className="w-100">
              <Checkbox
                checked={filters.isNew}
                onChange={(e) => handleFilterChange('isNew', e.target.checked)}
              >
                Sản phẩm mới
              </Checkbox>
              <Checkbox
                checked={filters.isSale}
                onChange={(e) => handleFilterChange('isSale', e.target.checked)}
              >
                Đang giảm giá
              </Checkbox>
              <Checkbox
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              >
                Còn hàng
              </Checkbox>
            </Space>
          </Card>
        </>
      )}

      <Divider />

      {/* Clear Filters Button */}
      <Button
        type="default"
        icon={<ClearOutlined />}
        onClick={handleClearFilters}
        className="clear-filters-btn"
        block
      >
        Xóa bộ lọc
      </Button>
    </div>
  );
});

FilterSidebar.displayName = 'FilterSidebar';

export default FilterSidebar; 