import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Market Sensing - Automated Market Intelligence',
  description: 'Automate vendor selection, market research, and competitor analysis with AI-powered insights from public data sources.',
  keywords: 'market research, competitor analysis, vendor selection, AI, business intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="pb-8">
            {children}
          </main>
          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <div className="text-center text-gray-600">
                <p>&copy; 2025 Quantix. All rights reserved.</p>
                <p className="text-sm mt-2">
                  Automated market intelligence powered by AI
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
