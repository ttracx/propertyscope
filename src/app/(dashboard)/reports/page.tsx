'use client'

import { useState, useEffect } from 'react'
import { FileText, Download, Plus, Calendar, Building } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

interface Report {
  id: string
  title: string
  type: string
  createdAt: string
  property?: {
    address: string
    city: string
    state: string
  }
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports')
      if (response.ok) {
        const data = await response.json()
        setReports(data)
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'valuation':
        return 'bg-blue-100 text-blue-700'
      case 'market':
        return 'bg-purple-100 text-purple-700'
      case 'investment':
        return 'bg-emerald-100 text-emerald-700'
      case 'comparables':
        return 'bg-orange-100 text-orange-700'
      case 'neighborhood':
        return 'bg-pink-100 text-pink-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center">
            <FileText className="w-7 h-7 text-slate-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
            <p className="text-slate-600">View and download your analysis reports</p>
          </div>
        </div>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-500">Total Reports</p>
            <p className="text-2xl font-bold text-slate-900">{reports.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-500">Valuations</p>
            <p className="text-2xl font-bold text-slate-900">
              {reports.filter(r => r.type === 'valuation').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-500">Market Analyses</p>
            <p className="text-2xl font-bold text-slate-900">
              {reports.filter(r => r.type === 'market').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-500">Investment Analyses</p>
            <p className="text-2xl font-bold text-slate-900">
              {reports.filter(r => r.type === 'investment').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">All Reports</h2>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : reports.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {reports.map((report) => (
                <div key={report.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{report.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                          {report.type}
                        </span>
                        {report.property && (
                          <span className="text-sm text-slate-500 flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {report.property.address}, {report.property.city}
                          </span>
                        )}
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(report.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600">No reports yet</p>
              <p className="text-slate-500 text-sm mt-1">
                Reports will appear here as you run analyses
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
