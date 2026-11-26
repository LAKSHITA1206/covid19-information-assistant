import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  Phone,
  RefreshCw,
  ShieldAlert,
  Info,
  Menu
} from 'lucide-react';
import MessageBubble from './MessageBubble';
import SuggestedPrompts from './SuggestedPrompts';
import Button from '../common/Button';

export default function ChatWindow({
  conversation,
  onSendMessage,
  isLoading,
  onToggleSidebar
}) {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages, isLoading]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleSelectPrompt = (prompt) => {
    onSendMessage(prompt);
  };

  const handleToggleVoice = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice speech-to-text input
      setTimeout(() => {
        setInputText('What are the red flag symptoms that need emergency care?');
        setIsListening(false);
      }, 2400);
    } else {
      setIsListening(false);
    }
  };

  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 73px)',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative'
      }}
    >
      {/* Top Header of Chat Window */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Mobile sidebar toggle button */}
          <button
            onClick={onToggleSidebar}
            className="mobile-sidebar-btn"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: 'var(--accent-sage)',
              color: 'var(--brand-green)',
              display: 'none'
            }}
          >
            <Menu size={18} />
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-green)' }}>
                {conversation?.title || 'COVID-19 Information Assistant'}
              </h2>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--accent-sage)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--brand-green)'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2E7D32' }} />
                Active
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Verified clinical responses grounded in WHO, CDC & MoHFW advisories
            </div>
          </div>
        </div>

        {/* Emergency Helpline Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="tel:1075"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '9999px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <Phone size={14} />
            <span>Emergency 1075</span>
          </a>
        </div>
      </div>

      {/* Messages Stream */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {conversation?.messages?.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 20px',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-light)',
              maxWidth: '240px',
              animation: 'fadeIn 0.2s ease',
              marginBottom: '20px'
            }}
          >
            <RefreshCw size={16} color="var(--brand-green)" className="animate-spin" />
            <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Consulting WHO & CDC guidelines...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-light)',
          padding: '16px 24px',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.03)'
        }}
      >
        {/* Suggested Prompts Pills */}
        <SuggestedPrompts onSelectPrompt={handleSelectPrompt} />

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'var(--bg-primary)',
            border: isListening ? '1.5px solid #EF4444' : '1.5px solid var(--border-light)',
            borderRadius: '9999px',
            padding: '6px 10px 6px 18px',
            transition: 'border-color 0.2s ease',
            position: 'relative'
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isListening
                ? 'Listening to your question... Speak now...'
                : 'Ask anything about COVID-19 prevention, symptoms, boosters, travel...'
            }
            disabled={isLoading}
            style={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              outline: 'none',
              fontSize: '0.94rem',
              color: 'var(--text-main)',
              padding: '8px 0'
            }}
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleToggleVoice}
            title={isListening ? 'Stop listening' : 'Speak your question'}
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: isListening ? '#FEE2E2' : 'transparent',
              color: isListening ? '#DC2626' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          {/* Send Button */}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!inputText.trim() || isLoading}
            style={{ borderRadius: '9999px', padding: '10px 18px' }}
            iconRight={<Send size={15} />}
          >
            Ask
          </Button>
        </form>

        {/* Medical disclaimer note */}
        <div
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginTop: '10px'
          }}
        >
          Not a diagnostic device. In life-threatening emergencies, immediately dial national emergency helpline 1075 / 112.
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 860px) {
          .mobile-sidebar-btn { display: flex !important; }
        }
      `}</style>
    </main>
  );
}
