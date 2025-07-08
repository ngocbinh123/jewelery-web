import React from 'react';
import { useSelector } from 'react-redux';
import { selectContact } from '../../store/slices/jewelrySlice';
import { Row, Col, Card } from 'antd';
import ContactInfo from './components/ContactInfo';
import ContactMap from './components/ContactMap';
import ContactSocial from './components/ContactSocial';

const fallbackContact = {
  address: 'Ho Chi Minh, Viet Nam',
  brand: 'Ngọc Hải Đường',
  phone: '0985480813',
  facebook: 'https://www.facebook.com/',
  tiktok: 'https://www.tiktok.com/',
};

const ContactDetail = () => {
  const contact = useSelector(selectContact) || {};
  const mergedContact = {
    ...fallbackContact,
    ...contact,
  };
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={14}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <ContactInfo contact={mergedContact} />
            <ContactSocial contact={mergedContact} />
          </Card>
        </Col>
        <Col xs={24} md={10}>
          <ContactMap mapEmbed={mergedContact.mapEmbed} />
        </Col>
      </Row>
    </div>
  );
};

export default ContactDetail; 