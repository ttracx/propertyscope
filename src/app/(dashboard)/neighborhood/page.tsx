'use client'

import { useState } from 'react'
import { MapPin, Home, Users, Shield, School, Coffee } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NeighborhoodPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/neighborhood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.insights) {
        setResult(data.insights)
      } else {
        setResult('Failed to generate neighborhood insights. Please try again.')
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

  const insightCategories = [
    { icon: Users, label: 'Demographics' },
    { icon: School, label: 'Schools' },
    { icon: Shield, label: 'Safety' },
    { icon: Coffee, label: 'Amenities' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center">
          <MapPin className="w-7 h-7 text-pink-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Neighborhood Insights</h1>
          <p className="text-slate-600">Explore neighborhood data, scores, and lifestyle analysis</p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCategories.map((cat, index) => {
          const Icon = cat.icon
          return (
            <Card key={index}>
              <CardContent className="pt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-pink-600" />
                </div>
                <span className="font-medium text-slate-900">{cat.label}</span>
              </CardContent>
            </Card>
          )
        })}
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
                name="address"
                label="Street Address (Optional)"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <Input
                name="zipCode"
                label="ZIP Code (Optional)"
                placeholder="78701"
                value={formData.zipCode}
                onChange={handleChange}
              />

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                <MapPin className="w-5 h-5 mr-2" />
                Get Neighborhood Insights
              </Button>
            </form>

            {/* Popular Neighborhoods */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-3">Popular Neighborhoods:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { city: 'Austin', state: 'TX', name: 'Downtown Austin' },
                  { city: 'Miami', state: 'FL', name: 'Brickell' },
                  { city: 'Denver', state: 'CO', name: 'LoDo' },
                  { city: 'Seattle', state: 'WA', name: 'Capitol Hill' },
                ].map((area) => (
                  <button
                    key={area.name}
                    type="button"
                    onClick={() => setFormData({ address: '', city: area.city, state: area.state, zipCode: '' })}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200 transition-colors"
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">Neighborhood Report</h2>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                <p className="text-slate-600">Analyzing neighborhood data...</p>
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
                  <Home className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600">Enter a location to explore the neighborhood</p>
                <p className="text-slate-500 text-sm mt-1">
                  Get insights on schools, safety, amenities, and more
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
