'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, TrendingUp, Users, GitCompare, FileText, ArrowRight, CheckCircle, Shield, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BubbleBackground from '@/components/BubbleBackground';
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

const services = [
  {
    name: 'Vendor Selection',
    href: '/services/vendor-selection',
    icon: Users,
    description: 'Find the best vendors with AI-powered analysis of pricing, reviews, and capabilities',
    features: ['Price comparison', 'Vendor reputation analysis', 'Capability matching']
  },
  {
    name: 'Market Research',
    href: '/services/market-research',
    icon: TrendingUp,
    description: 'Get real-time market insights from news, social media, and industry reports',
    features: ['Industry trends', 'Market size analysis', 'Customer sentiment']
  },
  {
    name: 'Competitor Analysis',
    href: '/services/competitor-analysis',
    icon: GitCompare,
    description: 'Track competitor moves, hiring patterns, and strategic changes',
    features: ['Hiring trends', 'Product launches', 'Market positioning']
  },
  {
    name: 'Build vs Buy vs Hybrid',
    href: '/services/build-vs-buy',
    icon: Brain,
    description: 'Make informed decisions with cost-benefit analysis and risk assessment',
    features: ['Cost analysis', 'Risk assessment', 'Time-to-market comparison']
  },
  {
    name: 'RFP Intelligence',
    href: '/services/rfp-intelligence',
    icon: FileText,
    description: 'Analyze RFPs for opportunities, risks, and competitive positioning',
    features: ['Opportunity scoring', 'Risk identification', 'Competitive analysis']
  }
];

const benefits = [
  {
    title: 'Save Time',
    description: 'Automate hours of manual research into minutes of AI-powered insights'
  },
  {
    title: 'Reduce Costs',
    description: 'Eliminate expensive consultants and research subscriptions'
  },
  {
    title: 'Make Better Decisions',
    description: 'Access real-time data and AI-driven recommendations'
  },
  {
    title: 'Stay Competitive',
    description: 'Monitor market changes and competitor moves in real-time'
  }
];

