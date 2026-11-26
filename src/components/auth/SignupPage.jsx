import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowUpRight, Lock, Mail, User, CheckCircle2, HeartPulse } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { apiService } from '../../services/api';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Citizen'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.signup(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/assistant');
      }, 800);
    } catch (err) {
      alert('Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 73px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px'
      }}
    >
      <Card
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '40px',
          borderRadius: '24px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--brand-green)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              marginBottom: '16px'
            }}
          >
            <HeartPulse size={24} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-green)', letterSpacing: '-0.02em' }}>
            Create Your Account
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Get individualized health guidance, quarantine tracking, and vaccine passport sync.
          </p>
        </div>

        {success && (
          <div
            style={{
              backgroundColor: '#DCFCE7',
              border: '1px solid #BBF7D0',
              color: '#15803D',
              padding: '12px',
              borderRadius: '12px',
              fontSize: '0.86rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}
          >
            <CheckCircle2 size={18} />
            <span>Account created! Welcome to COVID-19 Assistant.</span>
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Full Name
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-primary)'
              }}
            >
              <User size={18} color="var(--text-muted)" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Johnson"
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.92rem' }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Email Address
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-primary)'
              }}
            >
              <Mail size={18} color="var(--text-muted)" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex.johnson@healthlab.org"
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.92rem' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Create Password
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-primary)'
              }}
            >
              <Lock size={18} color="var(--text-muted)" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 8 characters"
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.92rem' }}
              />
            </div>
          </div>

          {/* Role selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              User Profile Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-main)',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            >
              <option value="Citizen">General Citizen / Caregiver</option>
              <option value="Healthcare Worker">Healthcare Worker / First Responder</option>
              <option value="Student / Researcher">Student / Academic Researcher</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            iconRight={<ArrowUpRight size={18} />}
            style={{ width: '100%', marginTop: '12px' }}
          >
            {loading ? 'Creating...' : 'Register Account'}
          </Button>

          <div style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--brand-green)', fontWeight: 700 }}>
              Sign In
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
