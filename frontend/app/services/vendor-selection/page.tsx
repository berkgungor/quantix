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
    options: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Other']
  },
  {
    name: 'technology',
    label: 'Technology/Service Category',
    type: 'text' as const,
    placeholder: 'e.g., CRM Software, Cloud Hosting, Marketing Automation',
    required: true
  },
  {
    name: 'requirements',
    label: 'Specific Requirements',
    type: 'textarea' as const,
    placeholder: 'Describe your specific needs, features, budget constraints, etc.',
    required: true
  },
  {
    name: 'companySize',
    label: 'Company Size',
    type: 'select' as const,
    required: true,
    options: ['1-10', '11-50', '51-200', '201-1000', '1000+']
  },
  {
    name: 'budget',
    label: 'Budget Range',
    type: 'select' as const,
    options: ['Under $10K', '$10K-$50K', '$50K-$100K', '$100K-$500K', '$500K+']
  }
];

export default function VendorSelectionPage() {
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
        title="Vendor Selection Analysis Results"
        data={analysisData}
        serviceType="vendor-selection"
      />
    );
  }

  return (
    <AnalysisForm
      serviceType="vendor-selection"
      title="Vendor Selection Analysis"
      description="Get AI-powered recommendations for the best vendors based on your specific requirements, budget, and industry needs."
      fields={formFields}
      onSubmit={handleFormSubmit}
    />
  );
}
