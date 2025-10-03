'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Building, Code, Clock, DollarSign, Users, Target, Sparkles, ArrowRight } from 'lucide-react';
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
  projectName: z.string().min(1, 'Please provide a project name'),
  projectType: z.string().min(1, 'Please select a project type'),
  timeline: z.string().min(1, 'Please select your desired timeline'),
  budget: z.string().min(1, 'Please select your budget range'),
  teamSize: z.string().optional(),
  technicalRequirements: z.string().min(10, 'Please provide technical requirements (at least 10 characters)'),
  businessContext: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function BuildVsBuyPage() {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      projectType: '',
      timeline: '',
      budget: '',
      teamSize: '',
      technicalRequirements: '',
      businessContext: '',
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
        title="Build vs Buy Analysis Results"
        data={analysisData}
        serviceType="build-vs-buy"
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 ${inter.variable} ${poppins.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className} tracking-tight`}>
            Build vs Buy vs Hybrid Analysis
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto ${poppins.className} font-light leading-relaxed`}>
            Make informed decisions about whether to{' '}
            <span className="text-emerald-600 font-medium">build, buy, or use a hybrid approach</span> for your project 
            with{' '}
            <span className="text-teal-600 font-medium">comprehensive cost-benefit analysis</span> and risk assessment.
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className={`text-2xl md:text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2 ${poppins.className} tracking-wide`}>
              <Sparkles className="h-6 w-6 text-emerald-500" />
              Project Analysis
            </CardTitle>
            <CardDescription className={`text-lg md:text-xl text-gray-600 ${inter.className} font-medium leading-relaxed`}>
              Help us understand your project to provide the{' '}
              <span className="text-emerald-600">best strategic recommendation</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Project Name and Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                          <Target className="h-5 w-5 text-emerald-500" />
                          Project Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Customer Support Platform, Data Analytics Tool" 
                            className={`h-12 text-base ${inter.className} font-medium`}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                          <Code className="h-5 w-5 text-emerald-500" />
                          Project Type
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="software-application">Software Application</SelectItem>
                            <SelectItem value="data-platform">Data Platform</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="ai-ml-solution">AI/ML Solution</SelectItem>
                            <SelectItem value="mobile-app">Mobile App</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Timeline and Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                          <Clock className="h-5 w-5 text-emerald-500" />
                          Desired Timeline
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-3-months">0-3 months</SelectItem>
                            <SelectItem value="3-6-months">3-6 months</SelectItem>
                            <SelectItem value="6-12-months">6-12 months</SelectItem>
                            <SelectItem value="1-2-years">1-2 years</SelectItem>
                            <SelectItem value="2plus-years">2+ years</SelectItem>
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
                          <DollarSign className="h-5 w-5 text-emerald-500" />
                          Budget Range
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="under-50k">Under $50K</SelectItem>
                            <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                            <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-plus">$1M+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Team Size */}
                <FormField
                  control={form.control}
                  name="teamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-lg font-semibold text-gray-700 flex items-center gap-2 ${poppins.className} tracking-wide`}>
                        <Users className="h-5 w-5 text-emerald-500" />
                        Available Team Size (Optional)
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-5-people">1-5 people</SelectItem>
                          <SelectItem value="6-10-people">6-10 people</SelectItem>
                          <SelectItem value="11-20-people">11-20 people</SelectItem>
                          <SelectItem value="20plus-people">20+ people</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                        How many team members can work on this project?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Technical Requirements */}
                <FormField
                  control={form.control}
                  name="technicalRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide`}>
                        Technical Requirements
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the technical specifications, integrations needed, scalability requirements, performance criteria, security needs, compliance requirements, etc."
                          className={`min-h-[120px] text-base ${inter.className} font-medium leading-relaxed`}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                        Detail your technical requirements and constraints
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Context */}
                <FormField
                  control={form.control}
                  name="businessContext"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide`}>
                        Business Context (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Why is this needed? What problem are you solving? What are the success criteria? Any strategic considerations or constraints?"
                          className={`min-h-[100px] text-base ${inter.className} font-medium leading-relaxed`}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                        Help us understand the business drivers and success metrics
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
                    className={`w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-200 ${poppins.className} tracking-wide`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Analyzing Options...
                      </>
                    ) : (
                      <>
                        Get Strategic Analysis
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
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Build Analysis</h3>
            <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>In-house development costs, timeline, and resource requirements</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Buy Analysis</h3>
            <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>Market solutions, vendor comparison, and total cost of ownership</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Hybrid Analysis</h3>
            <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>Custom solutions combining build and buy approaches</p>
          </div>
        </div>
      </div>
    </div>
  );
}
