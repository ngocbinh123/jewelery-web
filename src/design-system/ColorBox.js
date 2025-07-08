import React from 'react';
import { colors } from '../design-tokens';

const ColorBox = ({ color = 'primary', size = 32, label }) => (
  <div style={{ display: 'inline-block', margin: 8, textAlign: 'center' }}>
    <div
      style={{
        width: size,
        height: size,
        background: colors[color] || color,
        borderRadius: 4,
        border: '1px solid #eee',
        marginBottom: 4,
      }}
    />
    {label && <div style={{ fontSize: 12 }}>{label}</div>}
  </div>
);

export default ColorBox; 