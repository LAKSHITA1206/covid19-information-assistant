// Realistic sample data for COVID-19 Information Assistant
// Ready for future integration with Python FastAPI backend

export const TRUSTED_SOURCES = [
  {
    id: 'who',
    name: 'World Health Organization',
    abbr: 'WHO',
    verified: true,
    website: 'https://www.who.int'
  },
  {
    id: 'cdc',
    name: 'Centers for Disease Control and Prevention',
    abbr: 'CDC',
    verified: true,
    website: 'https://www.cdc.gov'
  },
  {
    id: 'mohfw',
    name: 'Ministry of Health & Family Welfare',
    subtext: 'GOVERNMENT OF INDIA',
    abbr: 'MoHFW',
    verified: true,
    website: 'https://www.mohfw.gov.in'
  },
  {
    id: 'icmr',
    name: 'Indian Council of Medical Research',
    abbr: 'ICMR',
    verified: true,
    website: 'https://www.icmr.gov.in'
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'c1',
    title: 'General Prevention & Family Care',
    updatedAt: 'Just now',
    category: 'prevention',
    messages: [
      {
        id: 'm1',
        role: 'user',
        text: 'How can I protect myself and my family?',
        timestamp: '10:30 AM'
      },
      {
        id: 'm2',
        role: 'assistant',
        text: "Let's break it down. Small, everyday steps can help reduce your risk significantly:\n\n• **Stay updated on vaccines & boosters**: Keeps severe illness risk to a minimum.\n• **Improve ventilation indoors**: Open windows or use air filtration where feasible.\n• **Practice hand hygiene**: Frequent washing with soap or using alcohol-based sanitizer.\n• **Wear high-filtration masks (N95/KN95)**: Particularly in crowded or poorly ventilated public spaces.\n• **Isolate if unwell**: Stay home if you or family members show acute respiratory symptoms.",
        sources: ['WHO Guidance', 'CDC Coronavirus Prevention'],
        timestamp: '10:30 AM'
      }
    ]
  },
  {
    id: 'c2',
    title: 'Symptom Check - Dry Cough & Mild Fever',
    updatedAt: '2 hours ago',
    category: 'symptoms',
    messages: [
      {
        id: 'm2-1',
        role: 'user',
        text: 'I have had a mild fever (100.2°F) and dry cough since yesterday. Could this be COVID-19?',
        timestamp: '08:15 AM'
      },
      {
        id: 'm2-2',
        role: 'assistant',
        text: "Yes, low-grade fever and persistent dry cough are among the most frequent early indicators of COVID-19, though they also overlap with seasonal influenza and rhinovirus infections.\n\n### Recommended Next Steps:\n1. **Take a Rapid Antigen Self-Test (RAT)** at home or visit a certified test center.\n2. **Isolate in a well-ventilated room** away from high-risk household members.\n3. **Monitor your oxygen saturation (SpO2)** with a pulse oximeter (should remain >95%).\n4. **Stay hydrated** and rest adequately.",
        sources: ['CDC Clinical Guidance', 'ICMR Advisory'],
        timestamp: '08:16 AM'
      }
    ]
  },
  {
    id: 'c3',
    title: 'Booster Dose Eligibility 2026',
    updatedAt: 'Yesterday',
    category: 'vaccines',
    messages: [
      {
        id: 'm3-1',
        role: 'user',
        text: 'Who is eligible for updated annual bivalent booster shots right now?',
        timestamp: 'Yesterday'
      },
      {
        id: 'm3-2',
        role: 'assistant',
        text: "Updated booster doses are broadly recommended for:\n\n• Adults aged 50 and older\n• Individuals aged 6 months and older with underlying immunocompromising conditions\n• Healthcare and frontline workers\n• Anyone whose last dose or infection was more than 6 months ago.\n\nPlease consult your primary healthcare provider or local government portal to check local clinic availability.",
        sources: ['WHO SAGE Recommendations', 'MoHFW Guidelines'],
        timestamp: 'Yesterday'
      }
    ]
  }
];

export const SUGGESTED_PROMPTS = [
  'How can I protect myself and my family?',
  'What are the 5 red flag symptoms requiring emergency care?',
  'How long should I quarantine after a positive antigen test?',
  'Are updated booster vaccines effective against current subvariants?',
  'What is the standard home isolation protocol for children?'
];

export const DASHBOARD_METRICS = {
  nationalStats: {
    activeCases: '14,820',
    activeTrend: '-8.4%',
    recoveryRate: '98.8%',
    totalVaccinated: '2.21B doses',
    positivityRate: '1.24%',
    icuOccupancy: '4.8%'
  },
  riskLevel: 'Low Community Transmission',
  updatedDate: 'November 2026',
  weeklyTrend: [
    { day: 'Mon', cases: 2100, recoveries: 2450 },
    { day: 'Tue', cases: 1950, recoveries: 2300 },
    { day: 'Wed', cases: 1820, recoveries: 2150 },
    { day: 'Thu', cases: 1740, recoveries: 2020 },
    { day: 'Fri', cases: 1680, recoveries: 1980 },
    { day: 'Sat', cases: 1540, recoveries: 1890 },
    { day: 'Sun', cases: 1420, recoveries: 1780 }
  ],
  testingCenters: [
    { name: 'National Institute of Virology Outreach Lab', address: 'Healthcare Boulevard, Sector 12', status: 'Open Now', type: 'RT-PCR & Rapid' },
    { name: 'City Civil Hospital Diagnostic Wing', address: 'Medical College Campus, Central Road', status: 'Open 24/7', type: 'Walk-in & Drive-through' },
    { name: 'Apex Community Health Centre', address: 'North Avenue, Block B', status: 'Opens 8:00 AM', type: 'Vaccination & Testing' }
  ]
};

export const HEALTH_RESOURCES = [
  {
    id: 'res-1',
    title: 'Complete Home Isolation Protocol & Daily Checklist',
    category: 'Patient Care',
    readTime: '4 min read',
    source: 'Ministry of Health & Family Welfare',
    summary: 'Essential guidelines on room sanitization, triple-layer mask disposal, fever charting, and warning signs.',
    featured: true
  },
  {
    id: 'res-2',
    title: 'High-Risk Individuals & Comorbidity Protection Guide',
    category: 'Vulnerable Groups',
    readTime: '6 min read',
    source: 'World Health Organization',
    summary: 'Tailored safety measures for seniors, individuals with diabetes, hypertension, and asthma.',
    featured: true
  },
  {
    id: 'res-3',
    title: 'Understanding Long COVID: Symptoms & Recovery Strategies',
    category: 'Post-COVID Recovery',
    readTime: '8 min read',
    source: 'Centers for Disease Control and Prevention',
    summary: 'Evidence-based insights on brain fog, chronic fatigue, pulmonary exercises, and rehabilitation.',
    featured: false
  },
  {
    id: 'res-4',
    title: 'International Travel & Entry Requirements Check',
    category: 'Travel Advisory',
    readTime: '3 min read',
    source: 'IATA & WHO International Health Regulations',
    summary: 'Current digital vaccination verification, self-declaration forms, and border testing criteria.',
    featured: false
  }
];

export const MOCK_USER_PROFILE = {
  name: 'Alex Johnson',
  role: 'Registered Citizen',
  email: 'alex.johnson@healthlab.org',
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
