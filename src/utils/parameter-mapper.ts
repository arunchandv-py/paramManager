import { Rule } from '../@types/Rule';
import { ParameterDefinition } from '../@types/ParameterDefinition';

export function extractAndMapParameters(rule: Rule): ParameterDefinition[] {
  const paramRegex = /\[([^[\]]+)\]/g;
  const tildeParamRegex = /~([a-zA-Z]+)/g;
  const paramNames = new Set<string>();
  
  const searchTexts = [rule.userDescription, rule.text];
  
  searchTexts.forEach(text => {
    let match;
    while ((match = paramRegex.exec(text)) !== null) {
      paramNames.add(match[1]);
    }
    
    while ((match = tildeParamRegex.exec(text)) !== null) {
      paramNames.add(match[1]);
    }
  });

  return Array.from(paramNames).map(paramName => ({
    name: paramName,
    type: 'scalar',
    details: null
  }));
}
