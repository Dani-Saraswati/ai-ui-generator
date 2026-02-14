import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type Plan = {
  layout: string;
  components: Array<{
    type: string;
    props: Record<string, any>;
  }>;
  reasoning: string;
};

export async function planUI(userMessage: string, existingCode?: string): Promise<Plan> {
  const prompt = `You are a UI planner. Analyze the user's request and output a JSON plan.

Available components: Button, Card, Input, Table, Modal, Sidebar, Navbar, Chart

Component prop schemas:
- Button: { children: string, variant?: 'primary' | 'secondary' | 'danger', size?: 'sm' | 'md' | 'lg' }
- Card: { title?: string, children: string }
- Input: { type?: 'text' | 'email' | 'password', placeholder?: string, label?: string }
- Table: { headers: string[], rows: string[][] }
- Modal: { isOpen: boolean, title?: string, children: string }
- Sidebar: { items: {label: string, icon?: string}[] }
- Navbar: { title: string }
- Chart: { type: 'bar' | 'line' | 'pie', data: {label: string, value: number}[] }

Rules:
1. Choose a layout structure (single-column, two-column, dashboard, etc.)
2. Select appropriate components from the allowed list
3. Provide reasoning for your choices
4. If modifying existing code, explain what should change

${existingCode ? `Current code:\n${existingCode}\n\nUser wants to modify it.` : 'Generate new UI from scratch.'}

User request: "${userMessage}"

Output ONLY valid JSON in this format:
{
  "layout": "description of layout structure",
  "components": [
    { "type": "ComponentName", "props": {...} }
  ],
  "reasoning": "explanation of design decisions"
}`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
  });

  const content = completion.choices[0]?.message?.content || '{}';
  
  // Extract JSON from markdown code blocks if present
  let jsonText = content;
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  }
  
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Failed to parse plan:', content);
    throw new Error('Invalid plan generated');
  }
}