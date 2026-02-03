import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generatePropertyValuation } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { address, city, state, zipCode, propertyType, bedrooms, bathrooms, sqft, yearBuilt, listPrice } = body

    // Generate AI valuation
    const valuation = await generatePropertyValuation({
      address,
      city,
      state,
      propertyType,
      bedrooms,
      bathrooms,
      sqft,
      yearBuilt,
    })

    // Save property and analysis
    const property = await prisma.property.create({
      data: {
        userId: session.user.id,
        address,
        city,
        state,
        zipCode,
        propertyType,
        bedrooms,
        bathrooms,
        sqft,
        yearBuilt,
        listPrice,
      },
    })

    const analysis = await prisma.analysis.create({
      data: {
        userId: session.user.id,
        propertyId: property.id,
        type: 'valuation',
        data: { address, city, state, propertyType, bedrooms, bathrooms, sqft, yearBuilt },
        aiInsights: valuation,
      },
    })

    return NextResponse.json({
      property,
      analysis,
      valuation,
    })
  } catch (error) {
    console.error('Valuation error:', error)
    return NextResponse.json({ error: 'Failed to generate valuation' }, { status: 500 })
  }
}
