import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  iconRight,
  iconLeft,
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '9999px',
    fontWeight: 600,
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    lineHeight: 1
  };

  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '0.85rem' },
    md: { padding: '12px 24px', fontSize: '0.95rem' },
    lg: { padding: '16px 32px', fontSize: '1.05rem' }
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--brand-green)',
      color: '#FFFFFF',
      border: 'none',
      boxShadow: '0 4px 14px rgba(30, 62, 52, 0.2)'
    },
    secondary: {
      backgroundColor: 'var(--accent-sage)',
      color: 'var(--brand-green)',
      border: '1px solid var(--border-light)'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--brand-green)',
      border: '1.5px solid var(--border-light)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-body)',
      border: 'none'
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant]
      }}
      className={`btn-interactive ${className}`}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--brand-green-hover)';
        if (variant === 'secondary') e.currentTarget.style.backgroundColor = 'var(--accent-mint)';
        if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--brand-green)';
        if (variant === 'ghost') e.currentTarget.style.color = 'var(--brand-green)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--brand-green)';
        if (variant === 'secondary') e.currentTarget.style.backgroundColor = 'var(--accent-sage)';
        if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--border-light)';
        if (variant === 'ghost') e.currentTarget.style.color = 'var(--text-body)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {iconLeft && <span>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span>{iconRight}</span>}
    </button>
  );
}
