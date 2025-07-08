import React, { Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';

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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/collections/:id" element={<CollectionPage />} />
              <Route path="/category/:category" element={<CollectionPage />} />
              <Route path="/contact" element={<ContactDetail />} />
              <Route path="/design-system" element={<DSDashboardScreen />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
