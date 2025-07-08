import React from 'react';
import { 
  Space, 
  Select, 
  Button, 
  Typography, 
  Tooltip,
  Divider 
} from 'antd';
import { 
  AppstoreOutlined, 
  BarsOutlined, 
  SortAscendingOutlined,
  SortDescendingOutlined 
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectViewMode, 
  selectSortBy, 
  selectSortOrder,
  setViewMode, 
  setSortBy, 
  setSortOrder 
} from '../../../store/slices/collectionSlice';
import './SortControls.css';

const { Text } = Typography;
const { Option } = Select;

/**
 * SortControls Component
 * Responsibility: Handle sorting and view mode controls
 * Follows Single Responsibility Principle
 */
const SortControls = React.memo(({ 
  totalProducts = 0,
  currentRange = { start: 0, end: 0 },
  className = "",
  onSortChange,
  onViewModeChange
}) => {
  const dispatch = useDispatch();
  const viewMode = useSelector(selectViewMode);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  // Sort options configuration
  const sortOptions = [
    { value: 'name', label: 'Tên sản phẩm' },
    { value: 'price_low', label: 'Giá thấp đến cao' },
    { value: 'price_high', label: 'Giá cao đến thấp' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'rating', label: 'Đánh giá cao nhất' }
  ];

  // Event handlers
  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
    onViewModeChange?.(mode);
  };

  const handleSortChange = (value) => {
    dispatch(setSortBy(value));
    onSortChange?.(value);
  };

  const handleSortOrderToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSortOrder(newOrder));
    onSortChange?.(sortBy, newOrder);
  };

  // Get current sort option label
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Tên sản phẩm';
  };

  return (
    <div className={`sort-controls ${className}`}>
      <div className="sort-controls-container">
        {/* Results Info */}
        <div className="results-info">
          <Text className="results-text">
            Hiển thị {currentRange.start}-{currentRange.end} của {totalProducts} sản phẩm
          </Text>
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          <Space size="middle" wrap>
            {/* Sort Controls */}
            <div className="sort-section">
              <Space size="small">
                <Text className="sort-label">Sắp xếp:</Text>
                
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="sort-select"
                  placeholder="Chọn cách sắp xếp"
                  suffixIcon={null}
                  style={{ minWidth: 160 }}
                >
                  {sortOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>

                {/* Sort Order Toggle */}
                <Tooltip title={`Sắp xếp ${sortOrder === 'asc' ? 'giảm dần' : 'tăng dần'}`}>
                  <Button
                    type="text"
                    icon={sortOrder === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                    onClick={handleSortOrderToggle}
                    className="sort-order-btn"
                  />
                </Tooltip>
              </Space>
            </div>

            <Divider type="vertical" className="controls-divider" />

            {/* View Mode Toggle */}
            <div className="view-mode-section">
              <Text className="view-mode-label">Hiển thị:</Text>
              <Button.Group className="view-mode-group">
                <Tooltip title="Dạng lưới">
                  <Button
                    type={viewMode === 'grid' ? 'primary' : 'default'}
                    icon={<AppstoreOutlined />}
                    onClick={() => handleViewModeChange('grid')}
                    className="view-mode-btn"
                  />
                </Tooltip>
                <Tooltip title="Dạng danh sách">
                  <Button
                    type={viewMode === 'list' ? 'primary' : 'default'}
                    icon={<BarsOutlined />}
                    onClick={() => handleViewModeChange('list')}
                    className="view-mode-btn"
                  />
                </Tooltip>
              </Button.Group>
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
});

SortControls.displayName = 'SortControls';

export default SortControls; 