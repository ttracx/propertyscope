'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, Calculator, Search, MapPin, FileText, ArrowRight, Home, BarChart3, DollarSign, Building } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const quickActions = [
  {
    href: '/valuation',
    icon: TrendingUp,
    title: 'Property Valuation',
    description: 'Get instant AI-powered property valuations',
    color: 'bg-blue-500',
  },
  {
    href: '/market',
    icon: BarChart3,
    title: 'Market Analysis',
    description: 'Analyze local real estate market trends',
    color: 'bg-purple-500',
  },
  {
    href: '/investment',
    icon: Calculator,
    title: 'Investment Calculator',
    description: 'Calculate ROI and cash flow projections',
    color: 'bg-emerald-500',
  },
  {
    href: '/comparables',
    icon: Search,
    title: 'Comparable Search',
    description: 'Find and analyze comparable properties',
    color: 'bg-orange-500',
  },
  {
    href: '/neighborhood',
    icon: MapPin,
    title: 'Neighborhood Insights',
    description: 'Explore neighborhood data and scores',
    color: 'bg-pink-500',
  },
  {
    href: '/reports',
    icon: FileText,
    title: 'Reports',
    description: 'View and generate analysis reports',
    color: 'bg-slate-600',
  },
]

const stats = [
  { label: 'Valuations This Month', value: '24', icon: Home, change: '+12%' },
  { label: 'Market Analyses', value: '18', icon: BarChart3, change: '+8%' },
  { label: 'Reports Generated', value: '12', icon: FileText, change: '+15%' },
  { label: 'Avg. Property Value', value: '$485K', icon: DollarSign, change: '+5%' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}!
        </h1>
        <p className="mt-1 text-slate-600">
          Here&apos;s an overview of your PropertyScope activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-emerald-600 mt-1">{stat.change} vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={index} href={action.href}>
                <Card hover className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-slate-600 text-sm">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="py-8 text-center">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No recent activity yet.</p>
            <p className="text-slate-500 text-sm mt-1">
              Start by running a property valuation or market analysis.
            </p>
            <Link
              href="/valuation"
              className="inline-flex items-center mt-4 text-emerald-600 font-medium hover:text-emerald-700"
            >
              Run your first valuation
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
