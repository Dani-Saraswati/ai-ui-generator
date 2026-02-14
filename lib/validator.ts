import { ALLOWED_COMPONENTS } from '@/components/ComponentRegistry';

export function validateCode(code: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for inline styles
  if (/style\s*=\s*\{/.test(code)) {
    errors.push('Inline styles are not allowed');
  }

  // Check for forbidden patterns
  if (/<style/.test(code)) {
    errors.push('Custom CSS blocks are not allowed');
  }

  // Check if using only allowed components
  const componentMatches = code.match(/<([A-Z][a-zA-Z]*)/g);
  if (componentMatches) {
    const usedComponents = componentMatches.map(match => match.slice(1));
    const invalidComponents = usedComponents.filter(
      comp => !ALLOWED_COMPONENTS.includes(comp)
    );
    
    if (invalidComponents.length > 0) {
      errors.push(`Invalid components used: ${invalidComponents.join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}