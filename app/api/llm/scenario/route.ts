// /app/api/llm/generateScenario/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

const API_KEY = process.env.OPENAI_API_KEY as string;
const openai = new OpenAI({
  apiKey: API_KEY,
});

export async function POST(request: Request) {
  try {
    const { industry } = await request.json();

    const prompt = `
        You are a creative assistant that generates simple scenarios for vocational students to assess their soft skills based on their chosen industry.

        Industry: ${industry}

        Generate a concise and simple scenario with a single matter (max 100 words) that is relevant to the industry and can help assess the following soft skills:
        - Communication
        - Social Intelligence
        - Problem-Solving
        - Creative Agency

        Output the scenario in plain text.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4", // Use the appropriate model
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const scenario = response.choices[0].message.content;

    return new NextResponse(JSON.stringify({ scenario }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error generating scenario:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
