import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateInvestmentAnalysis } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      purchasePrice,
      downPayment,
      interestRate,
      loanTerm,
      monthlyRent,
      propertyTaxes,
      insurance,
      maintenance,
      vacancy,
      city,
      state,
    } = body

    // Generate AI investment analysis
    const analysis = await generateInvestmentAnalysis({
      purchasePrice,
      downPayment,
      interestRate,
      loanTerm,
      monthlyRent,
      propertyTaxes,
      insurance,
      maintenance,
      vacancy,
      city,
      state,
    })

    // Save analysis
    const savedAnalysis = await prisma.analysis.create({
      data: {
        userId: session.user.id,
        type: 'investment',
        data: body,
        aiInsights: analysis,
      },
    })

    return NextResponse.json({
      analysis: savedAnalysis,
      insights: analysis,
    })
  } catch (error) {
    console.error('Investment analysis error:', error)
    return NextResponse.json({ error: 'Failed to generate investment analysis' }, { status: 500 })
  }
}
