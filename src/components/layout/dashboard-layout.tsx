'use client'

import { ReactNode } from 'react'
import { Navbar } from './navbar'
import { SessionProvider } from 'next-auth/react'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="lg:pl-64 pt-16 lg:pt-0">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  )
}
