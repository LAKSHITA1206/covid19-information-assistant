import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Shield, Activity, User, LogOut } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/#features' },
    { name: 'Resources', path: '/resources' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Assistant', path: '/assistant' }
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(247, 248, 244, 0.94)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(30, 62, 52, 0.08)',
        transition: 'all 0.2s ease'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--brand-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(30, 62, 52, 0.2)'
            }}
          >
            {/* Medical Cross with Heart/Leaf Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4V20M4 12H20"
                stroke="white"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="2.5" fill="#E8EFEA" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--brand-green)',
                lineHeight: 1.1
              }}
            >
              COVID-19 <span style={{ color: 'var(--text-muted)' }}>.</span>
            </div>
            <div
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}
            >
              Information Assistant
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                fontSize: '0.92rem',
                fontWeight: isActive(link.path) ? 700 : 500,
                color: isActive(link.path) ? 'var(--brand-green)' : 'var(--text-body)',
                transition: 'color 0.2s ease',
                position: 'relative'
              }}
            >
              {link.name}
              {isActive(link.path) && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    borderRadius: '2px',
                    backgroundColor: 'var(--brand-green)'
                  }}
                />
              )}
            </Link>
          ))}

          {/* Divider | */}
          <div
            style={{
              width: '1px',
              height: '20px',
              backgroundColor: 'rgba(30, 62, 52, 0.2)',
              margin: '0 4px'
            }}
          />

          {/* Dynamic Authentication Controls */}
          {isAuthenticated && currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--accent-sage)',
                  color: 'var(--brand-green)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-green)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  {getInitials(currentUser.name)}
                </div>
                <span>{currentUser.name}</span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                title="Sign out"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: 'transparent'
                }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                transition: 'color 0.2s ease'
              }}
            >
              Log in
            </Link>
          )}

          {/* Get Started ↗ button */}
          <Link to="/assistant">
            <Button
              variant="primary"
              size="md"
              iconRight={<ArrowUpRight size={17} />}
            >
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="mobile-toggle" style={{ display: 'flex' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--brand-green)',
              backgroundColor: 'var(--accent-sage)'
            }}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-light)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
          className="animate-fade-in"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: isActive(link.path) ? 'var(--brand-green)' : 'var(--text-body)',
                padding: '6px 0'
              }}
            >
              {link.name}
            </Link>
          ))}
          <div
            style={{
              height: '1px',
              backgroundColor: 'var(--border-light)',
              margin: '8px 0'
            }}
          />
          {isAuthenticated && currentUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand-green)' }}
              >
                Profile ({currentUser.name})
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#DC2626',
                  textAlign: 'left',
                  padding: '4px 0'
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}
            >
              Log in
            </Link>
          )}
          <Link to="/assistant" onClick={() => setMobileMenuOpen(false)}>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              iconRight={<ArrowUpRight size={17} />}
            >
              Get Started
            </Button>
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
