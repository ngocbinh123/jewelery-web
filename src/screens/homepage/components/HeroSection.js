import React from 'react';
import { useSelector } from 'react-redux';
import { selectHero } from '../../../store/slices/jewelrySlice';
import './HeroSection.css';
import { motion } from 'framer-motion';

const HeroSection = React.memo(() => {
  const hero = useSelector(selectHero) || {};
  const {
    title = '',
    subtitle = '',
    backgroundImage = '',
    ctaText = '',
    ctaLink = '#'
  } = hero;

  return (
    <section
      className="hero-section"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hero-text">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            {ctaText && ctaLink ? (
              <a href={ctaLink} className="hero-cta-button">
                {ctaText}
              </a>
            ) : null}
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