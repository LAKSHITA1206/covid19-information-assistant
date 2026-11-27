// Vercel Serverless Function: POST /api/chat

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body || {};
  const userText = message || '';
  const lower = userText.toLowerCase();

  let replyText = "Here is what trusted health guidance indicates regarding your query:\n\n• Always monitor for persistent symptoms such as shortness of breath, sustained high fever, or confusion.\n• Ensure you maintain adequate rest, hydration, and safe distancing.\n• For personalized medical advice or prescription needs, please consult a certified physician.";
  let sources = ['WHO Guidelines', 'CDC COVID-19 Clinical Care'];

  if (lower.includes('protect') || lower.includes('family') || lower.includes('prevent')) {
    replyText = "Let's break it down. Small, everyday steps can help reduce your risk:\n\n• **Stay updated on vaccines & boosters**: Keeps severe illness risk to a minimum.\n• **Improve ventilation indoors**: Open windows or use air filtration where feasible.\n• **Practice hand hygiene**: Frequent washing with soap or using alcohol-based sanitizer.\n• **Wear high-filtration masks (N95/KN95)**: Particularly in crowded or poorly ventilated public spaces.\n• **Isolate if unwell**: Stay home if you or family members show acute respiratory symptoms.";
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

  return res.status(200).json({
    id: 'msg-' + Date.now(),
    role: 'assistant',
    text: replyText,
    sources,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
}
