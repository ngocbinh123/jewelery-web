import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2023 Ngọc Hải Đường. All rights reserved.</p>
        {/* Social media links can be added here */}
      </div>
    </footer>
  );
};

export default Footer;