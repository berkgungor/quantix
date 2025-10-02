'use client';

import React, { useState } from 'react';
import AnalysisForm from '@/components/AnalysisForm';
import Dashboard from '@/components/Dashboard';

const formFields = [
  {
    name: 'projectName',
    label: 'Project/Solution Name',
    type: 'text' as const,
    placeholder: 'e.g., Customer Support Platform, Data Analytics Tool',
    required: true
  },
  {
    name: 'projectType',
    label: 'Project Type',
    type: 'select' as const,
    required: true,
    options: ['Software Application', 'Data Platform', 'Infrastructure', 'AI/ML Solution', 'Mobile App', 'Other']
  },
  {
    name: 'timeline',
    label: 'Desired Timeline',
    type: 'select' as const,
    required: true,
    options: ['0-3 months', '3-6 months', '6-12 months', '1-2 years', '2+ years']
  },
  {
    name: 'budget',
    label: 'Budget Range',
    type: 'select' as const,
    required: true,
    options: ['Under $50K', '$50K-$100K', '$100K-$500K', '$500K-$1M', '$1M+']
  },
  {
    name: 'teamSize',
    label: 'Available Team Size',
    type: 'select' as const,
    options: ['1-5 people', '6-10 people', '11-20 people', '20+ people']
  },
  {
    name: 'technicalRequirements',
    label: 'Technical Requirements',
    type: 'textarea' as const,
    placeholder: 'Describe the technical specifications, integrations, scalability needs, etc.',
    required: true
  },
  {
    name: 'businessContext',
    label: 'Business Context',
    type: 'textarea' as const,
    placeholder: 'Why is this needed? What problem are you solving? What are the success criteria?'
  }
];

export default function BuildVsBuyPage() {
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
        title="Build vs Buy Analysis Results"
        data={analysisData}
        serviceType="build-vs-buy"
      />
    );
  }

  return (
    <AnalysisForm
      serviceType="build-vs-buy"
      title="Build vs Buy vs Hybrid Analysis"
      description="Make informed decisions about whether to build, buy, or use a hybrid approach for your project with comprehensive cost-benefit analysis and risk assessment."
      fields={formFields}
      onSubmit={handleFormSubmit}
    />
  );
}
