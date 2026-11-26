import React from 'react';
import { ShieldCheck, Heart, Building2, Globe } from 'lucide-react';

export default function TrustBar() {
  return (
    <section
      style={{
        borderTop: '1px solid rgba(30, 62, 52, 0.08)',
        borderBottom: '1px solid rgba(30, 62, 52, 0.08)',
        backgroundColor: '#FBFBF8',
        padding: '28px 24px'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px'
        }}
      >
        {/* Leading text */}
        <div style={{ minWidth: '220px' }}>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Better answers start with
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand-green)' }}>
            sources you can trust.
          </div>
        </div>

        {/* Logos & Trust Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '40px'
          }}
        >
          {/* WHO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-green)'
              }}
            >
              <Heart size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
                World Health
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-body)' }}>
                Organization
              </div>
            </div>
          </div>

          {/* CDC */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                color: 'var(--brand-green)'
              }}
            >
              CDC
            </div>
            <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '10px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                Centers for Disease
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                Control and Prevention
              </div>
            </div>
          </div>

          {/* MoHFW India */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-sage)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-green)'
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
                Ministry of Health &
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Family Welfare
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                GOVERNMENT OF INDIA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
