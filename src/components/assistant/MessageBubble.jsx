import React, { useState } from 'react';
import { BookOpen, Check, Copy, CheckCircle2, Volume2, Sparkles, User } from 'lucide-react';

export default function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render markdown-like bullet points and bold formatting
  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('• ') || line.startsWith('- ')) {
        const content = line.substring(2);
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '4px 0' }}>
            <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>•</span>
            <span>{parseBold(content)}</span>
          </div>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        const dotIndex = line.indexOf('. ');
        const num = line.substring(0, dotIndex);
        const content = line.substring(dotIndex + 2);
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '4px 0' }}>
            <span style={{ fontWeight: 700, color: 'var(--brand-green)' }}>{num}.</span>
            <span>{parseBold(content)}</span>
          </div>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--brand-green)', margin: '10px 0 4px 0' }}>
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (!line.trim()) {
        return <div key={idx} style={{ height: '6px' }} />;
      }
      return <p key={idx} style={{ margin: '4px 0' }}>{parseBold(line)}</p>;
    });
  };

  const parseBold = (str) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-main)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '20px',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      {/* Header Avatar / Label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '6px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          fontWeight: 600
        }}
      >
        {!isUser ? (
          <>
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '6px',
                backgroundColor: 'var(--brand-green)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <span>COVID-19 Assistant</span>
          </>
        ) : (
          <>
            <span>You</span>
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-sage)',
                color: 'var(--brand-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={12} />
            </div>
          </>
        )}
        <span style={{ fontSize: '0.72rem', opacity: 0.8 }}>{message.timestamp}</span>
      </div>

      {/* Bubble Container */}
      <div
        style={{
          maxWidth: '82%',
          backgroundColor: isUser ? '#F3F4EE' : '#FFFFFF',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          padding: '16px 20px',
          border: isUser ? '1px solid rgba(30, 62, 52, 0.08)' : '1px solid var(--border-light)',
          boxShadow: isUser ? 'none' : '0 4px 16px rgba(24, 61, 51, 0.05)',
          color: isUser ? 'var(--text-main)' : 'var(--text-body)',
          fontSize: '0.94rem',
          lineHeight: 1.6
        }}
      >
        {renderFormattedText(message.text)}

        {/* Sources Attribution Badge (for Assistant answers) */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(30, 62, 52, 0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <BookOpen size={14} color="var(--brand-green)" />
              <span>Grounded in: {message.sources.join(' · ')}</span>
              <CheckCircle2 size={13} color="var(--brand-green)" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: copied ? 'var(--brand-green)' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
