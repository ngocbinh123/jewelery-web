import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const ContactMap = ({ mapEmbed }) => (
  <Card title="Bản đồ" bordered={false} style={{ minHeight: 300 }}>
    {mapEmbed ? (
      <div dangerouslySetInnerHTML={{ __html: mapEmbed }} style={{ width: '100%', minHeight: 250 }} />
    ) : (
      <div style={{ width: '100%', minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
        Không có bản đồ
      </div>
    )}
  </Card>
);

ContactMap.propTypes = {
  mapEmbed: PropTypes.string
};

export default ContactMap; 