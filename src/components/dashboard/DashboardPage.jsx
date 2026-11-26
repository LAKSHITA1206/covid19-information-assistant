import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  TrendingDown,
  ShieldCheck,
  Syringe,
  MapPin,
  Calendar,
  AlertCircle,
  FileDown,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Users
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { DASHBOARD_METRICS } from '../../data/sampleData';

export default function DashboardPage() {
  const [searchCity, setSearchCity] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const metrics = DASHBOARD_METRICS;

  const filteredCenters = metrics.testingCenters.filter((c) =>
    c.name.toLowerCase().includes(searchCity.toLowerCase()) ||
    c.address.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      {/* Page Title & Status */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '36px'
        }}
      >
        <div>
          <Badge dot={true} className="mb-2">
            Public Health Surveillance
          </Badge>
          <h1
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
              fontWeight: 800,
              color: 'var(--brand-green)',
              letterSpacing: '-0.02em',
              marginTop: '8px'
            }}
          >
            COVID-19 Health Dashboard
          </h1>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-body)', marginTop: '4px' }}>
            Integrated epidemiological tracking, ICU hospital capacities, and verified vaccination coverage.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/assistant">
            <Button variant="primary" size="md" iconRight={<ArrowUpRight size={17} />}>
              Ask Assistant
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}
      >
        {/* Active Cases */}
        <Card style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              National Active Cases
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'var(--accent-sage)', color: 'var(--brand-green)' }}>
              <Activity size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
            {metrics.nationalStats.activeCases}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#16A34A', fontWeight: 600, marginTop: '8px' }}>
            <TrendingDown size={16} />
            <span>{metrics.nationalStats.activeTrend} vs past 14 days</span>
          </div>
        </Card>

        {/* Recovery Rate */}
        <Card style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Recovery Rate
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'var(--accent-sage)', color: 'var(--brand-green)' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
            {metrics.nationalStats.recoveryRate}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            Sustained high recovery across all districts
          </div>
        </Card>

        {/* Total Vaccinations */}
        <Card style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Doses Administered
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'var(--accent-sage)', color: 'var(--brand-green)' }}>
              <Syringe size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
            {metrics.nationalStats.totalVaccinated}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            94.2% of adult population dual-vaccinated
          </div>
        </Card>

        {/* Positivity Rate & ICU */}
        <Card style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Test Positivity Rate
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'var(--accent-sage)', color: 'var(--brand-green)' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
            {metrics.nationalStats.positivityRate}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--brand-green)', fontWeight: 600, marginTop: '8px' }}>
            ICU Occupancy: {metrics.nationalStats.icuOccupancy} (Well below warning threshold)
          </div>
        </Card>
      </div>

      {/* Charts & Interactive Trend Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '36px'
        }}
      >
        {/* Weekly Trend Bar/Line Visualization */}
        <Card style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--brand-green)' }}>
                7-Day Infection vs Recovery Trajectory
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Daily epidemiological case notifications reported by sentinel labs.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--brand-green)' }} />
                <span>Recoveries</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#94A3B8' }} />
                <span>New Cases</span>
              </div>
            </div>
          </div>

          {/* SVG Trend Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '220px', paddingTop: '20px' }}>
            {metrics.weeklyTrend.map((item, idx) => {
              const maxVal = 2600;
              const casesHeight = (item.cases / maxVal) * 160;
              const recoveriesHeight = (item.recoveries / maxVal) * 160;

              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                    {/* Recovery bar */}
                    <div
                      title={`Recoveries: ${item.recoveries}`}
                      style={{
                        width: '18px',
                        height: `${recoveriesHeight}px`,
                        backgroundColor: 'var(--brand-green)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease'
                      }}
                    />
                    {/* Cases bar */}
                    <div
                      title={`Cases: ${item.cases}`}
                      style={{
                        width: '18px',
                        height: `${casesHeight}px`,
                        backgroundColor: '#CBD5E1',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Testing & Vaccine Centers Finder */}
        <Card style={{ padding: '28px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--brand-green)' }}>
              Nearby Diagnostic & Vaccination Centers
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Find certified testing facilities and booster clinics in your area.
            </p>
          </div>

          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '9999px',
              padding: '8px 16px',
              border: '1px solid var(--border-light)',
              marginBottom: '18px'
            }}
          >
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search by center name or address..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Centers List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredCenters.map((center, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: '#FAFAF7',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-sage)',
                    color: 'var(--brand-green)',
                    marginTop: '2px'
                  }}
                >
                  <MapPin size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {center.name}
                    </h4>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        backgroundColor: '#DCFCE7',
                        color: '#15803D'
                      }}
                    >
                      {center.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', marginTop: '2px' }}>
                    {center.address}
                  </p>
                  <div style={{ fontSize: '0.74rem', color: 'var(--brand-green)', fontWeight: 600, marginTop: '4px' }}>
                    {center.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Advisory & Download Banner */}
      <div
        style={{
          borderRadius: '24px',
          backgroundColor: 'var(--brand-green)',
          color: '#FFFFFF',
          padding: '36px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
            <AlertCircle size={14} /> Official Advisory Release
          </div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
            Clinical Guidelines for Updated Bivalent Vaccines (2026 Edition)
          </h3>
          <p style={{ fontSize: '0.94rem', opacity: 0.9, lineHeight: 1.5 }}>
            Comprehensive documentation covering dosage intervals, immunocompromised eligibility, and booster efficacy.
          </p>
        </div>

        <button
          onClick={() => alert('Downloading official public health guidelines PDF...')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#FFFFFF',
            color: 'var(--brand-green)',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.92rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FileDown size={18} />
          <span>Download Protocol PDF</span>
        </button>
      </div>
    </div>
  );
}
