import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')

    const analyses = await prisma.analysis.findMany({
      where: {
        userId: session.user.id,
        ...(type && { type }),
      },
      include: { property: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json(analyses)
  } catch (error) {
    console.error('Analyses error:', error)
    return NextResponse.json({ error: 'Failed to fetch analyses' }, { status: 500 })
  }
}
