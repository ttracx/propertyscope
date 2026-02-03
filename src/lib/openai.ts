import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generatePropertyValuation(property: {
  address: string
  city: string
  state: string
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  yearBuilt?: number
  propertyType: string
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an expert real estate appraiser and analyst. Provide detailed property valuations based on market data, comparable sales, and property characteristics. Always provide specific dollar amounts and percentages. Format responses in clear sections.`
      },
      {
        role: 'user',
        content: `Analyze this property and provide a detailed valuation:
Address: ${property.address}, ${property.city}, ${property.state}
Property Type: ${property.propertyType}
Bedrooms: ${property.bedrooms || 'Unknown'}
Bathrooms: ${property.bathrooms || 'Unknown'}
Square Feet: ${property.sqft || 'Unknown'}
Year Built: ${property.yearBuilt || 'Unknown'}

Provide:
1. Estimated market value range (low, mid, high)
2. Key value drivers
3. Potential issues affecting value
4. Comparison to local market averages
5. Value trend prediction (6-12 months)`
      }
    ],
    temperature: 0.7,
    max_tokens: 1500,
  })

  return response.choices[0].message.content
}

export async function generateMarketAnalysis(location: {
  city: string
  state: string
  zipCode?: string
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a real estate market analyst. Provide comprehensive market analysis with specific statistics, trends, and actionable insights.`
      },
      {
        role: 'user',
        content: `Provide a comprehensive real estate market analysis for ${location.city}, ${location.state}${location.zipCode ? ` (${location.zipCode})` : ''}:

Include:
1. Current market conditions (buyer's/seller's market)
2. Median home prices and trends
3. Average days on market
4. Inventory levels
5. Price per square foot averages
6. Year-over-year price changes
7. Key market drivers
8. Investment potential score (1-10)
9. Future outlook (6-12 months)`
      }
    ],
    temperature: 0.7,
    max_tokens: 1500,
  })

  return response.choices[0].message.content
}

export async function generateNeighborhoodInsights(location: {
  address?: string
  city: string
  state: string
  zipCode?: string
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a neighborhood expert and real estate consultant. Provide detailed neighborhood insights covering demographics, amenities, schools, safety, and lifestyle factors.`
      },
      {
        role: 'user',
        content: `Provide comprehensive neighborhood insights for ${location.address ? location.address + ', ' : ''}${location.city}, ${location.state}${location.zipCode ? ` ${location.zipCode}` : ''}:

Include:
1. Overall neighborhood score (1-10)
2. Demographics overview
3. School ratings and options
4. Safety and crime statistics
5. Walkability and transit scores
6. Local amenities (restaurants, shopping, parks)
7. Employment centers nearby
8. Community vibe and lifestyle
9. Property value trends in area
10. Best suited for (families, young professionals, retirees, etc.)`
      }
    ],
    temperature: 0.7,
    max_tokens: 1500,
  })

  return response.choices[0].message.content
}

export async function generateComparables(property: {
  address: string
  city: string
  state: string
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  propertyType: string
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a real estate comparable sales expert. Generate realistic comparable property analyses based on typical market data patterns.`
      },
      {
        role: 'user',
        content: `Find and analyze comparable properties (comps) for:
Address: ${property.address}, ${property.city}, ${property.state}
Type: ${property.propertyType}
Bedrooms: ${property.bedrooms || 'Unknown'}
Bathrooms: ${property.bathrooms || 'Unknown'}
Sq Ft: ${property.sqft || 'Unknown'}

Provide 5 comparable properties with:
1. Address (nearby, realistic format)
2. Sale price and date
3. Bedrooms/bathrooms/sqft
4. Price per square foot
5. Days on market
6. How it compares (better/worse condition, features, etc.)
7. Adjusted value for subject property

Also provide:
- Average comparable price
- Suggested price range for subject property
- Key adjustment factors`
      }
    ],
    temperature: 0.8,
    max_tokens: 2000,
  })

  return response.choices[0].message.content
}

export async function generateInvestmentAnalysis(investment: {
  purchasePrice: number
  downPayment: number
  interestRate: number
  loanTerm: number
  monthlyRent: number
  propertyTaxes: number
  insurance: number
  maintenance: number
  vacancy: number
  city: string
  state: string
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a real estate investment analyst. Provide detailed investment analysis with specific calculations and actionable recommendations.`
      },
      {
        role: 'user',
        content: `Analyze this real estate investment:

Purchase Details:
- Purchase Price: $${investment.purchasePrice.toLocaleString()}
- Down Payment: $${investment.downPayment.toLocaleString()} (${((investment.downPayment / investment.purchasePrice) * 100).toFixed(1)}%)
- Interest Rate: ${investment.interestRate}%
- Loan Term: ${investment.loanTerm} years

Income & Expenses:
- Monthly Rent: $${investment.monthlyRent.toLocaleString()}
- Annual Property Taxes: $${investment.propertyTaxes.toLocaleString()}
- Annual Insurance: $${investment.insurance.toLocaleString()}
- Monthly Maintenance: $${investment.maintenance.toLocaleString()}
- Vacancy Rate: ${investment.vacancy}%

Location: ${investment.city}, ${investment.state}

Calculate and provide:
1. Monthly mortgage payment
2. Total monthly expenses
3. Net monthly cash flow
4. Annual cash flow
5. Cash-on-cash return
6. Cap rate
7. ROI projections (1, 5, 10 years)
8. Break-even occupancy rate
9. Investment grade (A-F)
10. Recommendations for improving returns`
      }
    ],
    temperature: 0.7,
    max_tokens: 2000,
  })

  return response.choices[0].message.content
}
