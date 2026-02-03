'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { TrendingUp, Home, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const propertyTypes = [
  { value: 'single-family', label: 'Single Family Home' },
  { value: 'condo', label: 'Condo/Townhouse' },
  { value: 'multi-family', label: 'Multi-Family' },
  { value: 'land', label: 'Land/Lot' },
  { value: 'commercial', label: 'Commercial' },
]

export default function ValuationPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'single-family',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    listPrice: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
          bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : undefined,
          sqft: formData.sqft ? parseInt(formData.sqft) : undefined,
          yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
          listPrice: formData.listPrice ? parseFloat(formData.listPrice) : undefined,
        }),
      })

      const data = await response.json()
      if (data.valuation) {
        setResult(data.valuation)
      } else {
        setResult('Failed to generate valuation. Please try again.')
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
        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-7 h-7 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Property Valuation</h1>
          <p className="text-slate-600">Get instant AI-powered property valuations</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">Property Details</h2>
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

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="zipCode"
                  label="ZIP Code"
                  placeholder="78701"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
                <Select
                  name="propertyType"
                  label="Property Type"
                  options={propertyTypes}
                  value={formData.propertyType}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="sqft"
                  label="Square Feet"
                  type="number"
                  placeholder="2000"
                  value={formData.sqft}
                  onChange={handleChange}
                />
                <Input
                  name="yearBuilt"
                  label="Year Built"
                  type="number"
                  placeholder="2010"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                />
              </div>

              <Input
                name="listPrice"
                label="List Price (Optional)"
                type="number"
                placeholder="500000"
                value={formData.listPrice}
                onChange={handleChange}
              />

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                <TrendingUp className="w-5 h-5 mr-2" />
                Generate Valuation
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">Valuation Results</h2>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                <p className="text-slate-600">Analyzing property and generating valuation...</p>
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
                <p className="text-slate-600">Enter property details to generate a valuation</p>
                <p className="text-slate-500 text-sm mt-1">
                  Our AI will analyze the property and provide detailed insights
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
