import React from 'react';
import { Card, Row, Col } from 'antd';
import NotFoundIllustration from './components/NotFoundIllustration';
import NotFoundMessage from './components/NotFoundMessage';
import NotFoundActions from './components/NotFoundActions';

const NotFound = () => {
  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Card bordered={false} style={{ textAlign: 'center', minHeight: 400 }}>
        <Row gutter={[0, 32]} justify="center">
          <Col span={24}>
            <NotFoundIllustration />
          </Col>
          <Col span={24}>
            <NotFoundMessage />
          </Col>
          <Col span={24}>
            <NotFoundActions />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NotFound; 