import React, { useState, useEffect } from 'react';
import styles from './CollectionSection.module.css';
import ProductCard from './ProductCard'; // Assuming you will create a ProductCard component
import data from '../data.json'; // Import the hardcoded data
const CollectionSection = () => {
  const [jewelryData, setJewelryData] = useState([]);

  useEffect(() => {
    // In the future, you would fetch data from an API here
    // For now, we are using the hardcoded data from data.json
    setJewelryData(data);
  }, []);

  return (
    <section className={styles.collectionSection}>
      <h2>Bộ Sưu Tập</h2> {/* Collection Title in Vietnamese */}
      <div className={styles.productList}>
        {jewelryData.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;