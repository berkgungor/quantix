'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Building2, Search, DollarSign, Users, Settings, Sparkles, ArrowRight } from 'lucide-react';
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
  industry: z.string().min(1, 'Please select an industry'),
  technology: z.string().min(1, 'Please specify the technology or service category'),
  requirements: z.string().min(10, 'Please provide detailed requirements (at least 10 characters)'),
  companySize: z.string().min(1, 'Please select your company size'),
  budget: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function VendorSelectionPage() {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: '',
      technology: '',
      requirements: '',
      companySize: '',
      budget: '',
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
        title="Vendor Selection Analysis Results"
        data={analysisData}
        serviceType="vendor-selection"
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${inter.variable} ${poppins.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className} tracking-tight`}>
            AI-Powered Vendor Selection
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto ${poppins.className} font-light leading-relaxed`}>
            Get intelligent recommendations for the best vendors based on your specific requirements, 
            budget, and industry needs with{' '}
            <span className="text-blue-600 font-medium">real-time market analysis</span>.
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className={`text-2xl md:text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2 ${poppins.className} tracking-wide`}>
              <Sparkles className="h-6 w-6 text-blue-500" />
              Tell us about your project
            </CardTitle>
            <CardDescription className={`text-lg md:text-xl text-gray-600 ${inter.className} font-normal leading-relaxed`}>
              Fill out the details below and our AI will analyze the market to find the perfect vendors for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Industry Selection */}
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                        <Building2 className="h-5 w-5 text-blue-500" />
                        Industry
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className={`${inter.className} font-medium`}>
                        Choose the industry that best describes your business
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Technology/Service Category */}
                <FormField
                  control={form.control}
                  name="technology"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                        <Settings className="h-5 w-5 text-blue-500" />
                        Technology/Service Category
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., CRM Software, Cloud Hosting, Marketing Automation" 
                          className={`h-12 text-base ${inter.className}`}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className={`${inter.className} font-medium`}>
                        What type of technology or service are you looking for?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Requirements */}
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide`}>
                        Specific Requirements
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your specific needs, features, integrations, security requirements, scalability needs, etc. The more detail you provide, the better our recommendations will be."
                          className={`min-h-[120px] text-base ${inter.className}`}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className={`${inter.className} font-medium`}>
                        Provide detailed requirements to help us find the best match
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company Size and Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                          <Users className="h-5 w-5 text-blue-500" />
                          Company Size
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-1000">201-1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                          <DollarSign className="h-5 w-5 text-blue-500" />
                          Budget Range (Optional)
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="under-10k">Under $10K</SelectItem>
                            <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                            <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                            <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                            <SelectItem value="500k+">$500K+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className={`${inter.className} font-medium`}>
                          Help us filter options within your budget
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    size="lg"
                    className={`w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 ${poppins.className} tracking-wide`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Analyzing Market...
                      </>
                    ) : (
                      <>
                        Start AI Analysis
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Smart Matching</h3>
            <p className={`text-sm text-gray-600 ${inter.className} leading-relaxed`}>AI analyzes your requirements against thousands of vendors</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Cost Analysis</h3>
            <p className={`text-sm text-gray-600 ${inter.className} leading-relaxed`}>Compare pricing, ROI, and total cost of ownership</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Real-time Insights</h3>
            <p className={`text-sm text-gray-600 ${inter.className} leading-relaxed`}>Get up-to-date market data and vendor performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
