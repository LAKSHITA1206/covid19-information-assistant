import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Activity,
  ShieldCheck,
  Plane,
  HeartPulse,
  Syringe,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function FeaturesSection() {
  const features = [
    {
      icon: <MessageSquare size={24} color="var(--brand-green)" />,
      title: 'Contextual AI Health Assistant',
      badge: 'Core Feature',
      desc: 'Ask complex respiratory questions in natural language and receive evidence-grounded answers with direct citations.'
    },
    {
      icon: <Activity size={24} color="var(--brand-green)" />,
      title: 'Real-Time Surveillance Dashboard',
      badge: 'Live Metrics',
      desc: 'Monitor regional positivity trends, ICU bed availability, and national recovery statistics updated on an ongoing basis.'
    },
    {
      icon: <Syringe size={24} color="var(--brand-green)" />,
      title: 'Vaccine Passport & Booster Schedules',
      badge: 'Health Records',
      desc: 'Digitally track previous immunization records, eligibility for annual bivalent boosters, and verify vaccination QR codes.'
    },
    {
      icon: <AlertTriangle size={24} color="var(--brand-green)" />,
      title: 'Misinformation & Myth Shield',
      badge: 'Fact-Checked',
      desc: 'Instant verification against viral claims and false remedies, backed by peer-reviewed infectious disease research.'
    },
    {
      icon: <Plane size={24} color="var(--brand-green)" />,
      title: 'Transit & Travel Policy Explorer',
      badge: 'Global Mobility',
      desc: 'Check country-specific entry criteria, quarantine mandates, and acceptable pre-departure testing methods.'
    },
    {
      icon: <HeartPulse size={24} color="var(--brand-green)" />,
      title: 'Home Care & Isolation Protocol',
      badge: 'Patient Care',
      desc: 'Step-by-step guidance on self-isolation, room sanitization, pulse oximetry thresholds, and when to seek emergency help.'
    }
  ];

  return (
    <section id="features" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px auto' }}>
        <Badge dot={true} className="mb-3">
          Designed for Clarity & Safety
        </Badge>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--brand-green)',
            letterSpacing: '-0.02em',
            marginTop: '12px',
            marginBottom: '16px'
          }}
        >
          Everything You Need to Navigate Respiratory Health
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
          Built with an evidence-first architecture so citizens, students, and healthcare professionals
          have trusted answers at their fingertips.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {features.map((f, i) => (
          <Card
            key={i}
            style={{
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            className="feature-card"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--accent-sage)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {f.icon}
                </div>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--text-muted)'
                  }}
                >
                  {f.badge}
                </span>
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(30, 62, 52, 0.06)' }}>
              <Link
                to="/assistant"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--brand-green)'
                }}
              >
                Explore capability <ArrowUpRight size={15} />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
