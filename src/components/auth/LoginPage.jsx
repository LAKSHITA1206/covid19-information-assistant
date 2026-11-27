import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, ArrowUpRight, Lock, Mail, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, login, demoCredentials } = useAuth();
  const performLogin = signIn || login;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await performLogin(email, password);
      setSuccess(true);
      setTimeout(() => {
        const destination = location.state?.from?.pathname || '/assistant';
        navigate(destination, { replace: true });
      }, 700);
    } catch (err) {
      setErrorMsg(err.message || 'Sign in failed. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    if (demoCredentials) {
      setEmail(demoCredentials.email);
      setPassword(demoCredentials.password);
    } else {
      setEmail('alex.johnson@healthlab.org');
      setPassword('SecurePass2026!');
    }
    setErrorMsg('');
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
            Sign in to access your digital vaccination passport & medical consultations.
          </p>
        </div>

        {/* Demo Account Quick-Fill Helper */}
        <div
          style={{
            backgroundColor: 'var(--accent-sage)',
            border: '1px solid rgba(30, 62, 52, 0.1)',
            borderRadius: '14px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--brand-green)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--brand-green)' }}>
              Testing the app?
            </span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--brand-green)',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: '9999px',
              border: '1px solid rgba(30, 62, 52, 0.15)',
              cursor: 'pointer'
            }}
          >
            Fill Demo Credentials
          </button>
        </div>

        {/* Success Alert */}
        {success && (
          <div
            style={{
              backgroundColor: '#DCFCE7',
              border: '1px solid #BBF7D0',
              color: '#15803D',
              padding: '12px 16px',
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
            <span>Login successful! Opening Assistant...</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div
            role="alert"
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '0.86rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
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
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  handleFillDemo();
                }}
                style={{ fontSize: '0.78rem', color: 'var(--brand-green)', fontWeight: 600 }}
              >
                Use demo account
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="••••••••••••"
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.92rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
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
            style={{ width: '100%', marginTop: '6px' }}
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
