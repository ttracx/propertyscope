import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateMarketAnalysis } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { city, state, zipCode } = body

    // Generate AI market analysis
    const analysis = await generateMarketAnalysis({ city, state, zipCode })

    // Save analysis
    const savedAnalysis = await prisma.analysis.create({
      data: {
        userId: session.user.id,
        type: 'market',
        data: { city, state, zipCode },
        aiInsights: analysis,
      },
    })

    return NextResponse.json({
      analysis: savedAnalysis,
      insights: analysis,
    })
  } catch (error) {
    console.error('Market analysis error:', error)
    return NextResponse.json({ error: 'Failed to generate market analysis' }, { status: 500 })
  }
}
