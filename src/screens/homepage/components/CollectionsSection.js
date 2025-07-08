import React from 'react';
import { useSelector } from 'react-redux';
import { selectCollections } from '../../../store/slices/jewelrySlice';
import './CollectionsSection.css';

const CollectionsSection = React.memo(() => {
  const collections = useSelector(selectCollections);

  return (
    <section className="collections-section">
      <div className="collections-container">
        <div className="collections-grid">
          {collections.map((collection, index) => (
            <div key={collection.id} className={`collection-item ${index === 1 ? 'large' : ''}`}>
              <div className="collection-image">
                <div className="collection-placeholder">
                  <span className="collection-icon">
                    {collection.name.includes('Kim Cương') ? '💎' : 
                     collection.name.includes('Ngọc Trai') ? '🦪' : '🔗'}
                  </span>
                </div>
              </div>
              <div className="collection-content">
                <h3 className="collection-name">{collection.name}</h3>
                <p className="collection-description">{collection.description}</p>
                <button className="collection-cta">Khám phá</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

CollectionsSection.displayName = 'CollectionsSection';

export default CollectionsSection; 