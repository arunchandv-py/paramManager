export interface A2UIDescriptor {
  inputType: 'select' | 'number' | 'text' | 'slider';
  constraints: {
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
    pattern?: string;
  };
  interactions: {
    suggestedInteractions: string[];
  };
  validation: {
    rules: any;
    errorMessages: string[];
  };
  contextualHelp: string;
}
