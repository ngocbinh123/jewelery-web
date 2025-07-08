import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';

const ContactSocial = ({ contact }) => (
  <Space direction="horizontal" size="middle" style={{ marginTop: 16 }}>
    {contact.facebook && (
      <Button type="primary" icon={<FacebookOutlined />} href={contact.facebook} target="_blank">
        Facebook
      </Button>
    )}
    {contact.tiktok && (
      <Button icon={<span style={{ fontSize: 18 }}>🎵</span>} href={contact.tiktok} target="_blank">
        TikTok
      </Button>
    )}
  </Space>
);

ContactSocial.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactSocial; 