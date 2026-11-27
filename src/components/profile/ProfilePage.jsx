import React from 'react';
import {
  User,
  ShieldCheck,
  QrCode,
  FileDown,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Syringe,
  CheckCircle2,
  Clock,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USER_PROFILE } from '../../data/sampleData';

export default function ProfilePage() {
  const { user, currentUser, isAuthenticated, logout, signOut } = useAuth();
  const navigate = useNavigate();
  const activeUser = user || currentUser;
  const performLogout = logout || signOut;

  // Combine authenticated user details with health passport records
  const profile = {
    ...MOCK_USER_PROFILE,
    name: activeUser?.name || MOCK_USER_PROFILE.name,
    email: activeUser?.email || MOCK_USER_PROFILE.email,
    role: activeUser?.role || MOCK_USER_PROFILE.role
  };

  const initials = profile.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      {/* Title */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '32px' }}>
        <div>
          <Badge dot={true} className="mb-2">Verified Citizen Account</Badge>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--brand-green)', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Personal Health Passport & Records
          </h1>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-body)', marginTop: '4px' }}>
            Digital proof of vaccination, emergency medical contacts, and verified immunity milestones.
          </p>
        </div>

        {isAuthenticated && (
          <button
            onClick={() => {
              performLogout();
              navigate('/login');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '9999px',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              fontWeight: 700,
              fontSize: '0.86rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}
      >
        {/* Left: User Details Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-green)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 700
                }}
              >
                {initials}
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-green)' }}>
                  {profile.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {profile.role || 'Citizen'} • Blood Group: <strong>{profile.bloodGroup || 'O+'}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-body)' }}>
                <Mail size={16} color="var(--brand-green)" />
                <span>{profile.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-body)' }}>
                <Phone size={16} color="var(--brand-green)" />
                <span>{profile.phone || '+91 98765 43210'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-body)' }}>
                <MapPin size={16} color="var(--brand-green)" />
                <span>{profile.city || 'India'}</span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div
              style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-light)'
              }}
            >
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--brand-green)', marginBottom: '8px' }}>
                Emergency Contact
              </h4>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                <div>
                  {profile.emergencyContact?.name || 'Primary Contact'} ({profile.emergencyContact?.relation || 'Emergency'})
                </div>
                <div style={{ fontWeight: 600, color: 'var(--brand-green)', marginTop: '2px' }}>
                  {profile.emergencyContact?.phone || '+91 98765 12345'}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Digital Vaccination Passport Card with Simulated QR Code */}
        <Card
          style={{
            padding: '36px',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '2px solid var(--accent-sage)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Top Decorative Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1.5px dashed var(--border-light)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Digital Health Certificate
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-green)' }}>
                COVID-19 Vaccination Passport
              </h3>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              <ShieldCheck size={16} /> Verified
            </div>
          </div>

          {/* QR Code and Beneficiary ID */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '28px',
              backgroundColor: 'var(--bg-primary)',
              padding: '18px',
              borderRadius: '16px'
            }}
          >
            {/* Simulated Clean SVG QR Code */}
            <div
              style={{
                width: '90px',
                height: '90px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-light)'
              }}
            >
              <QrCode size={74} color="var(--brand-green)" />
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Universal Health ID (ABHA)
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-green)', letterSpacing: '0.03em' }}>
                {profile.vaccineRecord?.beneficiaryId || 'ABHA-9821-4402-9118'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-body)', marginTop: '4px' }}>
                Status: <strong style={{ color: '#15803D' }}>{profile.vaccineRecord?.status || 'Fully Vaccinated'}</strong>
              </div>
            </div>
          </div>

          {/* Doses Chronology */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            {(profile.vaccineRecord?.doses || []).map((d, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#FAFAF7',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div
                  style={{
                    padding: '6px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-sage)',
                    color: 'var(--brand-green)',
                    marginTop: '2px'
                  }}
                >
                  <Syringe size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {d.dose}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      {d.date}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--brand-green)', fontWeight: 600 }}>
                    {d.vaccine}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Administered at {d.center}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Download Pass Action */}
          <Button
            variant="primary"
            size="md"
            iconLeft={<FileDown size={18} />}
            style={{ width: '100%' }}
            onClick={() => alert(`Certificate downloaded for ${profile.name}: COVID19-Vaccine-Passport.pdf`)}
          >
            Download Official Vaccination Certificate (PDF)
          </Button>
        </Card>
      </div>
    </div>
  );
}
