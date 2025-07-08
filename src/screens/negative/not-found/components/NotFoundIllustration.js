import React from 'react';
import { Result } from 'antd';

const NotFoundIllustration = () => (
  <Result
    icon={<span style={{ fontSize: 80, display: 'block' }}>🔍</span>}
    title={null}
    subTitle={null}
    style={{ padding: 0, margin: 0 }}
  />
);

export default NotFoundIllustration; 