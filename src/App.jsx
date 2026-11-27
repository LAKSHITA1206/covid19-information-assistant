import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import TrustBar from './components/home/TrustBar';
import FeaturesSection from './components/home/FeaturesSection';
import AssistantPage from './components/assistant/AssistantPage';
import DashboardPage from './components/dashboard/DashboardPage';
import ResourcesPage from './components/resources/ResourcesPage';
import ProfilePage from './components/profile/ProfilePage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import AboutPage from './components/home/AboutPage';
import { AuthProvider } from './context/AuthContext';

function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturesSection />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isChatbotRoute = location.pathname === '/assistant';

  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>

        {!isChatbotRoute && <Footer />}
      </div>
    </AuthProvider>
  );
}
