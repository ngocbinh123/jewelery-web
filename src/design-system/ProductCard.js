import React from 'react';
import { colors, spacing, borderRadius, typography, shadows } from '../design-tokens';

const BADGE_STYLES = {
  sale: {
    background: colors.error,
    color: '#fff',
    text: 'Sale',
  },
  new: {
    background: colors.info,
    color: '#fff',
    text: 'New',
  },
};

const ProductCard = ({
  type = 'normal',
  image,
  name,
  price,
  oldPrice,
  badgeText,
  style,
  ...props
}) => {
  const badge =
    type === 'sale' || type === 'new'
      ? BADGE_STYLES[type]
      : badgeText
      ? { background: colors.primary, color: '#fff', text: badgeText }
      : null;

  return (
    <div
      style={{
        background: colors.background,
        borderRadius: borderRadius.md,
        boxShadow: shadows.card,
        padding: spacing.md,
        width: 240,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...props}
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: spacing.sm,
            left: spacing.sm,
            background: badge.background,
            color: badge.color,
            borderRadius: borderRadius.sm,
            padding: '2px 10px',
            fontSize: 13,
            fontWeight: typography.fontWeightBold,
            letterSpacing: 1,
            zIndex: 2,
          }}
        >
          {badge.text}
        </div>
      )}
      {/* Image */}
      <div
        style={{
          width: '100%',
          height: 180,
          borderRadius: borderRadius.md,
          overflow: 'hidden',
          marginBottom: spacing.md,
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      {/* Name */}
      <div
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.heading3.fontSize,
          fontWeight: typography.heading3.fontWeight,
          lineHeight: typography.heading3.lineHeight,
          color: colors.text,
          marginBottom: spacing.xs,
        }}
      >
        {name}
      </div>
      {/* Price */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        <span
          style={{
            fontSize: typography.body.fontSize,
            fontWeight: typography.fontWeightBold,
            color: type === 'sale' ? colors.error : colors.primary,
          }}
        >
          {price}
        </span>
        {type === 'sale' && oldPrice && (
          <span
            style={{
              fontSize: typography.body.fontSize,
              color: '#888',
              textDecoration: 'line-through',
              marginLeft: 4,
            }}
          >
            {oldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 