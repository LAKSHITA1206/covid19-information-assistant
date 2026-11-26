# COVID-19 Information Assistant

> **IBM Skill Lab Project**  
> An evidence-first, responsive web application faithfully reproduced from the Figma design specification (`preview-route=/assistant`).

---

## 🌟 Highlights & Figma Reproduction

This frontend reproduces the exact design system, aesthetics, layout, and components designed in Figma:

1. **Color Palette & Design Tokens**:
   - Primary Brand Green: `#1E3E34` (buttons, badges, icons, active nav indicators)
   - Background Canvas: Warm cream/ivory `#F7F8F4`
   - Secondary Accents: Sage green `#E8EFEA` & `#D4E3DB`
   - Dark Contrast Charcoal: `#13221E`
   - Cards: Pure white `#FFFFFF` with soft diffused shadows and border radii
2. **Typography**:
   - Modern, authoritative Plus Jakarta Sans & Playfair Display accents for medical headings.
3. **Hero Composition**:
   - Exact headline: *"Reliable COVID-19 Information. Clear Answers. Better Awareness."*
   - Status badge: *"• A LITTLE CLARITY. A LOT MORE CONFIDENCE."*
   - Doctor portrait container in organic arch frame
   - Floating Card 1: *"Good information. Better peace of mind. Grounded in trusted sources"* with verified shield
   - Floating Card 2: Interactive Chat preview card (*"A clearer conversation starts here"*, user message, assistant response, and *"📖 Sources: WHO · CDC"*)
   - Floating Badges: *"• Built around your well-being"* & Heart pulse badge
   - Bottom Trust Bar: World Health Organization (WHO), CDC, and Ministry of Health & Family Welfare (Gov of India)
4. **Interactive Features**:
   - Full conversational Assistant with voice simulation, suggested prompts, formatted markdown, and copy buttons
   - Public health epidemiological dashboard with 7-day trend visualizations, ICU metrics, and clinic finder
   - Digital COVID-19 Vaccination Passport with simulated QR code and dose chronology
   - Searchable, categorized Clinical & Care Guidelines library
   - Authentication (Login & Signup) with role selection
   - Video tour / "See how it works" interactive modal

---

## 📁 Project Structure

```
covid19-information-assistant/
├── index.html                     # HTML root with Google Fonts & metadata
├── package.json                   # Dependencies (React 18, Vite, Lucide-React, Router)
├── vite.config.js                 # Vite bundler configuration
├── dist/                          # Production-ready build artifacts
├── src/
│   ├── main.jsx                   # React root mount with BrowserRouter
│   ├── App.jsx                    # Central layout & route mapping
│   ├── assets/                    # Image assets & Figma thumbnails
│   ├── styles/
│   │   └── index.css              # Design system tokens, utilities & animations
│   ├── data/
│   │   └── sampleData.js          # Realistic dialogues, metrics, resources & passport data
│   ├── services/
│   │   └── api.js                 # Service abstraction ready for Python FastAPI backend
│   └── components/
│       ├── common/
│       │   ├── Button.jsx         # Interactive pill button with ↗ arrows & variants
│       │   ├── Badge.jsx          # Pill badges with status dots
│       │   ├── Card.jsx           # Elevation cards with soft borders
│       │   └── Modal.jsx          # "See how it works" interactive modal
│       ├── layout/
│       │   ├── Navbar.jsx         # Brand logo, nav links, divider, login, Get Started CTA
│       │   └── Footer.jsx         # Emergency hotlines (1075), trusted source links & attribution
│       ├── home/
│       │   ├── Hero.jsx           # Hero section matching Figma layout
│       │   ├── TrustBar.jsx       # Bottom trust logos (WHO, CDC, MoHFW)
│       │   ├── FeaturesSection.jsx# 6 core capability feature cards
│       │   └── AboutPage.jsx      # IBM Skill Lab overview & technical architecture
│       ├── assistant/
│       │   ├── AssistantPage.jsx  # Main Assistant container & drawer management
│       │   ├── ChatSidebar.jsx    # Session history, categories & new chat CTA
│       │   ├── ChatWindow.jsx     # Messages stream, voice mic toggle & input bar
│       │   ├── MessageBubble.jsx  # Formatted responses with sources chip & copy
│       │   └── SuggestedPrompts.jsx# Quick question suggestion pills
│       ├── dashboard/
│       │   └── DashboardPage.jsx  # Surveillance metrics, charts & testing centers
│       ├── profile/
│       │   └── ProfilePage.jsx    # Digital Vaccine Passport with QR code & dose history
│       └── auth/
│           ├── LoginPage.jsx      # Sign in card with validation & redirect
│           └── SignupPage.jsx     # Account registration with role selection
```

---

## 🚀 How to Run Locally

### 1. Navigate to the project directory:
```powershell
cd C:\Users\RADHE\.gemini\antigravity\scratch\covid19-information-assistant
```

### 2. Start the local Vite development server:
```powershell
npm run dev
```

The application will start on:
```
http://localhost:3000
```
Open this URL in your web browser.

---

## 🔍 How to Verify Every Page

| Route | Page | Key Elements to Verify |
|---|---|---|
| `/` | **Landing Page** | Top navigation, exact Figma headline, status badge, doctor hero arch, floating cards, interactive mini chat preview, "See how it works" modal, bottom trust logos (WHO, CDC, MoHFW), and 6 core feature cards. |
| `/assistant` | **Information Assistant** | Left sidebar with conversation history, category filters, New Chat button, active session chat stream, voice mic toggle, suggested prompt pills, source chips (`WHO · CDC`), copy response button, and emergency hotline quick dial. |
| `/dashboard` | **Health Dashboard** | National active cases, recovery rate, vaccine doses administered, 7-day trend chart, search bar for testing/vaccine centers, and official clinical advisory download banner. |
| `/resources` | **Care Guidelines** | Category filter tabs (`Patient Care`, `Vulnerable Groups`, `Travel Advisory`), live text search, and guideline cards with read times and verified sources. |
| `/profile` | **Health Passport** | Personal details, emergency contacts, digital vaccination certificate with simulated QR code, ABHA ID, and dose history (Dose 1, Dose 2, Precaution Booster). |
| `/login` | **Sign In** | Branded authentication card with prefilled sample credentials, password visibility toggle, and instant redirect to Assistant. |
| `/signup` | **Create Account** | Account registration form with role selection (Citizen, Healthcare Worker, Student/Researcher). |
| `/about` | **Project Architecture** | IBM Skill Lab mission, problem statement, and Python FastAPI backend readiness breakdown. |

---

## 🔌 FastAPI Backend Readiness
The frontend communicates through `src/services/api.js`. Once your Python FastAPI backend is ready with endpoints for `/api/chat`, `/api/metrics`, etc., set `USE_MOCK = false` in `src/services/api.js` to immediately transition to live backend data.
