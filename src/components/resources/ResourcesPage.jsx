import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { HEALTH_RESOURCES } from '../../data/sampleData';

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Patient Care', 'Vulnerable Groups', 'Post-COVID Recovery', 'Travel Advisory'];

  const filtered = HEALTH_RESOURCES.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
        <Badge dot={true} className="mb-2">Evidence-Grounded Library</Badge>
        <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', fontWeight: 800, color: 'var(--brand-green)', letterSpacing: '-0.02em', marginTop: '10px' }}>
          COVID-19 Care & Clinical Guidelines
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', marginTop: '8px', lineHeight: 1.6 }}>
          Comprehensive protocols sourced directly from the World Health Organization, CDC, and National Health Ministries.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '36px'
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: 600,
                backgroundColor: selectedCategory === cat ? 'var(--brand-green)' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-body)',
                border: '1px solid var(--border-light)',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#FFFFFF',
            borderRadius: '9999px',
            padding: '8px 18px',
            border: '1px solid var(--border-light)',
            width: '100%',
            maxWidth: '320px'
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guidelines..."
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}
      >
        {filtered.map((res) => (
          <Card
            key={res.id}
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--brand-green)',
                    backgroundColor: 'var(--accent-sage)',
                    padding: '4px 10px',
                    borderRadius: '9999px'
                  }}
                >
                  {res.category}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {res.readTime}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-green)', lineHeight: 1.3, marginBottom: '10px' }}>
                {res.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '20px' }}>
                {res.summary}
              </p>
            </div>

            <div
              style={{
                paddingTop: '16px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <ShieldCheck size={14} color="var(--brand-green)" />
                <span>{res.source}</span>
              </div>
              <button
                onClick={() => alert(`Opening official guideline document: ${res.title}`)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: 'var(--brand-green)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>Read Guide</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
