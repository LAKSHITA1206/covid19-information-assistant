import React, { useState, useEffect } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { apiService } from '../../services/api';

export default function AssistantPage() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState('c1');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const convs = await apiService.getConversations();
      setConversations(convs);
      if (convs.length > 0 && !activeId) {
        setActiveId(convs[0].id);
      }
    }
    loadData();
  }, []);

  const activeConversation = conversations.find((c) => c.id === activeId) || conversations[0];

  const handleSendMessage = async (userText) => {
    if (!userText.trim()) return;

    const userMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Optimistically update conversation
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeId) {
          return {
            ...c,
            messages: [...(c.messages || []), userMessage]
          };
        }
        return c;
      })
    );

    setIsLoading(true);

    try {
      const aiReply = await apiService.sendMessage(activeId, userText);
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeId) {
            return {
              ...c,
              messages: [...c.messages, aiReply],
              updatedAt: 'Just now'
            };
          }
          return c;
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    const newId = 'c-' + Date.now();
    const newSession = {
      id: newId,
      title: 'New Health Inquiry',
      updatedAt: 'Just now',
      category: 'prevention',
      messages: [
        {
          id: 'welcome-' + newId,
          role: 'assistant',
          text: "Hello! I am your COVID-19 Information Assistant. I can assist you with evidence-grounded answers on:\n\n• Current variant symptoms and warning signs\n• Vaccine eligibility and booster schedules\n• Rapid antigen testing & home quarantine guidelines\n• Local healthcare facilities & international travel rules\n\nHow can I help you today?",
          sources: ['WHO Clinical Protocol', 'CDC Public Health Guidance'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setConversations([newSession, ...conversations]);
    setActiveId(newId);
    setSidebarOpen(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)', position: 'relative' }}>
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={(id) => setActiveId(id)}
        onNewChat={handleNewChat}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ChatWindow
        conversation={activeConversation}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: '73px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 90
          }}
        />
      )}

      <style>{`
        @media (max-width: 860px) {
          .assistant-sidebar {
            position: fixed !important;
            top: 73px !important;
            left: -320px !important;
            z-index: 100 !important;
            transition: left 0.3s ease !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
          }
          .assistant-sidebar.sidebar-open {
            left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
