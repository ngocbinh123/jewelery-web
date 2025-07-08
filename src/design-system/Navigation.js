import React from 'react';
import { colors, spacing, typography } from '../design-tokens';

const Navigation = ({ items = [], current, onChange }) => {
  return (
    <nav style={{ display: 'flex', gap: spacing.lg, background: colors.background, padding: `${spacing.sm} 0` }}>
      {items.map((item) => {
        const isActive = item.key === current;
        return (
          <button
            key={item.key}
            onClick={() => onChange && onChange(item.key)}
            style={{
              background: 'none',
              border: 'none',
              color: isActive ? colors.primary : colors.text,
              fontWeight: isActive ? typography.fontWeightBold : typography.fontWeightRegular,
              fontFamily: typography.fontFamily,
              fontSize: typography.body.fontSize,
              cursor: 'pointer',
              borderBottom: isActive ? `2px solid ${colors.primary}` : '2px solid transparent',
              padding: `${spacing.xs} 0`,
              transition: 'color 0.2s, border-bottom 0.2s',
              outline: 'none',
            }}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation; 