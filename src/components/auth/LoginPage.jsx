import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowUpRight, Lock, Mail, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { apiService } from '../../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('alex.johnson@healthlab.org');
  const [password, setPassword] = useState('SecurePass2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.login(email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/assistant');
      }, 800);
    } catch (err) {
      alert('Login failed. Please check your credentials.');
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
          maxWidth: '460px',
          width: '100%',
          padding: '40px',
          borderRadius: '24px'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
              marginBottom: '16px',
              boxShadow: '0 4px 12px rgba(30, 62, 52, 0.2)'
            }}
          >
            <Shield size={24} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-green)', letterSpacing: '-0.02em' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Log in to access your digital vaccination passport & saved medical consultations.
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
            <span>Login successful! Redirecting to Assistant...</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.92rem' }}
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to demo email.'); }} style={{ fontSize: '0.78rem', color: 'var(--brand-green)', fontWeight: 600 }}>
                Forgot password?
              </a>
            </div>
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
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.92rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            iconRight={<ArrowUpRight size={18} />}
            style={{ width: '100%', marginTop: '8px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>

          {/* Sign Up Link */}
          <div style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            Don’t have an account yet?{' '}
            <Link to="/signup" style={{ color: 'var(--brand-green)', fontWeight: 700 }}>
              Create Account
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
