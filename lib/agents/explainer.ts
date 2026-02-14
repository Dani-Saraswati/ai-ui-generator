import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function explainChanges(
  userMessage: string,
  previousCode: string | null,
  newCode: string
): Promise<string> {
  const prompt = `Explain what changed in the UI code in simple, user-friendly language.

User request: "${userMessage}"

${previousCode ? `Previous code:\n${previousCode}\n\n` : 'This is a new UI generated from scratch.\n\n'}

New code:\n${newCode}

Provide a brief explanation covering:
1. What changed (or what was created if new)
2. Why these components were chosen
3. How it addresses the user's request

Keep it concise (2-4 sentences).`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.5,
  });

  return completion.choices[0]?.message?.content || 'UI generated successfully.';
}