// Frontend API Service Layer
// Live authentication uses the FastAPI backend. Other sample screens still
// use the realistic demo data below until their endpoints are connected.

import {
  INITIAL_CONVERSATIONS,
  DASHBOARD_METRICS,
  HEALTH_RESOURCES,
  MOCK_USER_PROFILE
} from '../data/sampleData';

const BASE_API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');
const USE_MOCK_CHAT = true;

async function requestJson(path, options = {}) {
  const response = await fetch(`${BASE_API_URL}${path}`, { credentials: 'include', ...options });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg).filter(Boolean).join(' ')
      : data.detail;
    throw new Error(detail || 'The request could not be completed.');
  }
  return data;
}

function jsonHeaders() {
  return { 'Content-Type': 'application/json' };
}

export const apiService = {
  // Send message to assistant
  async sendMessage(conversationId, userText) {
    if (!USE_MOCK_CHAT) {
      return await requestJson('/api/chat', {
        method: 'POST',
        headers: jsonHeaders(),
        body: JSON.stringify({ conversation_id: conversationId, message: userText })
      });
    }

    // Realistic mock AI response with evidence-grounding
    await new Promise((r) => setTimeout(r, 650));

    let replyText = "Here is what trusted health guidance indicates regarding your query:\n\n• Always monitor for persistent symptoms such as shortness of breath, sustained high fever, or confusion.\n• Ensure you maintain adequate rest, hydration, and safe distancing.\n• For personalized medical advice or prescription needs, please consult a certified physician.";
    let sources = ['WHO Guidelines', 'CDC COVID-19 Clinical Care'];

    const lower = userText.toLowerCase();
    if (lower.includes('protect') || lower.includes('family') || lower.includes('prevent')) {
      replyText = "Let's break it down. Small, everyday steps can help reduce your risk:\n\n• **Stay updated on vaccines \u0026 boosters**: Keeps severe illness risk to a minimum.\n• **Improve ventilation indoors**: Open windows or use air filtration where feasible.\n• **Practice hand hygiene**: Frequent washing with soap or using alcohol-based sanitizer.\n• **Wear high-filtration masks (N95/KN95)**: Particularly in crowded or poorly ventilated public spaces.\n• **Isolate if unwell**: Stay home if you or family members show acute respiratory symptoms.";
      sources = ['WHO Guidance', 'CDC Coronavirus Prevention'];
    } else if (lower.includes('symptom') || lower.includes('fever') || lower.includes('cough')) {
      replyText = "Key symptoms currently reported for respiratory variants include:\n\n1. **Mild to moderate fever or chills**\n2. **Dry or productive cough**\n3. **Sore throat and nasal congestion**\n4. **Body fatigue and muscle aches**\n5. **Mild gastrointestinal upset** (in some individuals)\n\n**Emergency warning signs**: If you experience persistent chest pain, bluish lips/face, or difficulty breathing, call emergency services (1075 / 911) immediately.";
      sources = ['CDC Symptoms List', 'MoHFW Advisory'];
    } else if (lower.includes('vaccine') || lower.includes('booster')) {
      replyText = "Evidence demonstrates that booster doses significantly restore antibody neutralization against evolving variants. Eligible groups include adults 50+, immunocompromised persons, and frontline healthcare personnel.";
      sources = ['WHO SAGE Vaccine Roadmap'];
    } else if (lower.includes('test') || lower.includes('positive') || lower.includes('quarantine')) {
      replyText = "If you test positive on a Rapid Antigen Test:\n\n1. **Isolate for at least 5 full days** from symptom onset or test date.\n2. **Wear an N95 mask** if you must be around others in the house.\n3. **End isolation after 5 days** only if you are fever-free for 24 hours without fever-reducing medication and symptoms are improving.";
      sources = ['CDC Isolation Protocol'];
    }

    return {
      id: 'msg-' + Date.now(),
      role: 'assistant',
      text: replyText,
      sources,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  },

  // Fetch conversations list
  async getConversations() {
    return [...INITIAL_CONVERSATIONS];
  },

  // Fetch dashboard metrics
  async getDashboardMetrics() {
    return DASHBOARD_METRICS;
  },

  // Fetch resources
  async getResources() {
    return HEALTH_RESOURCES;
  },

  // Fetch user profile
  async getUserProfile() {
    return MOCK_USER_PROFILE;
  },

  async getCurrentUser() {
    return await requestJson('/auth/me');
  },

  // Login and signup are always handled by the backend.
  async login(email, password) {
    const data = await requestJson('/auth/login', {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ email, password })
    });
    return data;
  },

  async signup(formData) {
    const data = await requestJson('/auth/signup', {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify(formData)
    });
    return data;
  },

  async logout() {
    return await requestJson('/auth/logout', { method: 'POST' });
  }
};
