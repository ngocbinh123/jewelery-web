import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ComingSoonMessage = ({ title, subtitle }) => (
  <div style={{ textAlign: 'center', marginBottom: 24 }}>
    <Title level={2} style={{ marginBottom: 8 }}>{title || 'Sắp ra mắt'}</Title>
    <Paragraph type="secondary">{subtitle || 'Tính năng này sẽ sớm được cập nhật. Hãy quay lại sau!'}</Paragraph>
  </div>
);

ComingSoonMessage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default ComingSoonMessage; 