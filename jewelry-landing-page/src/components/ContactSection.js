import React from 'react';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  return (
    <section className={styles.contactSection}>
      <h2>Liên Hệ</h2> {/* Contact Title in Vietnamese */}
      <div className={styles.contactInfo}>
        <p><strong>Facebook:</strong> <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">https://www.facebook.com</a></p>
        <p><strong>TikTok:</strong> <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">https://www.tiktok.com</a></p>
        <p><strong>Zalo:</strong> Ngọc Hải Đường(0968838876)</p>
        <p><strong>Điện thoại:</strong> 0968838876</p>
      </div>
    </section>
  );
};

export default ContactSection;