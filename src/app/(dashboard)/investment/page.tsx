'use client'

import { useState } from 'react'
import { Calculator, DollarSign, TrendingUp, PiggyBank } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function InvestmentPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    purchasePrice: '',
    downPayment: '',
    interestRate: '7.0',
    loanTerm: '30',
    monthlyRent: '',
    propertyTaxes: '',
    insurance: '',
    maintenance: '',
    vacancy: '5',
    city: '',
    state: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/investment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purchasePrice: parseFloat(formData.purchasePrice),
          downPayment: parseFloat(formData.downPayment),
          interestRate: parseFloat(formData.interestRate),
          loanTerm: parseInt(formData.loanTerm),
          monthlyRent: parseFloat(formData.monthlyRent),
          propertyTaxes: parseFloat(formData.propertyTaxes),
          insurance: parseFloat(formData.insurance),
          maintenance: parseFloat(formData.maintenance),
          vacancy: parseFloat(formData.vacancy),
          city: formData.city,
          state: formData.state,
        }),
      })

      const data = await response.json()
      if (data.insights) {
        setResult(data.insights)
      } else {
        setResult('Failed to generate investment analysis. Please try again.')
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

  // Quick calculations
  const purchasePrice = parseFloat(formData.purchasePrice) || 0
  const downPayment = parseFloat(formData.downPayment) || 0
  const downPaymentPercent = purchasePrice > 0 ? ((downPayment / purchasePrice) * 100).toFixed(1) : '0'
  const loanAmount = purchasePrice - downPayment

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
          <Calculator className="w-7 h-7 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Investment Calculator</h1>
          <p className="text-slate-600">Calculate ROI, cash flow, and get AI recommendations</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-500">Purchase Price</p>
            <p className="text-2xl font-bold text-slate-900">
              ${purchasePrice.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-500">Down Payment</p>
            <p className="text-2xl font-bold text-slate-900">
              {downPaymentPercent}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-500">Loan Amount</p>
            <p className="text-2xl font-bold text-slate-900">
              ${loanAmount.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-500">Monthly Rent</p>
            <p className="text-2xl font-bold text-slate-900">
              ${(parseFloat(formData.monthlyRent) || 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">Investment Details</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Purchase Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="purchasePrice"
                    label="Purchase Price ($)"
                    type="number"
                    placeholder="450000"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="downPayment"
                    label="Down Payment ($)"
                    type="number"
                    placeholder="90000"
                    value={formData.downPayment}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    name="interestRate"
                    label="Interest Rate (%)"
                    type="number"
                    step="0.125"
                    placeholder="7.0"
                    value={formData.interestRate}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="loanTerm"
                    label="Loan Term (years)"
                    type="number"
                    placeholder="30"
                    value={formData.loanTerm}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Income & Expenses</h3>
                <Input
                  name="monthlyRent"
                  label="Monthly Rent ($)"
                  type="number"
                  placeholder="2500"
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    name="propertyTaxes"
                    label="Annual Property Taxes ($)"
                    type="number"
                    placeholder="5000"
                    value={formData.propertyTaxes}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="insurance"
                    label="Annual Insurance ($)"
                    type="number"
                    placeholder="1500"
                    value={formData.insurance}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    name="maintenance"
                    label="Monthly Maintenance ($)"
                    type="number"
                    placeholder="200"
                    value={formData.maintenance}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="vacancy"
                    label="Vacancy Rate (%)"
                    type="number"
                    placeholder="5"
                    value={formData.vacancy}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                <Calculator className="w-5 h-5 mr-2" />
                Analyze Investment
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900">Investment Analysis</h2>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                <p className="text-slate-600">Calculating returns and analyzing investment...</p>
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
                  <PiggyBank className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600">Enter investment details to calculate returns</p>
                <p className="text-slate-500 text-sm mt-1">
                  Get ROI, cash flow, cap rate, and AI recommendations
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
