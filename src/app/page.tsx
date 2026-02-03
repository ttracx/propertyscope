import Link from 'next/link'
import { Home, TrendingUp, Calculator, Search, MapPin, FileText, CheckCircle, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: 'AI Property Valuation',
    description: 'Get instant, AI-powered property valuations with detailed market analysis and value drivers.',
  },
  {
    icon: Search,
    title: 'Market Analysis',
    description: 'Comprehensive market insights including trends, inventory levels, and investment potential.',
  },
  {
    icon: Calculator,
    title: 'Investment Calculator',
    description: 'Calculate ROI, cash flow, cap rates, and get AI recommendations for your investments.',
  },
  {
    icon: MapPin,
    title: 'Comparable Search',
    description: 'Find and analyze comparable properties with AI-generated adjustment recommendations.',
  },
  {
    icon: Home,
    title: 'Neighborhood Insights',
    description: 'Deep dive into neighborhoods with school ratings, safety scores, and lifestyle analysis.',
  },
  {
    icon: FileText,
    title: 'Report Generation',
    description: 'Generate professional PDF reports for your analyses, ready to share with clients.',
  },
]

const benefits = [
  'Instant AI-powered valuations',
  'Comprehensive market data',
  'Investment ROI calculations',
  'Comparable property analysis',
  'Neighborhood insights & scores',
  'Professional PDF reports',
  'Unlimited analyses',
  'Priority support',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900">PropertyScope</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
            AI-Powered
            <span className="text-emerald-600"> Real Estate</span>
            <br />Intelligence
          </h1>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            PropertyScope combines artificial intelligence with comprehensive real estate data to deliver
            instant valuations, market insights, and investment analysis for real estate professionals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-emerald-600 hover:text-emerald-600 transition-colors"
            >
              See Features
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">
              Everything You Need for Real Estate Analysis
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Powerful AI tools to make smarter real estate decisions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              One plan with everything you need
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">PropertyScope Pro</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900">$59</span>
                    <span className="text-xl text-slate-600 ml-2">/month</span>
                  </div>
                  <p className="mt-2 text-slate-600">Billed monthly • Cancel anytime</p>
                </div>
                <Link
                  href="/login"
                  className="mt-8 lg:mt-0 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors text-center"
                >
                  Start 7-Day Free Trial
                </Link>
              </div>
              <div className="mt-12 grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white">
            Ready to Transform Your Real Estate Analysis?
          </h2>
          <p className="mt-4 text-xl text-emerald-100">
            Join thousands of real estate professionals using PropertyScope
          </p>
          <Link
            href="/login"
            className="mt-8 inline-block bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PropertyScope</span>
            </div>
            <p className="mt-4 md:mt-0 text-slate-400">
              © 2026 PropertyScope. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
