import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        )

        const subData = subscription as unknown as { current_period_end: number; id: string; items: { data: Array<{ price: { id: string } }> } }

        await prisma.subscription.update({
          where: { stripeCustomerId: session.customer as string },
          data: {
            stripeSubscriptionId: subData.id,
            stripePriceId: subData.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subData.current_period_end * 1000),
            status: 'active',
          },
        })
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as unknown as { subscription?: string }
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription)

          const subData = subscription as unknown as { current_period_end: number; id: string; items: { data: Array<{ price: { id: string } }> } }

          await prisma.subscription.update({
            where: { stripeSubscriptionId: subData.id },
            data: {
              stripePriceId: subData.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(subData.current_period_end * 1000),
              status: 'active',
            },
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as unknown as { current_period_end: number; id: string }
        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: 'canceled',
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
