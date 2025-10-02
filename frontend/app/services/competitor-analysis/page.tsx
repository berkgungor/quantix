'use client';

import React, { useState } from 'react';
import AnalysisForm from '@/components/AnalysisForm';
import Dashboard from '@/components/Dashboard';

const formFields = [
  {
    name: 'companyName',
    label: 'Competitor Company Name',
    type: 'text' as const,
    placeholder: 'e.g., Apple, Microsoft, Tesla',
    required: true
  },
  {
    name: 'industry',
    label: 'Industry',
    type: 'select' as const,
    required: true,
    options: ['Technology', 'Healthcare', 'Finance', 'Automotive', 'Retail', 'Manufacturing', 'Other']
  },
  {
    name: 'analysisType',
    label: 'Analysis Type',
    type: 'select' as const,
    required: true,
    options: ['Hiring Trends', 'Product Launches', 'Patent Filings', 'Funding Activities', 'Strategic Moves', 'Comprehensive']
  },
  {
    name: 'timeframe',
    label: 'Time Frame',
    type: 'select' as const,
    options: ['Last 30 days', 'Last 3 months', 'Last 6 months', 'Last year']
  },
  {
    name: 'additionalCompetitors',
    label: 'Additional Competitors to Track',
    type: 'text' as const,
    placeholder: 'Comma-separated list of company names'
  },
  {
    name: 'focusAreas',
    label: 'Specific Focus Areas',
    type: 'textarea' as const,
    placeholder: 'Any specific departments, products, or strategies you want to focus on'
  }
];

export default function CompetitorAnalysisPage() {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<Record<string, string> | null>(null);

  const handleFormSubmit = async (formData: Record<string, string>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response
    setAnalysisData(formData);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <Dashboard
        title="Competitor Analysis Results"
        data={analysisData}
        serviceType="competitor-analysis"
      />
    );
  }

  return (
    <AnalysisForm
      serviceType="competitor-analysis"
      title="Competitor Analysis"
      description="Track your competitors' strategic moves, hiring patterns, product launches, and market positioning with AI-powered insights from public data sources."
      fields={formFields}
      onSubmit={handleFormSubmit}
    />
  );
}
