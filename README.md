# PropertyScope

AI-powered real estate intelligence platform providing instant property valuations, market analysis, investment calculations, and comprehensive neighborhood insights.

## Features

- **🏠 Property Valuation** - Get instant AI-powered property valuations with detailed market analysis
- **📊 Market Analysis** - Comprehensive market insights including trends, inventory, and investment potential
- **💰 Investment Calculator** - Calculate ROI, cash flow, cap rates with AI recommendations
- **🔍 Comparable Search** - Find and analyze comparable properties with AI-generated adjustments
- **📍 Neighborhood Insights** - Deep dive into neighborhoods with school ratings, safety scores, and lifestyle analysis
- **📄 Report Generation** - Generate professional PDF reports for all your analyses

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Neon PostgreSQL with Prisma ORM
- **AI**: OpenAI GPT-4o
- **Payments**: Stripe ($59/month subscription)
- **Authentication**: NextAuth.js

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
pnpm dev
```

## Environment Variables

```env
DATABASE_URL=your_neon_postgres_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PRICE_ID=your_stripe_price_id
```

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

## License

MIT License

---

Built with ❤️ by PropertyScope
