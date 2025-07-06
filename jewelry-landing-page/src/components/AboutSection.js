import React from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  const introduction = "Chào mừng đến với Ngọc Hải Đường - nơi gửi trọn niềm tin và mang đến cho bạn những sản phẩm trang sức chất lượng vượt trội. Chúng tôi tự hào là điểm đến của sự may mắn và phong cách, với những thiết kế tinh xảo và độc đáo nhất.";

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Về chúng tôi</h2>
        <p className={styles.introduction}>{introduction}</p>
      </div>
    </section>
  );
};

export default AboutSection;