import React from 'react';
import { Sparkles } from 'lucide-react';
import { SUGGESTED_PROMPTS } from '../../data/sampleData';

export default function SuggestedPrompts({ onSelectPrompt }) {
  return (
    <div style={{ margin: '14px 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}
      >
        <Sparkles size={14} color="var(--brand-green)" />
        <span>Suggested Questions</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            style={{
              padding: '8px 14px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-light)',
              color: 'var(--text-main)',
              fontSize: '0.84rem',
              fontWeight: 500,
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              transition: 'all 0.15s ease',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-green)';
              e.currentTarget.style.backgroundColor = 'var(--accent-sage)';
              e.currentTarget.style.color = 'var(--brand-green)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = 'var(--text-main)';
            }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
