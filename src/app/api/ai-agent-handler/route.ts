// src/app/api/ai-agent-handler/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai'; // Ensure OpenAI is imported

const AIMLAPI_KEY = "8c5b4c90a0484f818e8c97f5f2a84383"; // IMPORTANT: Use env var for production

const client = new OpenAI({
    baseURL: "https://api.aimlapi.com/v1",
    apiKey: AIMLAPI_KEY,
});

const generateSystemPrompt = (companyInput: string) => `You are an AI-powered business intelligence analyst. Your goal is to extract and analyze key competitive insights from a given company and generate a structured, insightful report useful for strategic planning.

Given the following company input: "${companyInput}"

Perform the following tasks. If you are given a URL, use your knowledge to analyze its content and the company it represents. If you are given only a company name, use your general knowledge about that company. If specific details for a section are not found or publicly available, clearly state "Information not readily available" or a similar phrase for that specific subsection, but still attempt to provide a general analysis where possible based on the company's likely industry and profile.

1.  **Extract and Summarize Key Information**:
    *   **Company Overview**: Briefly describe the company, its mission, and its industry.
    *   **Products / Services Offered**: List and briefly describe the main products or services.
    *   **Target Audience**: Identify the primary customer segments.
    *   **Value Proposition**: What unique value does the company offer to its customers?
    *   **Pricing Model (if discernible/known)**: Describe the pricing strategy (e.g., subscription, one-time purchase, freemium).
    *   **Unique Selling Points (USPs)**: What makes the company stand out from its competitors?
    *   **Key Call-To-Actions (CTAs) (if analyzing a website/public information)**: What are the primary actions the company encourages users/customers to take?
    *   **Visual Design / UX Impressions (if analyzing a website/public information)**: Briefly comment on the perceived branding, design, and user experience.

2.  **Conduct a SWOT Analysis**:
    *   **Strengths**: Internal positive factors (e.g., strong brand, unique technology, loyal customers).
    *   **Weaknesses**: Internal negative factors (e.g., high debt, outdated technology, poor customer service).
    *   **Opportunities**: External positive factors (e.g., growing market, new technology, competitor's weakness).
    *   **Threats**: External negative factors (e.g., new competitors, changing regulations, economic downturn).

3.  **Generate Report**:
    Output the information as a clean, concise, business-friendly report. Use markdown formatting with clear headings (e.g., \`### Section Title\`), sub-headings (e.g. \`#### Sub-section Title\`), bullet points, and bold text for emphasis.

Use the following EXACT structure for the report:

🔍 Company: [Company Name derived from input]
🌐 Website: [URL if provided, otherwise "Information not readily available"]

📝 Overview:
...

📦 Products / Services:
...

🎯 Target Audience:
...

💡 Value Proposition:
...

💰 Pricing:
...

✅ Unique Selling Points:
...

🎨 Design / UX Observations:
...

📢 CTAs:
...

📊 SWOT Analysis:
- Strengths:
- Weaknesses:
- Opportunities:
- Threats:

Ensure the report is well-structured and easy to read. Start the report with a main title like:
## Competitive Intelligence Report: [Company Name derived from input]`;

export async function POST(request: Request) {
  try {
    const { company_input, user_business_input } = await request.json();

    if (!company_input) {
      return NextResponse.json({ error: 'Company name or URL is required' }, { status: 400 });
    }

    console.log(`[AI BI Analyst] Received input: "${company_input}"`);
    const systemPrompt = generateSystemPrompt(company_input);

    let userContent = `Generate the competitive intelligence report for: ${company_input}`;
    if (user_business_input) {
        userContent += `\n\nAlso, provide a comparison of this company to the user's business: ${user_business_input}. Include a section titled "🔁 Comparison with user’s business".`;
    }

    const chatCompletion = await client.chat.completions.create({
        model: "google/gemini-2.5-pro-preview-05-06", // Using a capable model for complex analysis
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userContent }
        ],
        temperature: 0.5, // Lower temperature for more focused and less creative output
    });

    const messageContent = chatCompletion.choices[0]?.message?.content;

    if (!messageContent) {
      console.error("[AI BI Analyst] No content in AI response object:", chatCompletion);
      return NextResponse.json({ error: 'Failed to get valid content from AI response.' }, { status: 500 });
    }

    console.log(`[AI BI Analyst] AI Response successfully generated.`);
    return NextResponse.json({ report: messageContent.trim() });

  } catch (error: any) {
    // Log the full error object to help diagnose the issue
    console.error('[AI BI Analyst] FULL ERROR OBJECT:', JSON.stringify(error, Object.getOwnPropertyNames(error)));

    let errorMessage = 'An unexpected error occurred with the AI service.';
    let errorStatus = 500;

    if (error instanceof OpenAI.APIError) { // Specifically handle OpenAI API errors
      errorStatus = error.status || 500;
      errorMessage = `AI Service Error (Status: ${errorStatus}): ${error.message}`;
      // Try to get more specific error details from the parsed error object if available
      if (error.error && typeof error.error === 'object') {
        const apiError = error.error as any; // Cast to any to access potential properties
        const specificDetail = apiError?.error?.message || apiError?.message || JSON.stringify(apiError);
        errorMessage = `AI Service Error (Status: ${errorStatus}): ${specificDetail || error.message}`;
      }
      console.error(`[AI BI Analyst] OpenAI APIError: Status ${errorStatus}, Message: "${errorMessage}"`, error.error);
    } else if (error.message) { // Handle generic errors
      errorMessage = error.message;
    }

    // Ensure a JSON response is always sent from the catch block
    return NextResponse.json({ error: errorMessage }, { status: errorStatus });
  }
}
