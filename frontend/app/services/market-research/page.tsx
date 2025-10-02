'use client';

import React, { useState } from 'react';
import AnalysisForm from '@/components/AnalysisForm';
import Dashboard from '@/components/Dashboard';

const formFields = [
  {
    name: 'industry',
    label: 'Industry',
    type: 'select' as const,
    required: true,
    options: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'E-commerce', 'SaaS', 'Other']
  },
  {
    name: 'marketFocus',
    label: 'Market Focus',
    type: 'select' as const,
    required: true,
    options: ['Global', 'North America', 'Europe', 'Asia Pacific', 'Emerging Markets']
  },
  {
    name: 'researchObjective',
    label: 'Research Objective',
    type: 'select' as const,
    required: true,
    options: ['Market Size Analysis', 'Growth Opportunities', 'Customer Trends', 'Competitive Landscape', 'Entry Strategy']
  },
  {
    name: 'keywords',
    label: 'Keywords/Topics',
    type: 'text' as const,
    placeholder: 'e.g., artificial intelligence, remote work, sustainability',
    required: true
  },
  {
    name: 'timeframe',
    label: 'Time Frame',
    type: 'select' as const,
    options: ['Last 30 days', 'Last 3 months', 'Last 6 months', 'Last year']
  },
  {
    name: 'additionalContext',
    label: 'Additional Context',
    type: 'textarea' as const,
    placeholder: 'Any specific questions or areas of focus for the research'
  }
];

export default function MarketResearchPage() {
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
        title="Market Research Analysis Results"
        data={analysisData}
        serviceType="market-research"
      />
    );
  }

  return (
    <AnalysisForm
      serviceType="market-research"
      title="Market Research Analysis"
      description="Get comprehensive market insights with AI-powered analysis of industry trends, customer sentiment, and growth opportunities from real-time data sources."
      fields={formFields}
      onSubmit={handleFormSubmit}
    />
  );
}
