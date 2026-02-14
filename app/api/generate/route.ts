import { NextRequest, NextResponse } from 'next/server';
import { planUI } from '@/lib/agents/planner';
import { generateCode } from '@/lib/agents/generator';
import { explainChanges } from '@/lib/agents/explainer';
import { validateCode } from '@/lib/validator';

export async function POST(request: NextRequest) {
  try {
    const { message, existingCode } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Step 1: Plan
    console.log('🧠 Planning UI...');
    const plan = await planUI(message, existingCode);

    // Step 2: Generate
    console.log('⚙️ Generating code...');
    const code = await generateCode(plan, existingCode);

    // Step 3: Validate
    console.log('✅ Validating code...');
    const validation = validateCode(code);
    
    if (!validation.valid) {
      return NextResponse.json({ 
        error: 'Generated code failed validation',
        details: validation.errors 
      }, { status: 400 });
    }

    // Step 4: Explain
    console.log('📝 Explaining changes...');
    const explanation = await explainChanges(message, existingCode, code);

    return NextResponse.json({
      code,
      plan,
      explanation,
      success: true,
    });

  } catch (error: any) {
    console.error('Generation error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to generate UI'
    }, { status: 500 });
  }
}