import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const NotFoundMessage = ({ title, subtitle }) => (
  <div style={{ textAlign: 'center', marginBottom: 24 }}>
    <Title level={2} style={{ marginBottom: 8 }}>{title || 'Không tìm thấy trang'}</Title>
    <Paragraph type="secondary">{subtitle || 'Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.'}</Paragraph>
  </div>
);

NotFoundMessage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default NotFoundMessage; 