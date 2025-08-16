import React, { Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy load components for better performance
const Homepage = React.lazy(() => import('./screens/homepage/Homepage'));
const AboutSection = React.lazy(() => import('./components/AboutSection'));
const DSDashboardScreen = React.lazy(() => import('./design-system/showcases/DSDashboardScreen'));
const CollectionPage = React.lazy(() => import('./screens/collection-page/CollectionPage'));
const ProductDetail = React.lazy(() => import('./screens/product-detail/ProductDetail'));
const ContactDetail = React.lazy(() => import('./screens/contact/ContactDetail'));
const NotFound = React.lazy(() => import('./screens/negative/not-found/NotFound'));

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh'
  }}>
    <Spin size="large" tip="Đang tải..." />
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Homepage />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <AboutSection />
          </motion.div>
        } />
        <Route path="/collection" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <CollectionPage />
          </motion.div>
        } />
        <Route path="/collections/:id" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <CollectionPage />
          </motion.div>
        } />
        <Route path="/category/:category" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <CollectionPage />
          </motion.div>
        } />
        <Route path="/best-seller" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <CollectionPage />
          </motion.div>
        } />
        <Route path="/new-arrivals" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <CollectionPage />
          </motion.div>
        } />
        <Route path="/featured-products" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <CollectionPage />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <ContactDetail />
          </motion.div>
        } />
        <Route path="/design-system" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <DSDashboardScreen />
          </motion.div>
        } />
        <Route path="/product/:id" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <ProductDetail />
          </motion.div>
        } />
        <Route path="*" element={
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <NotFound />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
