import { createSlice } from '@reduxjs/toolkit';
import homepageData from '../../data/jewelery-data.json';
import productData from '../../data/product-data.json';

const initialState = {
  hero: homepageData.hero,
  collections: homepageData.collections,
  testimonials: homepageData.testimonials,
  brands: homepageData.brands,
  contact: homepageData.contact,
  // All products from product-data.json
  products: productData.products,
  // Homepage product references (IDs)
  bestSellerProductIds: homepageData.bestSellerProductIds || [],
  newArrivalProductIds: homepageData.newArrivalProductIds || [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 50000000],
    sortBy: 'name'
  }
};

const jewelrySlice = createSlice({
  name: 'jewelry',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        priceRange: [0, 50000000],
        sortBy: 'name'
      };
    }
  },
});

export const { setLoading, setError, setFilters, clearFilters } = jewelrySlice.actions;

// Selectors
export const selectHero = (state) => state.jewelry.hero;
export const selectCollections = (state) => state.jewelry.collections;
export const selectProducts = (state) => state.jewelry.products;
export const selectTestimonials = (state) => state.jewelry.testimonials;
export const selectBrands = (state) => state.jewelry.brands;
export const selectContact = (state) => state.jewelry.contact;
export const selectFilters = (state) => state.jewelry.filters;
export const selectBestSellerProductIds = (state) => state.jewelry.bestSellerProductIds;
export const selectBestSellerProducts = (state) => {
  const allProducts = state.jewelry.products;
  const ids = state.jewelry.bestSellerProductIds;
  return ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
};

// Filter products based on criteria
export const selectFilteredProducts = (state) => {
  const { products, filters } = state.jewelry;
  let filteredProducts = [...products];

  if (filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.type === filters.category);
  }

  filteredProducts = filteredProducts.filter(
    product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
  );

  // Sort products
  switch (filters.sortBy) {
    case 'price_low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return filteredProducts;
};

// Get new products
export const selectNewProducts = (state) => 
  state.jewelry.products.filter(product => product.isNew);

// Get sale products
export const selectSaleProducts = (state) => 
  state.jewelry.products.filter(product => product.isSale);

export const selectNewArrivalProductIds = (state) => state.jewelry.newArrivalProductIds;
export const selectNewArrivalProducts = (state) => {
  const allProducts = state.jewelry.products;
  const ids = state.jewelry.newArrivalProductIds;
  return ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
};

export default jewelrySlice.reducer; 