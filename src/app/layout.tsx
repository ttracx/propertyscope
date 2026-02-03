import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PropertyScope - AI-Powered Real Estate Intelligence',
  description: 'Get instant AI-powered property valuations, market analysis, investment calculations, and comprehensive real estate insights.',
  keywords: 'real estate, property valuation, market analysis, investment calculator, AI, machine learning',
  openGraph: {
    title: 'PropertyScope - AI-Powered Real Estate Intelligence',
    description: 'Transform your real estate analysis with AI-powered valuations, market insights, and investment calculations.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
