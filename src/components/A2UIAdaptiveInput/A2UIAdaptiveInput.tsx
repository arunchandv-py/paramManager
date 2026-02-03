import React, { useState, useEffect } from 'react';
import { Rule } from '../../@types/Rule';
import { ParameterDefinition } from '../../@types/ParameterDefinition';
import { A2UIDescriptor } from '../../@types/A2UIDescriptor';
import { generateA2UIDescriptor } from '../../services/a2ui-service';

interface A2UIAdaptiveInputProps {
  rule: Rule;
  parameter: ParameterDefinition;
  onParameterConfigured: (config: any) => void;
}

export function A2UIAdaptiveInput({ 
  rule, 
  parameter, 
  onParameterConfigured 
}: A2UIAdaptiveInputProps) {
  const [uiDescriptor, setUIDescriptor] = useState<A2UIDescriptor | null>(null);
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    const fetchDescriptor = async () => {
      const descriptor = await generateA2UIDescriptor(rule, parameter);
      setUIDescriptor(descriptor);
    };

    fetchDescriptor();
  }, [rule, parameter]);

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
    onParameterConfigured(newValue);
  };

  const renderInput = () => {
    if (!uiDescriptor) return <div>Loading...</div>;

    switch (uiDescriptor.inputType) {
      case 'select':
        return (
          <select 
            value={value || ''}
            onChange={(e) => handleValueChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {uiDescriptor.constraints.options?.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input 
            type="number"
            value={value || ''}
            min={uiDescriptor.constraints.min}
            max={uiDescriptor.constraints.max}
            onChange={(e) => handleValueChange(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        );
      
      default:
        return (
          <input 
            type="text"
            value={value || ''}
            onChange={(e) => handleValueChange(e.target.value)}
            className="w-full p-2 border rounded"
          />
        );
    }
  };

  return (
    <div>
      {renderInput()}
      {uiDescriptor?.contextualHelp && (
        <div className="text-sm text-gray-600 mt-2">
          {uiDescriptor.contextualHelp}
        </div>
      )}
    </div>
  );
}
