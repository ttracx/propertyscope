import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateNeighborhoodInsights } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { address, city, state, zipCode } = body

    // Generate AI neighborhood insights
    const insights = await generateNeighborhoodInsights({ address, city, state, zipCode })

    // Save analysis
    const analysis = await prisma.analysis.create({
      data: {
        userId: session.user.id,
        type: 'neighborhood',
        data: { address, city, state, zipCode },
        aiInsights: insights,
      },
    })

    return NextResponse.json({
      analysis,
      insights,
    })
  } catch (error) {
    console.error('Neighborhood analysis error:', error)
    return NextResponse.json({ error: 'Failed to generate neighborhood insights' }, { status: 500 })
  }
}
