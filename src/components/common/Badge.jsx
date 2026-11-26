import React from 'react';

export default function Badge({
  children,
  dot = false,
  icon,
  variant = 'default', // 'default', 'success', 'accent', 'neutral'
  className = ''
}) {
  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    backgroundColor: 'var(--accent-badge-bg)',
    color: 'var(--brand-green)',
    border: '1px solid rgba(30, 62, 52, 0.1)',
    lineHeight: 1.2
  };

  return (
    <span style={styles} className={`badge ${className}`}>
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--brand-green)',
            display: 'inline-block'
          }}
        />
      )}
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
