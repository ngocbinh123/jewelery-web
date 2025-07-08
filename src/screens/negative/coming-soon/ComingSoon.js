import React from 'react';
import { Card, Row, Col } from 'antd';
import ComingSoonIllustration from './components/ComingSoonIllustration';
import ComingSoonMessage from './components/ComingSoonMessage';
import ComingSoonActions from './components/ComingSoonActions';

const ComingSoon = () => {
  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Card bordered={false} style={{ textAlign: 'center', minHeight: 400 }}>
        <Row gutter={[0, 32]} justify="center">
          <Col span={24}>
            <ComingSoonIllustration />
          </Col>
          <Col span={24}>
            <ComingSoonMessage />
          </Col>
          <Col span={24}>
            <ComingSoonActions />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ComingSoon; 