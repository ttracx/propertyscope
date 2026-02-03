'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CreditCard, Check, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const benefits = [
  'Unlimited property valuations',
  'Comprehensive market analysis',
  'Investment ROI calculator',
  'Comparable property search',
  'Neighborhood insights',
  'PDF report generation',
  'Priority support',
  'API access',
]

export default function BillingPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleManage = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Portal error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
          <CreditCard className="w-7 h-7 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Billing</h1>
          <p className="text-slate-600">Manage your subscription and billing details</p>
        </div>
      </div>

      {/* Success/Cancel Messages */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <p className="text-emerald-800">
            Successfully subscribed to PropertyScope Pro! You now have full access.
          </p>
        </div>
      )}
      {canceled && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <p className="text-amber-800">
            Subscription checkout was canceled. You can try again anytime.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Plan Card */}
        <Card className="border-2 border-emerald-500">
          <CardHeader className="bg-emerald-50 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">PropertyScope Pro</h2>
                <p className="text-slate-600 mt-1">Full access to all features</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-slate-900">$59</p>
                <p className="text-slate-600">/month</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3">
              <Button onClick={handleSubscribe} className="w-full" size="lg" loading={loading}>
                Subscribe Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button onClick={handleManage} variant="outline" className="w-full" size="lg">
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Subscription Details</h3>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-slate-600">Plan</dt>
                  <dd className="font-medium text-slate-900">PropertyScope Pro</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Price</dt>
                  <dd className="font-medium text-slate-900">$59/month</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Billing</dt>
                  <dd className="font-medium text-slate-900">Monthly</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Need Help?</h3>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Have questions about billing or your subscription? Contact our support team.
              </p>
              <Button variant="outline" className="mt-4">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Cancel anytime</p>
                  <p className="text-sm text-slate-600">
                    No long-term contracts. Cancel your subscription anytime from your billing portal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
