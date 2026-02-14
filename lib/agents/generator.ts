import Groq from 'groq-sdk';
import { Plan } from './planner';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateCode(plan: Plan, existingCode?: string): Promise<string> {
  const prompt = `You are an expert React UI engineer specializing in modern, professional web applications. Generate production-quality code that matches the aesthetic of premium brands like Nike, Apple, Stripe, and Airbnb.

AVAILABLE COMPONENTS:
- Button (variants: primary, secondary, outline, ghost)
- Card (with title, description, footer props)
- Input (with label, placeholder, error states)
- Table (with sortable headers, pagination)
- Modal (with header, body, footer sections)
- Sidebar (collapsible navigation)
- Navbar (responsive with mobile menu)
- Chart (for data visualization)

DESIGN SYSTEM RULES:
1. **Spacing**: Use consistent scale (4, 8, 12, 16, 24, 32, 48, 64px)
   - Sections: p-8 or p-12
   - Card padding: p-6
   - Element gaps: gap-4, gap-6, gap-8
   
2. **Typography Hierarchy**:
   - Hero headings: text-4xl md:text-5xl lg:text-6xl font-bold
   - Section headings: text-2xl md:text-3xl font-semibold
   - Subsections: text-xl font-medium
   - Body: text-base text-gray-700
   - Captions: text-sm text-gray-500

3. **Layout Patterns**:
   - Use max-w-7xl mx-auto for content containers
   - Grid layouts: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
   - Responsive spacing: p-4 md:p-8 lg:p-12
   - Proper white space - avoid cramped designs

4. **Color Usage**:
   - Backgrounds: bg-white, bg-gray-50, bg-gray-900
   - Borders: border-gray-200, border-gray-300
   - Text: text-gray-900 (headings), text-gray-700 (body), text-gray-500 (muted)
   - Accents: Use Button component variants, not custom colors

5. **Professional Patterns**:
   - Hero sections with compelling headlines
   - Feature grids with icons/imagery
   - Clear visual hierarchy
   - Generous white space
   - Subtle shadows: shadow-sm, shadow-md
   - Rounded corners: rounded-lg, rounded-xl
   - Hover states on interactive elements

6. **Constraints**:
   - NO inline styles
   - NO custom CSS classes
   - ONLY use Tailwind utility classes
   - NO arbitrary values like w-[123px]
   - Component imports handled automatically - NO import statements

STRUCTURE GUIDELINES:
- Start with proper semantic HTML (header, main, section, article, footer)
- Create clear visual sections with appropriate spacing
- Use Cards to group related content
- Implement responsive layouts that work on mobile, tablet, desktop
- Add subtle micro-interactions (hover effects via Tailwind)

User Request:
${JSON.stringify(plan, null, 2)}

${existingCode ? `
EXISTING CODE:
${existingCode}

MODIFICATION INSTRUCTIONS:
- Preserve the overall structure and working functionality
- Only update the specific elements requested by the user
- Maintain the existing design language and patterns
- Don't refactor unnecessarily
` : ''}

Generate a single React functional component called "GeneratedUI" with:
- Clean, scannable code structure
- Descriptive class groupings
- Logical component hierarchy
- Professional aesthetic that looks production-ready

OUTPUT FORMAT:
- TypeScript syntax
- NO import statements
- NO markdown code blocks
- Export default function GeneratedUI() { ... }

Example of professional structure:

export default function GeneratedUI() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Brand Name" />
      
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Compelling Headline
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Clear value proposition that explains the benefit.
          </p>
          <div className="flex gap-4">
            <Button variant="primary">Primary Action</Button>
            <Button variant="outline">Secondary Action</Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card title="Feature One">
            <p className="text-gray-600">Description of the feature.</p>
          </Card>
          <Card title="Feature Two">
            <p className="text-gray-600">Description of the feature.</p>
          </Card>
          <Card title="Feature Three">
            <p className="text-gray-600">Description of the feature.</p>
          </Card>
        </div>
      </section>
    </div>
  );
}`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3, // Slightly higher for more creative layouts
    max_tokens: 4000, // Ensure enough space for complete responses
  });

  let code = completion.choices[0]?.message?.content || '';
  
  // Clean up markdown artifacts
  code = code.replace(/```(?:typescript|tsx|jsx|javascript)?\n?/g, '').trim();
  
  return code;
}