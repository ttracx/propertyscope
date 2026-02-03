'use client'

import { useState } from 'react'
import { BarChart3, MapPin, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function MarketPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    zipCode: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.insights) {
        setResult(data.insights)
      } else {
        setResult('Failed to generate market analysis. Please try again.')
      }
    } catch (error) {
      setResult('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-7 h-7 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Market Analysis</h1>
          <p className="text-slate-600">Analyze local real estate market trends and conditions</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">Location</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="city"
                label="City"
                placeholder="Austin"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <Input
                name="state"
                label="State"
                placeholder="TX"
                value={formData.state}
                onChange={handleChange}
                required
              />

              <Input
                name="zipCode"
                label="ZIP Code (Optional)"
                placeholder="78701"
                value={formData.zipCode}
                onChange={handleChange}
              />

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                <BarChart3 className="w-5 h-5 mr-2" />
                Analyze Market
              </Button>
            </form>

            {/* Quick Markets */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-3">Popular Markets:</p>
              <div className="flex flex-wrap gap-2">
                {['Austin, TX', 'Miami, FL', 'Denver, CO', 'Seattle, WA', 'Phoenix, AZ'].map((market) => (
                  <button
                    key={market}
                    type="button"
                    onClick={() => {
                      const [city, state] = market.split(', ')
                      setFormData({ city, state, zipCode: '' })
                    }}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200 transition-colors"
                  >
                    {market}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">Market Insights</h2>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                <p className="text-slate-600">Analyzing market conditions...</p>
              </div>
            ) : result ? (
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {result}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600">Enter a location to analyze market conditions</p>
                <p className="text-slate-500 text-sm mt-1">
                  Get insights on pricing trends, inventory, and investment potential
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
