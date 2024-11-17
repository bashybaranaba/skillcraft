//api/llm/gpt/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: API_KEY,
});

export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { instruction, inputs, memory, image } = requestBody;

    const prompt = `
You are an assistant designed to analyze a user's response to a given scenario and evaluate their soft skills.

Instruction: ${instruction}

Here is the user's response:
"${inputs}"

Here is the past interaction data: ${JSON.stringify(memory)}

Evaluate the user's response based on the following criteria:
- Communication
- Social Intelligence
- Problem-Solving
- Creative Agency

Provide a general comment and detailed feedback for each criterion. It should touch on the strentghs and areas for improvement.
The feedback should be constructive and personable.

Output the analysis in the following JSON format:

{
  "general_comment": "string",
  "communication": "string",
  "social_intelligence": "string",
  "problem_solving": "string",
  "creative_agency": "string"
}

Note: The output fields should be of string type.

    `;

    type UserContent =
      | { type: "text"; text: string }
      | { type: "image_url"; image_url: { url: string } };

    const userContent: UserContent[] = [
      {
        type: "text",
        text: inputs,
      },
    ];

    if (image) {
      userContent.push({ type: "image_url", image_url: { url: image } });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.2,
      max_tokens: 16384,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return new NextResponse(
      JSON.stringify(response.choices[0].message.content),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
