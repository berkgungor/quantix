'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { GitCompare, Building2, Target, Clock, Users, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Dashboard from '@/components/Dashboard';
import { Inter, Poppins, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

// Configure modern fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const formSchema = z.object({
  companyName: z.string().min(1, 'Please provide a competitor company name'),
  industry: z.string().min(1, 'Please select an industry'),
  analysisType: z.string().min(1, 'Please select an analysis type'),
  timeframe: z.string().optional(),
  additionalCompetitors: z.string().optional(),
  focusAreas: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Sample data for radar chart comparing two competitors
const competitorData = [
  {
    subject: 'Market Share',
    'Company A': 110,
    'Company B': 130,
    fullMark: 150,
  },
  {
    subject: 'Innovation',
    'Company A': 98,
    'Company B': 110,
    fullMark: 150,
  },
  {
    subject: 'Brand Recognition',
    'Company A': 86,
    'Company B': 130,
    fullMark: 150,
  },
  {
    subject: 'Customer Satisfaction',
    'Company A': 99,
    'Company B': 100,
    fullMark: 150,
  },
  {
    subject: 'Financial Performance',
    'Company A': 85,
    'Company B': 90,
    fullMark: 150,
  },
  {
    subject: 'Product Quality',
    'Company A': 65,
    'Company B': 85,
    fullMark: 150,
  },
];

export default function CompetitorAnalysisPage() {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      industry: '',
      analysisType: '',
      timeframe: '',
      additionalCompetitors: '',
      focusAreas: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysisData(data);
    setShowResults(true);
    setIsLoading(false);
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
    <div className={`min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 ${inter.variable} ${poppins.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className} tracking-tight`}>
            Competitor Analysis
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto ${poppins.className} font-light leading-relaxed`}>
            Track your competitors'{' '}
            <span className="text-orange-600 font-medium">strategic moves</span>, hiring patterns, product launches, 
            and market positioning with{' '}
            <span className="text-amber-600 font-medium">AI-powered insights</span> from public data sources.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Form */}
          <div>
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className={`text-2xl md:text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2 ${poppins.className} tracking-wide`}>
                  <Sparkles className="h-6 w-6 text-orange-500" />
                  Competitive Intelligence Setup
                </CardTitle>
                <CardDescription className={`text-lg md:text-xl text-gray-600 ${inter.className} font-medium leading-relaxed`}>
                  Configure your competitor tracking and{' '}
                  <span className="text-orange-600">analysis parameters</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Company Name and Industry Row */}
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                              <Building2 className="h-5 w-5 text-orange-500" />
                              Competitor Company Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Apple, Microsoft, Tesla" 
                                className={`h-12 text-base ${inter.className} font-medium`}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                              Primary competitor you want to analyze
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                              <Target className="h-5 w-5 text-orange-500" />
                              Industry
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="automotive">Automotive</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Analysis Type and Timeframe */}
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="analysisType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                              <Eye className="h-5 w-5 text-orange-500" />
                              Analysis Type
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
                                  <SelectValue placeholder="Select analysis type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hiring-trends">Hiring Trends</SelectItem>
                                <SelectItem value="product-launches">Product Launches</SelectItem>
                                <SelectItem value="patent-filings">Patent Filings</SelectItem>
                                <SelectItem value="funding-activities">Funding Activities</SelectItem>
                                <SelectItem value="strategic-moves">Strategic Moves</SelectItem>
                                <SelectItem value="comprehensive">Comprehensive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                              What aspect of competitor activity to focus on
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="timeframe"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                              <Clock className="h-5 w-5 text-orange-500" />
                              Time Frame (Optional)
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
                                  <SelectValue placeholder="Select timeframe" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                                <SelectItem value="last-3-months">Last 3 months</SelectItem>
                                <SelectItem value="last-6-months">Last 6 months</SelectItem>
                                <SelectItem value="last-year">Last year</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Additional Competitors */}
                    <FormField
                      control={form.control}
                      name="additionalCompetitors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                            <Users className="h-5 w-5 text-orange-500" />
                            Additional Competitors (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Comma-separated list of company names" 
                              className={`h-12 text-base ${inter.className} font-medium`}
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                            Include other competitors for comparative analysis
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Focus Areas */}
                    <FormField
                      control={form.control}
                      name="focusAreas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide`}>
                            Specific Focus Areas (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific departments, products, strategies, or business areas you want to focus the analysis on"
                              className={`min-h-[80px] text-base ${inter.className} font-medium leading-relaxed`}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                            Narrow down the analysis to specific areas of interest
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        size="lg"
                        className={`w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-200 ${poppins.className} tracking-wide`}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Analyzing Competitors...
                          </>
                        ) : (
                          <>
                            Start Competitor Analysis
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Radar Chart */}
          <div>
            <div className="mb-4 text-right">
              <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 ${playfair.className} tracking-tight`}>
                Competitor Comparison
              </h2>
              <p className={`text-lg text-gray-600 mt-2 ${poppins.className} font-light`}>
                Visual analysis of key performance metrics
              </p>
            </div>
            
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl h-fit">
              <CardContent className="p-6">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competitorData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Company A"
                        dataKey="Company A"
                        stroke="#f97316"
                        fill="#f97316"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Company B"
                        dataKey="Company B"
                        stroke="#d97706"
                        fill="#d97706"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Chart Description */}
                <div className="mt-4 text-center">
                  <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>
                    Real-time comparison showing{' '}
                    <span className="text-orange-600 font-semibold">competitive positioning</span>{' '}
                    across key metrics
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analysis Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Hiring Intelligence</h3>
            <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>Track recruitment patterns and team expansion</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mb-4">
              <Target className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Strategic Moves</h3>
            <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>Monitor product launches and business decisions</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
              <Eye className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Market Position</h3>
            <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>Understand competitive positioning and threats</p>
          </div>
        </div>
      </div>
    </div>
  );
}
