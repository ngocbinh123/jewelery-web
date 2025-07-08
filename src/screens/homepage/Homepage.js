import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HeroSection,
  CollectionsSection,
  BestSellerSection,
  NewArrivalSection,
  CategorySection,
  TestimonialSection,
  BrandSection
} from './components';
import './Homepage.css';

const Homepage = React.memo(() => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#best-seller-section') {
      const section = document.getElementById('best-seller-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="homepage">
      <HeroSection />
      <CollectionsSection />
      <BestSellerSection />
      <NewArrivalSection />
      <CategorySection />
      <TestimonialSection />
      <BrandSection />
    </div>
  );
});

Homepage.displayName = 'Homepage';

export default Homepage; 