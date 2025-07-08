import React from 'react';
import { spacing } from '../design-tokens';

const Spacing = ({ size = 'md', axis = 'vertical' }) => {
  const style =
    axis === 'vertical'
      ? { display: 'block', height: spacing[size], width: '100%' }
      : { display: 'inline-block', width: spacing[size], height: '1px' };
  return <span style={style} aria-hidden="true" />;
};

export default Spacing; 