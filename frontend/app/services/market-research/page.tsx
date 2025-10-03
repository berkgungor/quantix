'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { TrendingUp, Globe, Target, Search, Clock, Sparkles, ArrowRight } from 'lucide-react';
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
  marketFocus: z.string().min(1, 'Please select a market focus'),
  researchObjective: z.string().min(1, 'Please select a research objective'),
  keywords: z.string().min(1, 'Please provide keywords or topics'),
  timeframe: z.string().optional(),
  additionalContext: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function MarketResearchPage() {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: '',
      marketFocus: '',
      researchObjective: '',
      keywords: '',
      timeframe: '',
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
        title="Market Research Analysis Results"
        data={analysisData}
        serviceType="market-research"
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 ${inter.variable} ${poppins.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className} tracking-tight`}>
            Market Research Analysis
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto ${poppins.className} font-light leading-relaxed`}>
            Get comprehensive market insights with{' '}
            <span className="text-purple-600 font-medium">AI-powered analysis</span> of industry trends, 
            customer sentiment, and growth opportunities from{' '}
            <span className="text-pink-600 font-medium">real-time data sources</span>.
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              Research Parameters
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Define your research scope and objectives for comprehensive market analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Industry and Market Focus Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-purple-500" />
                          Industry
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="e-commerce">E-commerce</SelectItem>
                            <SelectItem value="saas">SaaS</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="marketFocus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Globe className="h-5 w-5 text-purple-500" />
                          Market Focus
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select market focus" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="global">Global</SelectItem>
                            <SelectItem value="north-america">North America</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                            <SelectItem value="emerging-markets">Emerging Markets</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Research Objective */}
                <FormField
                  control={form.control}
                  name="researchObjective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                        <Target className="h-5 w-5 text-purple-500" />
                        Research Objective
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select research objective" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="market-size-analysis">Market Size Analysis</SelectItem>
                          <SelectItem value="growth-opportunities">Growth Opportunities</SelectItem>
                          <SelectItem value="customer-trends">Customer Trends</SelectItem>
                          <SelectItem value="competitive-landscape">Competitive Landscape</SelectItem>
                          <SelectItem value="entry-strategy">Entry Strategy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        What specific insights are you looking for?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Keywords and Timeframe Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Search className="h-5 w-5 text-purple-500" />
                          Keywords/Topics
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., artificial intelligence, remote work, sustainability" 
                            className="h-12 text-base"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Key terms and topics to focus the research on
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
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Clock className="h-5 w-5 text-purple-500" />
                          Time Frame (Optional)
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
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
                          placeholder="Any specific questions, areas of focus, or context that would help tailor the research to your needs"
                          className="min-h-[100px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide any additional context to refine the research focus
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
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Researching Market...
                      </>
                    ) : (
                      <>
                        Start Market Research
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Research Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Trend Analysis</h3>
            <p className="text-sm text-gray-600">Real-time industry trends and market movements</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-lg mb-4">
              <Target className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Customer Insights</h3>
            <p className="text-sm text-gray-600">Sentiment analysis and customer behavior patterns</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-100 rounded-lg mb-4">
              <Sparkles className="h-6 w-6 text-rose-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Growth Opportunities</h3>
            <p className="text-sm text-gray-600">Emerging opportunities and market gaps</p>
          </div>
        </div>
      </div>
    </div>
  );
}
