import React from 'react';
import { colors, spacing, borderRadius, typography } from '../design-tokens';

const getButtonStyles = (variant) => {
  switch (variant) {
    case 'solid':
      return {
        background: colors.primary,
        color: colors.background,
        border: 'none',
        fontWeight: typography.fontWeightBold,
      };
    case 'outline':
      return {
        background: 'transparent',
        color: colors.primary,
        border: 'none',
        fontWeight: typography.fontWeightBold,
      };
    case 'outline-border':
      return {
        background: 'transparent',
        color: colors.primary,
        border: `1.5px solid ${colors.primary}`,
        fontWeight: typography.fontWeightBold,
      };
    case 'link':
      return {
        background: 'transparent',
        color: colors.primary,
        border: 'none',
        fontWeight: typography.fontWeightBold,
        padding: 0,
        textDecoration: 'underline',
      };
    default:
      return {};
  }
};

const Button = ({
  variant = 'solid',
  icon,
  iconPosition = 'right',
  children,
  style,
  ...props
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.md,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizeBase,
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
    ...getButtonStyles(variant),
    ...style,
  };

  // For link variant, remove padding
  if (variant === 'link') {
    baseStyle.padding = 0;
  }

  return (
    <button style={baseStyle} {...props}>
      {icon && iconPosition === 'left' && (
        <span style={{ display: 'inline-flex', marginRight: spacing.xs }}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span style={{ display: 'inline-flex', marginLeft: spacing.xs }}>{icon}</span>
      )}
    </button>
  );
};

export default Button; 