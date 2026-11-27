import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Ensure default demo user exists in users repository
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
  }, []);

  const getUsers = () => {
    try {
      const list = localStorage.getItem(DEFAULT_USERS_KEY);
      return list ? JSON.parse(list) : [INITIAL_DEMO_USER];
    } catch {
      return [INITIAL_DEMO_USER];
    }
  };

  const login = async (email, password) => {
    // Simulate brief network latency
    await new Promise((r) => setTimeout(r, 450));

    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      throw new Error('No account found with this email address. Please sign up first.');
    }

    if (user.password !== password) {
      throw new Error('Incorrect password. Please verify your credentials or use the demo credentials.');
    }

    // Login successful
    const sessionUser = { ...user };
    delete sessionUser.password; // do not store password in active session

    setCurrentUser(sessionUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  };

  const signup = async ({ name, email, password, role }) => {
    await new Promise((r) => setTimeout(r, 500));

    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email address already exists. Please log in.');
    }

    // Generate random 4-digit ABHA suffix
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newUser = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password: password,
      role: role || 'Citizen',
      phone: '+91 98000 00000',
      city: 'India',
      bloodGroup: 'B+',
      emergencyContact: {
        name: 'Family Member',
        relation: 'Primary Contact',
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

    users.push(newUser);
    localStorage.setItem(DEFAULT_USERS_KEY, JSON.stringify(users));

    // Automatically log in newly signed up user
    const sessionUser = { ...newUser };
    delete sessionUser.password;

    setCurrentUser(sessionUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        demoCredentials: {
          email: INITIAL_DEMO_USER.email,
          password: INITIAL_DEMO_USER.password
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
