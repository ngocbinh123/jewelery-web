import React from 'react';
import { typography, colors } from '../design-tokens';

const Heading = ({ level = 1, children, style, ...props }) => {
  const Tag = `h${level}`;
  const token = typography[`heading${level}`] || typography.heading1;
  return (
    <Tag
      style={{
        fontFamily: typography.fontFamily,
        fontSize: token.fontSize,
        fontWeight: token.fontWeight,
        lineHeight: token.lineHeight,
        color: colors.text,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading; 