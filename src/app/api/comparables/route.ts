import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateComparables } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { address, city, state, propertyType, bedrooms, bathrooms, sqft } = body

    // Generate AI comparables analysis
    const comparables = await generateComparables({
      address,
      city,
      state,
      propertyType,
      bedrooms,
      bathrooms,
      sqft,
    })

    // Save analysis
    const analysis = await prisma.analysis.create({
      data: {
        userId: session.user.id,
        type: 'comparables',
        data: { address, city, state, propertyType, bedrooms, bathrooms, sqft },
        aiInsights: comparables,
      },
    })

    return NextResponse.json({
      analysis,
      comparables,
    })
  } catch (error) {
    console.error('Comparables error:', error)
    return NextResponse.json({ error: 'Failed to generate comparables' }, { status: 500 })
  }
}
