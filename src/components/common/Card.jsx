import React from 'react';

export default function Card({
  children,
  className = '',
  glass = false,
  style = {},
  onClick
}) {
  const baseStyle = {
    backgroundColor: glass ? 'rgba(255, 255, 255, 0.92)' : '#FFFFFF',
    backdropFilter: glass ? 'blur(12px)' : 'none',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-card)',
    padding: '24px',
    transition: 'all 0.25s ease',
    ...style
  };

  return (
    <div
      style={baseStyle}
      className={`custom-card ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
