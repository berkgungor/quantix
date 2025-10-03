'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FileText, Building2, Target, Users, Award, Shield, Sparkles, ArrowRight } from 'lucide-react';
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
  rfpDocument: z.string().min(10, 'Please provide RFP document details (at least 10 characters)'),
  industry: z.string().min(1, 'Please select an industry/sector'),
  analysisType: z.string().min(1, 'Please select an analysis focus'),
  companySize: z.string().min(1, 'Please select your company size'),
  pastExperience: z.string().optional(),
  competitorInfo: z.string().optional(),
  additionalContext: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function RFPIntelligencePage() {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rfpDocument: '',
      industry: '',
      analysisType: '',
      companySize: '',
      pastExperience: '',
      competitorInfo: '',
      additionalContext: '',
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
        title="RFP Intelligence Analysis Results"
        data={analysisData}
        serviceType="rfp-intelligence"
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 ${inter.variable} ${poppins.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className} tracking-tight`}>
            RFP Intelligence System
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto ${poppins.className} font-light leading-relaxed`}>
            Analyze RFPs for{' '}
            <span className="text-indigo-600 font-medium">opportunities, risks, and competitive positioning</span> with 
            AI-powered insights to{' '}
            <span className="text-blue-600 font-medium">improve your bid success rate</span>.
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-indigo-500" />
              RFP Analysis Setup
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Upload or describe your RFP for comprehensive intelligence analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* RFP Document */}
                <FormField
                  control={form.control}
                  name="rfpDocument"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-500" />
                        RFP Document URL or Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste RFP text here, provide a URL to the RFP document, or describe the key requirements and scope of the RFP"
                          className="min-h-[120px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide as much detail as possible for better analysis
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Industry and Analysis Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-indigo-500" />
                          Industry/Sector
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="government">Government</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="analysisType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Target className="h-5 w-5 text-indigo-500" />
                          Analysis Focus
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select analysis focus" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="opportunity-assessment">Opportunity Assessment</SelectItem>
                            <SelectItem value="risk-analysis">Risk Analysis</SelectItem>
                            <SelectItem value="competitive-positioning">Competitive Positioning</SelectItem>
                            <SelectItem value="pricing-strategy">Pricing Strategy</SelectItem>
                            <SelectItem value="comprehensive">Comprehensive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          What aspect of the RFP to focus analysis on
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Company Size and Experience Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Users className="h-5 w-5 text-indigo-500" />
                          Your Company Size
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="startup">Startup (1-50)</SelectItem>
                            <SelectItem value="smb">SMB (51-500)</SelectItem>
                            <SelectItem value="enterprise">Enterprise (500-5000)</SelectItem>
                            <SelectItem value="large-enterprise">Large Enterprise (5000+)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pastExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Award className="h-5 w-5 text-indigo-500" />
                          Past RFP Experience (Optional)
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="first-time">First time</SelectItem>
                            <SelectItem value="limited">Limited (1-3)</SelectItem>
                            <SelectItem value="moderate">Moderate (4-10)</SelectItem>
                            <SelectItem value="extensive">Extensive (10+)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Known Competitors */}
                <FormField
                  control={form.control}
                  name="competitorInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-indigo-500" />
                        Known Competitors (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="List any known competitors who might bid on this RFP" 
                          className="h-12 text-base"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Help us analyze competitive positioning and strategies
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional Context */}
                <FormField
                  control={form.control}
                  name="additionalContext"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">
                        Additional Context (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any specific concerns, questions, or areas you want the analysis to focus on. Include budget constraints, timeline concerns, or strategic considerations."
                          className="min-h-[100px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide additional context to tailor the analysis
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Analyzing RFP...
                      </>
                    ) : (
                      <>
                        Get RFP Intelligence
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Analysis Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Opportunity Scoring</h3>
            <p className="text-sm text-gray-600">Assess win probability and opportunity value</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Risk Assessment</h3>
            <p className="text-sm text-gray-600">Identify potential risks and mitigation strategies</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-100 rounded-lg mb-4">
              <Award className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Competitive Intel</h3>
            <p className="text-sm text-gray-600">Understand competitive landscape and positioning</p>
          </div>
        </div>
      </div>
    </div>
  );
}
