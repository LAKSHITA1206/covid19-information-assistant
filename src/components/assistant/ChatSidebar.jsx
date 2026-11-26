import React from 'react';
import { Plus, MessageSquare, Shield, ChevronRight, Activity, Filter } from 'lucide-react';
import Button from '../common/Button';

export default function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  selectedCategory,
  onSelectCategory,
  isOpen,
  onClose
}) {
  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'prevention', label: 'Prevention' },
    { id: 'symptoms', label: 'Symptoms' },
    { id: 'vaccines', label: 'Vaccines' }
  ];

  const filteredConversations = selectedCategory === 'all'
    ? conversations
    : conversations.filter((c) => c.category === selectedCategory);

  return (
    <aside
      style={{
        width: '320px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 73px)',
        position: 'sticky',
        top: '73px'
      }}
      className={`assistant-sidebar ${isOpen ? 'sidebar-open' : ''}`}
    >
      {/* Top Action */}
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)' }}>
        <Button
          variant="primary"
          size="md"
          className="w-full"
          iconLeft={<Plus size={18} />}
          onClick={onNewChat}
          style={{ width: '100%' }}
        >
          New Conversation
        </Button>
      </div>

      {/* Category Filter Pills */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(30, 62, 52, 0.06)',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto'
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: selectedCategory === cat.id ? 'var(--brand-green)' : 'var(--accent-sage)',
              color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--brand-green)',
              transition: 'all 0.15s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Conversations List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '6px 12px 10px 12px' }}>
          Recent Conversations
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filteredConversations.map((conv) => {
            const isActive = conv.id === activeId;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  onSelect(conv.id);
                  if (onClose) onClose();
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'var(--accent-sage)' : 'transparent',
                  border: isActive ? '1px solid rgba(30, 62, 52, 0.15)' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'var(--brand-green)' : '#F3F4EE',
                    color: isActive ? '#FFFFFF' : 'var(--brand-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MessageSquare size={16} />
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: isActive ? 700 : 500,
                      color: 'var(--text-main)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {conv.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {conv.updatedAt}
                  </div>
                </div>
                {isActive && <ChevronRight size={14} color="var(--brand-green)" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer Info */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid var(--border-light)',
          backgroundColor: '#FAFAF7',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-sage)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-green)'
          }}
        >
          <Shield size={16} />
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-green)' }}>
            IBM Skill Lab Engine
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Model: COVID-19 Clinical v2.4
          </div>
        </div>
      </div>
    </aside>
  );
}
