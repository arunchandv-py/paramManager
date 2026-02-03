export interface Rule {
  object: 'rule';
  id: number;
  code: string;
  name: string;
  domain: string;
  scope: string;
  type: string;
  category: string;
  parents: any[];
  text: string;
  userDescription: string;
}
