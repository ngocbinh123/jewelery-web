import React from 'react';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

const ComingSoonActions = () => (
  <Space direction="horizontal" size="middle" style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
    <Link to="/">
      <Button type="primary">Về trang chủ</Button>
    </Link>
    <Link to="/contact">
      <Button>Liên hệ</Button>
    </Link>
  </Space>
);

export default ComingSoonActions; 