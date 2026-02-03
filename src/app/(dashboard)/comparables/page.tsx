'use client'

import { useState } from 'react'
import { Search, Home, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const propertyTypes = [
  { value: 'single-family', label: 'Single Family Home' },
  { value: 'condo', label: 'Condo/Townhouse' },
  { value: 'multi-family', label: 'Multi-Family' },
  { value: 'land', label: 'Land/Lot' },
]

export default function ComparablesPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    propertyType: 'single-family',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/comparables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
          bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : undefined,
          sqft: formData.sqft ? parseInt(formData.sqft) : undefined,
        }),
      })

      const data = await response.json()
      if (data.comparables) {
        setResult(data.comparables)
      } else {
        setResult('Failed to find comparables. Please try again.')
      }
    } catch (error) {
      setResult('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
          <Search className="w-7 h-7 text-orange-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Comparable Search</h1>
          <p className="text-slate-600">Find and analyze comparable properties for accurate pricing</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">Subject Property</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="address"
                label="Street Address"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={handleChange}
                required
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

              <Select
                name="propertyType"
                label="Property Type"
                options={propertyTypes}
                value={formData.propertyType}
                onChange={handleChange}
              />

              <div className="grid grid-cols-3 gap-4">
                <Input
                  name="bedrooms"
                  label="Bedrooms"
                  type="number"
                  placeholder="3"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
                <Input
                  name="bathrooms"
                  label="Bathrooms"
                  type="number"
                  step="0.5"
                  placeholder="2"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
                <Input
                  name="sqft"
                  label="Sq Ft"
                  type="number"
                  placeholder="2000"
                  value={formData.sqft}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                <Search className="w-5 h-5 mr-2" />
                Find Comparables
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">Comparable Properties</h2>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                <p className="text-slate-600">Searching for comparable properties...</p>
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
                <p className="text-slate-600">Enter property details to find comparables</p>
                <p className="text-slate-500 text-sm mt-1">
                  AI will analyze similar recently sold properties
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
