'use client';

import React, { useState } from 'react';
import AnalysisForm from '@/components/AnalysisForm';
import Dashboard from '@/components/Dashboard';

const formFields = [
  {
    name: 'rfpDocument',
    label: 'RFP Document URL or Description',
    type: 'textarea' as const,
    placeholder: 'Paste RFP text or provide URL to RFP document',
    required: true
  },
  {
    name: 'industry',
    label: 'Industry/Sector',
    type: 'select' as const,
    required: true,
    options: ['Government', 'Healthcare', 'Education', 'Finance', 'Technology', 'Manufacturing', 'Other']
  },
  {
    name: 'analysisType',
    label: 'Analysis Focus',
    type: 'select' as const,
    required: true,
    options: ['Opportunity Assessment', 'Risk Analysis', 'Competitive Positioning', 'Pricing Strategy', 'Comprehensive']
  },
  {
    name: 'companySize',
    label: 'Your Company Size',
    type: 'select' as const,
    required: true,
    options: ['Startup (1-50)', 'SMB (51-500)', 'Enterprise (500-5000)', 'Large Enterprise (5000+)']
  },
  {
    name: 'pastExperience',
    label: 'Past Experience with Similar RFPs',
    type: 'select' as const,
    options: ['First time', 'Limited (1-3)', 'Moderate (4-10)', 'Extensive (10+)']
  },
  {
    name: 'competitorInfo',
    label: 'Known Competitors',
    type: 'text' as const,
    placeholder: 'List any known competitors who might bid on this RFP'
  },
  {
    name: 'additionalContext',
    label: 'Additional Context',
    type: 'textarea' as const,
    placeholder: 'Any specific concerns, questions, or areas you want the analysis to focus on'
  }
];

export default function RFPIntelligencePage() {
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
        title="RFP Intelligence Analysis Results"
        data={analysisData}
        serviceType="rfp-intelligence"
      />
    );
  }

  return (
    <AnalysisForm
      serviceType="rfp-intelligence"
      title="RFP Intelligence System"
      description="Analyze RFPs for opportunities, risks, and competitive positioning with AI-powered insights to improve your bid success rate."
      fields={formFields}
      onSubmit={handleFormSubmit}
    />
  );
}
