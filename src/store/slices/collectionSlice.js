import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // View state
  viewMode: 'grid', // 'grid' | 'list'
  loading: false,
  error: null,
  
  // Filter state
  filters: {
    search: '',
    category: 'all', // 'all' | 'ring' | 'necklace' | 'earring' | 'bracelet'
    collection: 'all', // 'all' | 'c1' | 'c2' | 'c3' | 'c4' | 'c5'
    priceRange: [0, 50000000],
    material: 'all',
    isNew: false,
    isSale: false,
    inStock: true
  },
  
  // Sort state
  sortBy: 'name', // 'name' | 'price_low' | 'price_high' | 'newest' | 'rating'
  sortOrder: 'asc', // 'asc' | 'desc'
  
  // Pagination state
  pagination: {
    current: 1,
    pageSize: 12,
    total: 0
  },
  
  // UI state
  sidebarCollapsed: false,
  selectedProduct: null,
  compareList: [],
  wishlist: []
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // View mode
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    
    // Filters
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
      // Reset pagination when filter changes
      state.pagination.current = 1;
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.current = 1;
    },
    
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: 'all',
        collection: 'all',
        priceRange: [0, 50000000],
        material: 'all',
        isNew: false,
        isSale: false,
        inStock: true
      };
      state.pagination.current = 1;
    },
    
    // Sorting
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.pagination.current = 1;
    },
    
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.pagination.current = 1;
    },
    
    // Pagination
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    
    setCurrentPage: (state, action) => {
      state.pagination.current = action.payload;
    },
    
    setPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
      state.pagination.current = 1;
    },
    
    // UI states
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    
    // Compare functionality
    addToCompare: (state, action) => {
      const productId = action.payload;
      if (!state.compareList.includes(productId) && state.compareList.length < 3) {
        state.compareList.push(productId);
      }
    },
    
    removeFromCompare: (state, action) => {
      const productId = action.payload;
      state.compareList = state.compareList.filter(id => id !== productId);
    },
    
    clearCompare: (state) => {
      state.compareList = [];
    },
    
    // Wishlist functionality
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.wishlist.includes(productId)) {
        state.wishlist.push(productId);
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlist = state.wishlist.filter(id => id !== productId);
    },
    
    clearWishlist: (state) => {
      state.wishlist = [];
    }
  }
});

export const {
  setLoading,
  setError,
  setViewMode,
  setFilter,
  setFilters,
  clearFilters,
  setSortBy,
  setSortOrder,
  setPagination,
  setCurrentPage,
  setPageSize,
  toggleSidebar,
  setSidebarCollapsed,
  setSelectedProduct,
  addToCompare,
  removeFromCompare,
  clearCompare,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} = collectionSlice.actions;

// Selectors
export const selectCollectionState = (state) => state.collection;
export const selectFilters = (state) => state.collection.filters;
export const selectSortBy = (state) => state.collection.sortBy;
export const selectSortOrder = (state) => state.collection.sortOrder;
export const selectPagination = (state) => state.collection.pagination;
export const selectViewMode = (state) => state.collection.viewMode;
export const selectSidebarCollapsed = (state) => state.collection.sidebarCollapsed;
export const selectCompareList = (state) => state.collection.compareList;
export const selectWishlist = (state) => state.collection.wishlist;
export const selectLoading = (state) => state.collection.loading;
export const selectError = (state) => state.collection.error;

export default collectionSlice.reducer; 