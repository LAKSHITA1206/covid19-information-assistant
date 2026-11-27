import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Server, Cpu, Database, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 56px auto' }}>
        <Badge dot={true} className="mb-2">Academic & Innovation Showcase</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--brand-green)', letterSpacing: '-0.02em', marginTop: '10px' }}>
          About the IBM Skill Lab Project
        </h1>
        <p style={{ fontSize: '1.08rem', color: 'var(--text-body)', marginTop: '10px', lineHeight: 1.6 }}>
          The COVID-19 Information Assistant is an evidence-first web application designed to combat
          health misinformation and provide responsive clinical guidance.
        </p>
      </div>

      {/* Mission & Problem Statement */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '48px'
        }}
      >
        <Card style={{ padding: '36px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--accent-sage)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-green)',
              marginBottom: '20px'
            }}
          >
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-green)', marginBottom: '12px' }}>
            Problem Statement
          </h3>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
            During respiratory outbreaks, public forums are overwhelmed with contradictory claims, outdated isolation rules,
            and unverified remedies. Citizens need a centralized, approachable interface that grounds every answer in recognized
            international and domestic health directives.
          </p>
        </Card>

        <Card style={{ padding: '36px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--accent-sage)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-green)',
              marginBottom: '20px'
            }}
          >
            <Award size={24} />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-green)', marginBottom: '12px' }}>
            The Skill Lab Solution
          </h3>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
            Our solution pairs a friendly conversational assistant with real-time epidemiological metrics, quarantine protocols,
            and vaccine passport verification. Designed with high visual fidelity, seamless accessibility, and clean component architecture.
          </p>
        </Card>
      </div>

      {/* Architecture & Backend Readiness */}
      <Card style={{ padding: '40px', marginBottom: '48px', backgroundColor: '#FFFFFF' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-green)', marginBottom: '16px' }}>
          React App & FastAPI Backend
        </h3>
        <p style={{ fontSize: '0.96rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '28px' }}>
          Account creation and sign-in are connected to the Python FastAPI backend. It stores accounts in SQLite, verifies hashed passwords, and protects the assistant and profile routes with signed access tokens:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}
        >
          <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--brand-green)', marginBottom: '8px' }}>
              <Cpu size={18} /> Frontend Client
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
              React 18 + Vite with modular components, responsive layouts, and interactive state management.
            </p>
          </div>

          <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--brand-green)', marginBottom: '8px' }}>
              <Server size={18} /> API Service Layer
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
              Live account routes: `/auth/signup`, `/auth/login`, and `/auth/me`. Dashboard and resource screens still show sample data.
            </p>
          </div>

          <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--brand-green)', marginBottom: '8px' }}>
              <Database size={18} /> FastAPI Target
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
              The authenticated chat endpoint is a placeholder. A verified health content provider must be connected before it can answer medical questions.
            </p>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <Link to="/assistant">
          <Button variant="primary" size="lg" iconRight={<ArrowUpRight size={18} />}>
            Experience The Information Assistant
          </Button>
        </Link>
      </div>
    </div>
  );
}
