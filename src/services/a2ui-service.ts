import { Rule } from '../@types/Rule';
import { ParameterDefinition } from '../@types/ParameterDefinition';
import { A2UIDescriptor } from '../@types/A2UIDescriptor';

export async function generateA2UIDescriptor(
  rule: Rule, 
  parameter: ParameterDefinition
): Promise<A2UIDescriptor> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.REACT_APP_CLAUDE_API_KEY || ''
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 500,
        messages: [{
          role: "user",
          content: `Generate A2UI descriptor for crew scheduling parameter

          Rule: ${rule.name}
          Parameter: ${parameter.name}
          Type: ${parameter.type}
          Base Type: ${parameter.details?.basename}

          Provide A2UI JSON descriptor`
        }]
      })
    });
    
    const data = await response.json();
    return JSON.parse(data.content[0].text);
  } catch (error) {
    console.error('A2UI Descriptor Generation Error:', error);
    return {
      inputType: 'text',
      constraints: {},
      interactions: { suggestedInteractions: [] },
      validation: { rules: {}, errorMessages: [] },
      contextualHelp: 'Unable to generate dynamic input'
    };
  }
}
