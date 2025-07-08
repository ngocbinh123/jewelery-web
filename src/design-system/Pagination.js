import React from 'react';
import { colors, spacing, borderRadius, typography } from '../design-tokens';

const Pagination = ({ type = 'number', total = 1, current = 1, onChange }) => {
  if (total < 1) return null;

  if (type === 'dot') {
    return (
      <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = idx + 1 === current;
          return (
            <button
              key={idx}
              onClick={() => onChange && onChange(idx + 1)}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: isActive ? colors.primary : '#e0e0e0',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                outline: 'none',
                padding: 0,
              }}
              aria-label={`Go to page ${idx + 1}`}
            />
          );
        })}
      </div>
    );
  }

  // Number pagination
  const pageNumbers = [];
  for (let i = 1; i <= total; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ display: 'flex', gap: spacing.xs, alignItems: 'center' }}>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onChange && onChange(num)}
          style={{
            minWidth: 32,
            height: 32,
            borderRadius: borderRadius.sm,
            background: num === current ? colors.primary : '#fff',
            color: num === current ? '#fff' : colors.text,
            border: `1px solid ${num === current ? colors.primary : colors.border}`,
            fontFamily: typography.fontFamily,
            fontSize: typography.body.fontSize,
            fontWeight: typography.fontWeightBold,
            cursor: 'pointer',
            transition: 'all 0.2s',
            outline: 'none',
          }}
          aria-current={num === current ? 'page' : undefined}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination; 