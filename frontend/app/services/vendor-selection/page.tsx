'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Building2, Search, DollarSign, Users, Settings, Sparkles, ArrowRight, FileText, Target, Shield, TreePine, Sliders, Upload, AlertCircle } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
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
  // Define Sourcing Initiative
  initiativeName: z.string().min(1, 'Please provide an initiative name'),
  category: z.string().min(1, 'Please select a category'),
  subcategory: z.string().min(1, 'Please select a subcategory'),
  specifications: z.string().optional(),
  keyRequirements: z.array(z.string()).optional(),
  
  // Decision Criteria Weighting
  totalCostWeight: z.number().min(0).max(100),
  capabilitiesWeight: z.number().min(0).max(100),
  riskWeight: z.number().min(0).max(100),
  esgWeight: z.number().min(0).max(100),
  
  // Additional fields
  companySize: z.string().min(1, 'Please select your company size'),
  budget: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function VendorSelectionPage() {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initiativeName: '',
      category: '',
      subcategory: '',
      specifications: '',
      keyRequirements: [],
      totalCostWeight: 40,
      capabilitiesWeight: 30,
      riskWeight: 20,
      esgWeight: 10,
      companySize: '',
      budget: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysisData(data as any);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className} tracking-tight`}>
            Strategic Vendor Selection
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto ${poppins.className} font-light leading-relaxed`}>
            Follow our strategic sourcing process to make{' '}
            <span className="text-blue-600 font-medium">data-driven vendor decisions</span>{' '}
            with comprehensive analysis and weighted scoring
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className={`text-2xl md:text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2 ${poppins.className} tracking-wide`}>
              <Target className="h-6 w-6 text-blue-500" />
              Strategic Sourcing Workflow
            </CardTitle>
            <CardDescription className={`text-lg md:text-xl text-gray-600 ${inter.className} font-medium leading-relaxed`}>
              Complete each section to build your comprehensive vendor analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="initiative" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="initiative" className={`${poppins.className} font-medium`}>
                  1. Define Initiative
                </TabsTrigger>
                <TabsTrigger value="criteria" className={`${poppins.className} font-medium`}>
                  2. Decision Criteria
                </TabsTrigger>
                <TabsTrigger value="suppliers" className={`${poppins.className} font-medium`}>
                  3. Supplier Data
                </TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Tab 1: Define the Sourcing Initiative */}
                  <TabsContent value="initiative" className="space-y-8">
                    <div className="space-y-6">
                      <h3 className={`text-xl font-semibold text-gray-800 ${poppins.className} tracking-wide flex items-center gap-2`}>
                        <FileText className="h-5 w-5 text-blue-500" />
                        Define Your Sourcing Initiative
                      </h3>
                      
                      {/* Initiative Name */}
                      <FormField
                        control={form.control}
                        name="initiativeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide`}>
                              Initiative Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Q4 2026 Microcontroller Sourcing, New Corporate CRM Platform" 
                                className={`h-12 text-base ${inter.className} font-medium`}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                              Provide a clear, descriptive title for this sourcing project
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Category and Subcategory */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide`}>
                                Category
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="software-it">Software & IT Services</SelectItem>
                                  <SelectItem value="professional-services">Professional Services</SelectItem>
                                  <SelectItem value="goods-manufacturing">Goods & Manufacturing</SelectItem>
                                  <SelectItem value="operational-services">Operational Services</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subcategory"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide`}>
                                Subcategory
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
                                    <SelectValue placeholder="Select subcategory" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="erp">Enterprise Resource Planning (ERP)</SelectItem>
                                  <SelectItem value="crm">Customer Relationship Management (CRM)</SelectItem>
                                  <SelectItem value="consulting">Consulting</SelectItem>
                                  <SelectItem value="marketing">Marketing</SelectItem>
                                  <SelectItem value="component-parts">Component Parts</SelectItem>
                                  <SelectItem value="raw-materials">Raw Materials</SelectItem>
                                  <SelectItem value="logistics">Logistics</SelectItem>
                                  <SelectItem value="shipping">Shipping Partners</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Specifications */}
                      <FormField
                        control={form.control}
                        name="specifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide flex items-center gap-2`}>
                              <Upload className="h-5 w-5 text-blue-500" />
                              Item/Service Specifications
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe key documents and specifications: Statement of Work (SOW), Bill of Materials (BOM), Technical Drawings, Requirements, etc."
                                className={`min-h-[120px] text-base ${inter.className} font-medium leading-relaxed`}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                              Upload or describe key documents: SOW, BOM, CAD files, technical requirements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Key Requirements Checklist */}
                      <div className="space-y-4">
                        <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide flex items-center gap-2`}>
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                          Key Requirements (Non-negotiable)
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            'ISO 9001 Certified',
                            'GDPR Compliant',
                            'Domestic Production',
                            'SOC 2 Compliance',
                            '24/7 Support',
                            'API Integration',
                            'Multi-language Support',
                            'Cloud-based Solution'
                          ].map((requirement) => (
                            <div key={requirement} className="flex items-center space-x-2">
                              <Checkbox id={requirement} />
                              <label
                                htmlFor={requirement}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${inter.className}`}
                              >
                                {requirement}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                          Select all critical, non-negotiable requirements for your vendors
                        </FormDescription>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tab 2: Set Decision Criteria */}
                  <TabsContent value="criteria" className="space-y-8">
                    <div className="space-y-6">
                      <h3 className={`text-xl font-semibold text-gray-800 ${poppins.className} tracking-wide flex items-center gap-2`}>
                        <Sliders className="h-5 w-5 text-blue-500" />
                        Decision Criteria Weighting
                      </h3>
                      
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <p className={`text-sm text-blue-700 mb-4 ${inter.className} font-medium`}>
                          Allocate 100% across the four core pillars. Use the sliders to set your priorities.
                        </p>
                        
                        <div className="space-y-6">
                          {/* Total Cost */}
                          <FormField
                            control={form.control}
                            name="totalCostWeight"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center mb-2">
                                  <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide flex items-center gap-2`}>
                                    <DollarSign className="h-5 w-5 text-green-500" />
                                    Total Cost
                                  </FormLabel>
                                  <span className={`text-lg font-bold text-blue-600 ${jetbrains.className}`}>
                                    {field.value}%
                                  </span>
                                </div>
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={100}
                                    step={5}
                                    value={[field.value]}
                                    onValueChange={(value) => field.onChange(value[0])}
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                                  Unit price, freight, tariffs, tooling, total cost of ownership
                                </FormDescription>
                              </FormItem>
                            )}
                          />

                          {/* Capabilities & Quality */}
                          <FormField
                            control={form.control}
                            name="capabilitiesWeight"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center mb-2">
                                  <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide flex items-center gap-2`}>
                                    <Settings className="h-5 w-5 text-purple-500" />
                                    Capabilities & Quality
                                  </FormLabel>
                                  <span className={`text-lg font-bold text-blue-600 ${jetbrains.className}`}>
                                    {field.value}%
                                  </span>
                                </div>
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={100}
                                    step={5}
                                    value={[field.value]}
                                    onValueChange={(value) => field.onChange(value[0])}
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                                  Technical fit, production capacity, quality scores, lead times
                                </FormDescription>
                              </FormItem>
                            )}
                          />

                          {/* Risk & Resilience */}
                          <FormField
                            control={form.control}
                            name="riskWeight"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center mb-2">
                                  <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide flex items-center gap-2`}>
                                    <Shield className="h-5 w-5 text-red-500" />
                                    Risk & Resilience
                                  </FormLabel>
                                  <span className={`text-lg font-bold text-blue-600 ${jetbrains.className}`}>
                                    {field.value}%
                                  </span>
                                </div>
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={100}
                                    step={5}
                                    value={[field.value]}
                                    onValueChange={(value) => field.onChange(value[0])}
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                                  Financial stability, geopolitical factors, supply chain resilience
                                </FormDescription>
                              </FormItem>
                            )}
                          />

                          {/* ESG & Strategic Alignment */}
                          <FormField
                            control={form.control}
                            name="esgWeight"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center mb-2">
                                  <FormLabel className={`text-lg font-semibold text-gray-700 ${poppins.className} tracking-wide flex items-center gap-2`}>
                                    <TreePine className="h-5 w-5 text-green-500" />
                                    ESG & Strategic Alignment
                                  </FormLabel>
                                  <span className={`text-lg font-bold text-blue-600 ${jetbrains.className}`}>
                                    {field.value}%
                                  </span>
                                </div>
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={100}
                                    step={5}
                                    value={[field.value]}
                                    onValueChange={(value) => field.onChange(value[0])}
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                                  Environmental impact, social responsibility, governance, strategic fit
                                </FormDescription>
                              </FormItem>
                            )}
                          />

                          {/* Total Weight Display */}
                          <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                            <div className="flex justify-between items-center">
                              <span className={`text-lg font-semibold text-gray-700 ${poppins.className}`}>
                                Total Weight:
                              </span>
                              <span className={`text-xl font-bold ${
                                (form.watch('totalCostWeight') + 
                                 form.watch('capabilitiesWeight') + 
                                 form.watch('riskWeight') + 
                                 form.watch('esgWeight')) === 100 
                                  ? 'text-green-600' 
                                  : 'text-red-600'
                              } ${jetbrains.className}`}>
                                {form.watch('totalCostWeight') + 
                                 form.watch('capabilitiesWeight') + 
                                 form.watch('riskWeight') + 
                                 form.watch('esgWeight')}%
                              </span>
                            </div>
                            {(form.watch('totalCostWeight') + 
                              form.watch('capabilitiesWeight') + 
                              form.watch('riskWeight') + 
                              form.watch('esgWeight')) !== 100 && (
                              <p className={`text-sm text-red-600 mt-2 ${inter.className}`}>
                                Total must equal 100%. Please adjust the weights.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tab 3: Input Supplier Data */}
                  <TabsContent value="suppliers" className="space-y-8">
                    <div className="space-y-6">
                      <h3 className={`text-xl font-semibold text-gray-800 ${poppins.className} tracking-wide flex items-center gap-2`}>
                        <Building2 className="h-5 w-5 text-blue-500" />
                        Company Information
                      </h3>
                      
                      {/* Company Size and Budget */}
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
                                  <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
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
                                  <SelectTrigger className={`h-12 text-base ${inter.className} font-medium`}>
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
                              <FormDescription className={`${inter.className} text-sm text-gray-500`}>
                                Help us filter vendor options within your budget
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                        <h4 className={`text-lg font-semibold text-gray-800 mb-3 ${poppins.className}`}>
                          Next: Supplier Data Collection
                        </h4>
                        <p className={`text-gray-600 mb-4 ${inter.className} font-medium leading-relaxed`}>
                          After submitting this initial configuration, you'll be able to input specific data for each supplier you're evaluating, including:
                        </p>
                        <ul className={`text-sm text-gray-600 space-y-2 ${inter.className}`}>
                          <li>• <strong>Cost Data:</strong> Unit prices, freight costs, tariffs, tooling costs</li>
                          <li>• <strong>Capabilities:</strong> Lead times, production capacity, quality scores</li>
                          <li>• <strong>Risk Assessment:</strong> Financial health, ESG ratings, key risks</li>
                          <li>• <strong>Technical Fit:</strong> Engineering team assessments and compatibility</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      size="lg"
                      className={`w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 ${poppins.className} tracking-wide`}
                      disabled={isLoading || 
                        (form.watch('totalCostWeight') + 
                         form.watch('capabilitiesWeight') + 
                         form.watch('riskWeight') + 
                         form.watch('esgWeight')) !== 100}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Processing Strategic Analysis...
                        </>
                      ) : (
                        <>
                          Complete Strategic Setup
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>

        {/* Process Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Strategic Definition</h3>
            <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>Define your sourcing initiative with clear requirements and specifications</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Sliders className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Decision Criteria</h3>
            <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>Set weighted priorities across cost, capabilities, risk, and ESG factors</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className={`font-semibold text-gray-800 mb-2 ${poppins.className} tracking-wide`}>Supplier Analysis</h3>
            <p className={`text-sm text-gray-600 ${inter.className} font-medium leading-relaxed`}>Get AI-powered vendor recommendations based on your criteria</p>
          </div>
        </div>
      </div>
    </div>
  );
}
