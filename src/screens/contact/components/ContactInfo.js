import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ContactInfo = ({ contact }) => (
  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
    <Title level={3}>{contact.brand || 'Ngọc Hải Đường'}</Title>
    <Paragraph><Text strong>Địa chỉ:</Text> {contact.address}</Paragraph>
    <Paragraph><Text strong>Điện thoại:</Text> {contact.phone}</Paragraph>
    {contact.email && <Paragraph><Text strong>Email:</Text> {contact.email}</Paragraph>}
  </Space>
);

ContactInfo.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactInfo; 