export default function HomePage() {
  return (
    <div className={`space-y-16 ${inter.variable} ${poppins.variable} ${playfair.variable} ${jetbrains.variable}`}>
      {/* Hero Section with Bubble Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 py-16 min-h-screen flex items-center">
        {/* Bubble Background */}
        <BubbleBackground 
          interactive={true}
          colors={{
            first: "59,130,246", // blue-500
            second: "147,51,234", // purple-600
            third: "236,72,153", // pink-500
            fourth: "16,185,129", // emerald-500
            fifth: "245,158,11", // amber-500
            sixth: "99,102,241"  // indigo-500
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Main content */}
            <div className="text-left">
              <h1 className={`text-4xl md:text-6xl font-black text-white mb-6 ${playfair.className} tracking-tight leading-[1.1]`}>
                AI-Powered{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold">
                  Market Intelligence
                </span>
              </h1>
              <p className={`text-xl md:text-2xl text-gray-200 mb-8 ${poppins.className} font-light leading-relaxed tracking-wide`}>
                Automate vendor selection, market research, and competitor analysis with{' '}
                <span className="text-blue-300 font-medium">real-time insights</span> from public data sources.{' '}
                <span className="text-purple-300 font-medium">Make informed business decisions faster.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className={`text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-slate-600 hover:from-blue-500 hover:to-slate-700 border-0 shadow-xl ${poppins.className} font-semibold tracking-wide`}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className={`text-lg px-8 py-4 border-white/30 text-blue hover:bg-white/10 backdrop-blur-sm ${poppins.className} font-medium`}>
                  Watch Demo
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className={`text-3xl md:text-4xl font-black text-blue-400 ${jetbrains.className} tracking-wider`}>500+</div>
                  <div className={`text-sm text-gray-300 ${inter.className} font-medium tracking-wide`}>Companies Analyzed</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl md:text-4xl font-black text-purple-400 ${jetbrains.className} tracking-wider`}>24/7</div>
                  <div className={`text-sm text-gray-300 ${inter.className} font-medium tracking-wide`}>Real-time Monitoring</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl md:text-4xl font-black text-emerald-400 ${jetbrains.className} tracking-wider`}>98%</div>
                  <div className={`text-sm text-gray-300 ${inter.className} font-medium tracking-wide`}>Accuracy Rate</div>
                </div>
              </div>
            </div>

            {/* Right side - Dashboard visual */}
            <div className="relative lg:block">
              <div className="relative">
                {/* Main dashboard mockup */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-white font-bold ${poppins.className} tracking-wide`}>Market Research</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Chart area */}
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <div className="flex items-end space-x-2 h-24">
                      {[40, 70, 45, 80, 65, 90, 55, 75].map((height, i) => (
                        <div 
                          key={i}
                          className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm flex-1 opacity-80"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className={`text-xs text-gray-300 mt-2 ${inter.className} font-medium`}>Market Growth Trends</div>
                  </div>
                  
                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className={`text-emerald-400 text-sm ${jetbrains.className} font-bold`}>↗ +12.5%</div>
                      <div className={`text-white text-xs ${inter.className} font-medium`}>Market Growth</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className={`text-blue-400 text-sm ${jetbrains.className} font-bold`}>$2.4B</div>
                      <div className={`text-white text-xs ${inter.className} font-medium`}>Market Size</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className={`text-purple-400 text-sm ${jetbrains.className} font-bold`}>8 Active</div>
                      <div className={`text-white text-xs ${inter.className} font-medium`}>Competitors</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className={`text-pink-400 text-sm ${jetbrains.className} font-bold`}>95% Positive</div>
                      <div className={`text-white text-xs ${inter.className} font-medium`}>Sentiment</div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3 shadow-lg animate-pulse">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-3 shadow-lg animate-bounce">
                  <Brain className="h-6 w-6 text-white" />
                </div>

                {/* Data points */}
                <div className={`absolute top-12 -left-8 bg-white/20 backdrop-blur-sm rounded-lg p-2 text-xs text-white ${inter.className} font-semibold tracking-wide`}>
                  Real-time data
                </div>
                
                <div className={`absolute bottom-12 -right-8 bg-white/20 backdrop-blur-sm rounded-lg p-2 text-xs text-white ${inter.className} font-semibold tracking-wide`}>
                  AI Analysis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfair.className} tracking-tight`}>
            Comprehensive Market Intelligence Services
          </h2>
          <p className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto ${poppins.className} font-light leading-relaxed`}>
            Choose from our suite of AI-powered tools to get the insights you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className={`text-xl ${poppins.className} font-semibold tracking-wide`}>{service.name}</CardTitle>
                  </div>
                  <CardDescription className={`text-base ${inter.className} font-normal leading-relaxed`}>
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature} className={`flex items-center text-sm text-gray-600 ${inter.className} font-medium`}>
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href}>
                    <Button className={`w-full ${poppins.className} font-semibold tracking-wide`}>
                      Try {service.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfair.className} tracking-tight`}>
              Why Choose Quantix?
            </h2>
            <p className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto ${poppins.className} font-light leading-relaxed`}>
              Transform your business intelligence with automated, real-time insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className={`text-2xl font-black text-blue-600 ${jetbrains.className}`}>{index + 1}</span>
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-2 ${poppins.className} tracking-wide`}>
                  {benefit.title}
                </h3>
                <p className={`text-gray-600 ${inter.className} font-normal leading-relaxed`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-slate-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${playfair.className} tracking-tight`}>
            Ready to Transform Your Market Intelligence?
          </h2>
          <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 ${poppins.className} font-light leading-relaxed`}>
            Join hundreds of businesses already using AI Market Sensing to make better, 
            faster decisions with real-time market data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className={`text-lg px-8 py-4 ${poppins.className} font-semibold tracking-wide`}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className={`text-lg px-8 py-4 border-white text-blue-600 hover:bg-blue-100 hover:text-blue-600 ${poppins.className} font-semibold tracking-wide`}>
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
