import React from 'react';
import { useSelector } from 'react-redux';
import { selectHero } from '../../../store/slices/jewelrySlice';
import './HeroSection.css';
import { motion } from 'framer-motion';

const HeroSection = React.memo(() => {
  const hero = useSelector(selectHero);

  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hero-text">
            <h1 className="hero-title">{hero.title}</h1>
            <p className="hero-subtitle">{hero.subtitle}</p>
            <button className="hero-cta-button">
              {hero.ctaText}
            </button>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              {/* Placeholder for jewelry model image */}
              <div className="jewelry-showcase">
                <div className="model-placeholder"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection; 