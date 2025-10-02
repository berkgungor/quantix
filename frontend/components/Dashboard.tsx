'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  title: string;
  data: any;
  serviceType: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard({ title, data, serviceType }: DashboardProps) {
  // Mock data for demonstration - in real app this would come from API
  const mockData = {
    'vendor-selection': {
      summary: {
        totalVendors: 25,
        topVendors: 5,
        avgPriceRange: '$50K - $200K',
        recommendedVendor: 'TechCorp Solutions'
      },
      vendors: [
        { name: 'TechCorp Solutions', score: 95, price: '$120K', features: 45 },
        { name: 'InnovateNow', score: 88, price: '$95K', features: 38 },
        { name: 'GlobalTech', score: 82, price: '$150K', features: 52 },
        { name: 'SmartVendor', score: 79, price: '$80K', features: 35 },
        { name: 'ProServices', score: 76, price: '$110K', features: 40 }
      ],
      priceData: [
        { month: 'Jan', TechCorp: 120, InnovateNow: 95, GlobalTech: 150 },
        { month: 'Feb', TechCorp: 115, InnovateNow: 98, GlobalTech: 145 },
        { month: 'Mar', TechCorp: 125, InnovateNow: 100, GlobalTech: 155 },
        { month: 'Apr', TechCorp: 120, InnovateNow: 95, GlobalTech: 150 }
      ]
    },
    'market-research': {
      summary: {
        marketSize: '$2.4B',
        growthRate: '12.5%',
        keyTrends: 3,
        sentiment: 'Positive'
      },
      trends: [
        { period: 'Q1 2024', value: 100 },
        { period: 'Q2 2024', value: 108 },
        { period: 'Q3 2024', value: 115 },
        { period: 'Q4 2024', value: 125 }
      ],
      sentimentData: [
        { name: 'Positive', value: 65 },
        { name: 'Neutral', value: 25 },
        { name: 'Negative', value: 10 }
      ]
    },
    'competitor-analysis': {
      summary: {
        competitorsTracked: 8,
        keyMoves: 12,
        hiresSurge: '+45%',
        patentFilings: 23
      },
      activities: [
        { competitor: 'CompetitorA', hiring: 45, patents: 8, funding: 50 },
        { competitor: 'CompetitorB', hiring: 32, patents: 12, funding: 25 },
        { competitor: 'CompetitorC', hiring: 28, patents: 5, funding: 75 }
      ]
    }
  };

  const currentData = mockData[serviceType as keyof typeof mockData] || mockData['vendor-selection'];

  // Type guards to safely access service-specific data
  const getVendorData = () => currentData as typeof mockData['vendor-selection'];
  const getMarketData = () => currentData as typeof mockData['market-research'];
  const getCompetitorData = () => currentData as typeof mockData['competitor-analysis'];

  const renderMetricCard = (title: string, value: string | number, icon: React.ReactNode, trend?: 'up' | 'down') => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`flex items-center text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {trend === 'up' ? 'Positive trend' : 'Declining trend'}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">Analysis results and insights</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {serviceType === 'vendor-selection' && (
          <>
            {renderMetricCard('Total Vendors', getVendorData().summary.totalVendors, <CheckCircle className="h-4 w-4 text-green-600" />)}
            {renderMetricCard('Top Vendors', getVendorData().summary.topVendors, <TrendingUp className="h-4 w-4 text-blue-600" />)}
            {renderMetricCard('Price Range', getVendorData().summary.avgPriceRange, <AlertCircle className="h-4 w-4 text-yellow-600" />)}
            {renderMetricCard('Recommended', getVendorData().summary.recommendedVendor, <CheckCircle className="h-4 w-4 text-green-600" />)}
          </>
        )}
        
        {serviceType === 'market-research' && (
          <>
            {renderMetricCard('Market Size', getMarketData().summary.marketSize, <TrendingUp className="h-4 w-4 text-green-600" />, 'up')}
            {renderMetricCard('Growth Rate', getMarketData().summary.growthRate, <TrendingUp className="h-4 w-4 text-blue-600" />, 'up')}
            {renderMetricCard('Key Trends', getMarketData().summary.keyTrends, <AlertCircle className="h-4 w-4 text-yellow-600" />)}
            {renderMetricCard('Sentiment', getMarketData().summary.sentiment, <CheckCircle className="h-4 w-4 text-green-600" />)}
          </>
        )}
        
        {serviceType === 'competitor-analysis' && (
          <>
            {renderMetricCard('Competitors', getCompetitorData().summary.competitorsTracked, <CheckCircle className="h-4 w-4 text-blue-600" />)}
            {renderMetricCard('Key Moves', getCompetitorData().summary.keyMoves, <AlertCircle className="h-4 w-4 text-yellow-600" />)}
            {renderMetricCard('Hiring Surge', getCompetitorData().summary.hiresSurge, <TrendingUp className="h-4 w-4 text-green-600" />, 'up')}
            {renderMetricCard('Patents', getCompetitorData().summary.patentFilings, <TrendingUp className="h-4 w-4 text-blue-600" />)}
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {serviceType === 'vendor-selection' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Vendor Comparison</CardTitle>
                <CardDescription>Score vs Price analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getVendorData().vendors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Trends</CardTitle>
                <CardDescription>Monthly pricing comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getVendorData().priceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="TechCorp" stroke="#8884d8" />
                    <Line type="monotone" dataKey="InnovateNow" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="GlobalTech" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}

        {serviceType === 'market-research' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Market Growth</CardTitle>
                <CardDescription>Quarterly growth trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getMarketData().trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Sentiment</CardTitle>
                <CardDescription>Customer sentiment distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getMarketData().sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getMarketData().sentimentData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}

        {serviceType === 'competitor-analysis' && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Competitor Activities</CardTitle>
              <CardDescription>Hiring, patents, and funding comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getCompetitorData().activities}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="competitor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hiring" fill="#8884d8" name="Hiring" />
                  <Bar dataKey="patents" fill="#82ca9d" name="Patents" />
                  <Bar dataKey="funding" fill="#ffc658" name="Funding ($M)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
