import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Phone, ExternalLink, HelpCircle, FileText } from 'lucide-react';
import { TRUSTED_SOURCES } from '../../data/sampleData';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-light)',
        padding: '60px 24px 32px 24px',
        color: 'var(--text-body)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--brand-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-green)' }}>
                COVID-19 . ASSISTANT
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              Built for the IBM Skill Lab Project. Providing clear, grounded, and verified respiratory health
              information with evidence-backed clarity.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-sage)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--brand-green)'
              }}
            >
              <ShieldCheck size={16} /> Health Information Demo
            </div>
          </div>

          {/* Fast Navigation */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: 'var(--text-body)' }}>Home & Overview</Link></li>
              <li><Link to="/assistant" style={{ color: 'var(--text-body)' }}>Information Assistant</Link></li>
              <li><Link to="/dashboard" style={{ color: 'var(--text-body)' }}>Public Health Dashboard</Link></li>
              <li><Link to="/resources" style={{ color: 'var(--text-body)' }}>Care & Guidelines Library</Link></li>
              <li><Link to="/profile" style={{ color: 'var(--text-body)' }}>Health Passport & Records</Link></li>
            </ul>
          </div>

          {/* Trusted Authorities */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
              Grounded In Sources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              {TRUSTED_SOURCES.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.website}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-body)' }}
                  >
                    <span>{s.name} ({s.abbr})</span>
                    <ExternalLink size={13} style={{ opacity: 0.6 }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Hotlines */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
              Emergency Helplines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>National Health Toll-Free</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={16} /> 1075 / 112
                </div>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Medical Disclaimer: This assistant provides public health education and does not replace emergency medical diagnosis or treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © 2026 COVID-19 Information Assistant. Developed for <strong>IBM Skill Lab Project</strong>.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Evidence Framework</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
