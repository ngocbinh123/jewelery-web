import React from 'react';
import { useSelector } from 'react-redux';
import { selectTestimonials } from '../../../store/slices/jewelrySlice';
import './TestimonialSection.css';

const TestimonialSection = React.memo(() => {
  const testimonials = useSelector(selectTestimonials);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="section-header">
          <h2 className="section-title">Khách hàng nói gì</h2>
          <p className="section-subtitle">Những đánh giá chân thực từ khách hàng</p>
        </div>
        
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <div className="rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="review-text">"{testimonial.review}"</p>
                <div className="customer-info">
                  <div className="customer-avatar">
                    <span className="avatar-placeholder">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="customer-details">
                    <h4 className="customer-name">{testimonial.name}</h4>
                    <p className="customer-title">Khách hàng thân thiết</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

TestimonialSection.displayName = 'TestimonialSection';

export default TestimonialSection; 