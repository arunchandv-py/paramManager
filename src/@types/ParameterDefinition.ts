export interface ParameterDefinition {
  name: string;
  type: 'scalar' | 'dict' | 'list';
  details: any;
}
