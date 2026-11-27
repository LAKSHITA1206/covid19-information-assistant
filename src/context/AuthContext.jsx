import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

const DEFAULT_USERS_KEY = 'covid_assistant_users';
const CURRENT_USER_KEY = 'covid_assistant_current_user';

const INITIAL_DEMO_USER = {
  id: 'usr-demo-1',
  name: 'Alex Johnson',
  email: 'alex.johnson@healthlab.org',
  password: 'SecurePass2026!',
  role: 'Citizen',
  phone: '+91 98765 43210',
  city: 'New Delhi, India',
  bloodGroup: 'O+',
  emergencyContact: {
    name: 'Sarah Johnson',
    relation: 'Spouse',
    phone: '+91 98765 12345'
  },
  vaccineRecord: {
    status: 'Fully Vaccinated + Booster',
    beneficiaryId: 'ABHA-9821-4402-9118',
    doses: [
      { dose: 'Dose 1', vaccine: 'Covishield / Oxford-AstraZeneca', date: '14 May 2021', center: 'Apollo Health Hub' },
      { dose: 'Dose 2', vaccine: 'Covishield / Oxford-AstraZeneca', date: '10 Aug 2021', center: 'Apollo Health Hub' },
      { dose: 'Precaution / Booster', vaccine: 'Corbevax Heterologous Booster', date: '18 Oct 2023', center: 'City Civic Dispensary' },
      { dose: 'Annual Booster', vaccine: 'Updated Bivalent Formulation', date: '12 Jan 2025', center: 'Central Polyclinic' }
    ]
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Initialize demo user repository and check current backend session
  useEffect(() => {
    try {
      const existing = localStorage.getItem(DEFAULT_USERS_KEY);
      if (!existing) {
        localStorage.setItem(DEFAULT_USERS_KEY, JSON.stringify([INITIAL_DEMO_USER]));
      } else {
        const users = JSON.parse(existing);
        const hasDemo = users.some((u) => u.email.toLowerCase() === INITIAL_DEMO_USER.email.toLowerCase());
        if (!hasDemo) {
          users.push(INITIAL_DEMO_USER);
          localStorage.setItem(DEFAULT_USERS_KEY, JSON.stringify(users));
        }
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    // Try checking backend session, otherwise fallback to local saved session
    apiService.getCurrentUser()
      .then((backendUser) => {
        if (backendUser) {
          setUser(backendUser);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(backendUser));
        }
      })
      .catch(() => {
        // Backend not reachable or unauthenticated, keep local saved user if any
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getLocalUsers = () => {
    try {
      const list = localStorage.getItem(DEFAULT_USERS_KEY);
      return list ? JSON.parse(list) : [INITIAL_DEMO_USER];
    } catch {
      return [INITIAL_DEMO_USER];
    }
  };

  const handleSignIn = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. First attempt to log in through the FastAPI / Serverless backend
    try {
      const result = await apiService.login(email, password);
      if (result && (result.user || result.email)) {
        const activeUser = result.user || {
          name: result.name || email.split('@')[0],
          email: cleanEmail,
          role: result.role || 'Citizen'
        };
        setUser(activeUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(activeUser));
        return { success: true, user: activeUser };
      }
    } catch (backendError) {
      console.warn('Backend login attempt failed, checking local repository:', backendError.message);
    }

    // 2. Fallback to local user registry (for demo accounts & client-side persistence)
    const localUsers = getLocalUsers();
    const matched = localUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!matched) {
      throw new Error('No account found with this email. Please check your credentials or create an account.');
    }

    if (matched.password !== password) {
      throw new Error('Incorrect password. Please verify your credentials or click "Fill Demo Credentials".');
    }

    const sessionUser = { ...matched };
    delete sessionUser.password;

    setUser(sessionUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  };

  const handleSignUp = async (formData) => {
    const { name, email, password, role } = formData;
    const cleanEmail = email.trim().toLowerCase();

    // 1. Attempt signup with backend
    try {
      const result = await apiService.signup(formData);
      if (result && (result.user || result.email)) {
        const newUser = result.user || {
          name: name.trim(),
          email: cleanEmail,
          role: role || 'Citizen'
        };
        setUser(newUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
        return { success: true, user: newUser };
      }
    } catch (backendError) {
      console.warn('Backend signup attempt failed, saving to local repository:', backendError.message);
    }

    // 2. Fallback to local user registry
    const localUsers = getLocalUsers();
    if (localUsers.some((u) => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email address already exists. Please log in.');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newUser = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password,
      role: role || 'Citizen',
      phone: '+91 98000 00000',
      city: 'India',
      bloodGroup: 'B+',
      emergencyContact: {
        name: 'Primary Contact',
        relation: 'Family',
        phone: '+91 98000 11111'
      },
      vaccineRecord: {
        status: 'Fully Vaccinated',
        beneficiaryId: `ABHA-9821-4402-${randomSuffix}`,
        doses: [
          { dose: 'Dose 1', vaccine: 'Covishield / Oxford-AstraZeneca', date: '20 May 2021', center: 'Primary Health Center' },
          { dose: 'Dose 2', vaccine: 'Covishield / Oxford-AstraZeneca', date: '18 Aug 2021', center: 'Community Vaccination Site' },
          { dose: 'Booster Dose', vaccine: 'Updated Bivalent Booster', date: '15 Nov 2024', center: 'District Health Center' }
        ]
      }
    };

    localUsers.push(newUser);
    localStorage.setItem(DEFAULT_USERS_KEY, JSON.stringify(localUsers));

    const sessionUser = { ...newUser };
    delete sessionUser.password;

    setUser(sessionUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    apiService.logout().catch(() => {});
  };

  const contextValue = useMemo(() => ({
    user,
    currentUser: user,
    isAuthenticated: !!user,
    loading,
    signIn: handleSignIn,
    login: handleSignIn,
    signUp: handleSignUp,
    signup: handleSignUp,
    signOut: handleSignOut,
    logout: handleSignOut,
    demoCredentials: {
      email: INITIAL_DEMO_USER.email,
      password: INITIAL_DEMO_USER.password
    }
  }), [user, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}
