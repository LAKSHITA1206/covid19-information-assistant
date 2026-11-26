import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Play,
  ShieldCheck,
  Check,
  Sparkles,
  Heart,
  BookOpen,
  CheckCircle2,
  Activity,
  Bot
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Modal from '../common/Modal';

export default function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section
      style={{
        padding: '40px 24px 60px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}
        className="hero-grid"
      >
        {/* Left Column: Headlines & CTA */}
        <div>
          {/* Status Badge */}
          <div style={{ marginBottom: '24px' }}>
            <Badge dot={true}>
              A Little Clarity. A Lot More Confidence.
            </Badge>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: 'var(--brand-green)',
              marginBottom: '24px'
            }}
          >
            Reliable COVID-19<br />
            Information.<br />
            Clear Answers.<br />
            Better Awareness.
          </h1>

          {/* Subtitle Description */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
              lineHeight: 1.6,
              color: 'var(--text-body)',
              maxWidth: '540px',
              marginBottom: '36px'
            }}
          >
            Health information shouldn’t be overwhelming. Get clear,
            trustworthy answers to your COVID-19 questions—with a little help
            from your information assistant.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px'
            }}
          >
            <Link to="/assistant">
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowUpRight size={20} />}
              >
                Start Conversation
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              iconLeft={
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-green)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Play size={12} fill="white" style={{ marginLeft: '2px' }} />
                </div>
              }
              onClick={() => setIsVideoModalOpen(true)}
            >
              See how it works
            </Button>
          </div>

          {/* Trust Checklist Points */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '24px',
              fontSize: '0.88rem',
              color: 'var(--text-body)',
              fontWeight: 600
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={18} color="var(--brand-green)" />
              <span>Evidence-informed answers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={18} color="var(--brand-green)" strokeWidth={2.5} />
              <span>Free to explore</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={18} color="var(--brand-green)" strokeWidth={2.5} />
              <span>Here, 24/7</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Composition with Doctor, Chat Preview Card, and Badges */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '520px'
          }}
        >
          {/* Subtle Decorative Background Rings */}
          <div
            style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(30, 62, 52, 0.12)',
              pointerEvents: 'none'
            }}
          />

          {/* Doctor Hero Image Container with Arch Shape */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '430px',
              height: '500px',
              borderRadius: '240px 240px 40px 40px',
              overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(30, 62, 52, 0.12)',
              backgroundColor: '#DDE7E1'
            }}
          >
            {/* High quality medical portrait */}
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000"
              alt="Medical Professional Doctor"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block'
              }}
            />
          </div>

          {/* Floating Card Top-Right: Good information */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              right: '-12px',
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'var(--shadow-floating)',
              border: '1px solid rgba(30, 62, 52, 0.08)',
              zIndex: 3,
              maxWidth: '290px'
            }}
            className="animate-float"
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
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
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                Good information.
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Better peace of mind.
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Grounded in trusted sources
              </div>
            </div>
            <div style={{ marginLeft: 'auto', color: 'var(--brand-green)' }}>
              <CheckCircle2 size={16} />
            </div>
          </div>

          {/* Floating Heart Accent Badge */}
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '-20px',
              backgroundColor: 'var(--accent-sage)',
              border: '1px solid rgba(30, 62, 52, 0.12)',
              borderRadius: '16px',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-green)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              zIndex: 2
            }}
          >
            <Heart size={22} fill="var(--brand-green)" style={{ opacity: 0.8 }} />
          </div>

          {/* Floating Pill Bottom-Right: Built around your well-being */}
          <div
            style={{
              position: 'absolute',
              bottom: '120px',
              right: '-16px',
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 28px rgba(30, 62, 52, 0.1)',
              border: '1px solid rgba(30, 62, 52, 0.08)',
              zIndex: 3
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-green)'
              }}
            />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Built around your well-being
            </span>
          </div>

          {/* Chat Preview Card Overlay Bottom-Left (Matching Figma screenshot perfectly) */}
          <div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: 'var(--shadow-floating)',
              border: '1px solid rgba(30, 62, 52, 0.08)',
              width: '100%',
              maxWidth: '380px',
              zIndex: 4
            }}
            className="animate-fade-in"
          >
            {/* Chat Card Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(30, 62, 52, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--brand-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  A clearer conversation starts here
                </span>
              </div>
              <Sparkles size={16} color="var(--brand-green)" />
            </div>

            {/* User Message Bubble */}
            <div
              style={{
                backgroundColor: '#F3F4EE',
                borderRadius: '14px 14px 2px 14px',
                padding: '10px 14px',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                fontWeight: 500,
                marginBottom: '10px',
                marginLeft: 'auto',
                maxWidth: '92%'
              }}
            >
              How can I protect myself and my family?
            </div>

            {/* Assistant Response Bubble */}
            <div
              style={{
                backgroundColor: '#FAFAF7',
                border: '1px solid rgba(30, 62, 52, 0.06)',
                borderRadius: '14px 14px 14px 2px',
                padding: '10px 14px',
                fontSize: '0.82rem',
                color: 'var(--text-body)',
                lineHeight: 1.5,
                marginBottom: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>•</span>
                <span>Let's break it down. Small, everyday steps can help reduce your risk.</span>
              </div>
            </div>

            {/* Sources Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                fontWeight: 600
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={13} />
                <span>Sources: WHO · CDC</span>
              </div>
              <Check size={14} color="var(--brand-green)" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive "See How It Works" Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Interactive Platform Demo"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
            The <strong>COVID-19 Information Assistant</strong> leverages structured health knowledge
            directly derived from verified guidelines by the WHO, CDC, and Indian Ministry of Health.
          </p>

          <div
            style={{
              borderRadius: '16px',
              backgroundColor: 'var(--bg-primary)',
              padding: '18px',
              border: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-green)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}
              >
                1
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Type or speak your concern in plain language.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-green)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}
              >
                2
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Get grounded responses with citations & action items.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-green)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}
              >
                3
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Access real-time bed capacity, testing centers & travel policies.</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Link to="/assistant" onClick={() => setIsVideoModalOpen(false)}>
              <Button variant="primary" size="md" iconRight={<ArrowUpRight size={16} />}>
                Try Assistant Live Now
              </Button>
            </Link>
          </div>
        </div>
      </Modal>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
