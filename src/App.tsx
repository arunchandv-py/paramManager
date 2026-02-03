import React, { useState } from 'react';
import { A2UIAdaptiveInput } from './components/A2UIAdaptiveInput/A2UIAdaptiveInput';
import { extractAndMapParameters } from './utils/parameter-mapper';

function App() {
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [configuredRules, setConfiguredRules] = useState<any[]>([]);

  // Mock rule data for demonstration
  const ruleData = [
    {
      id: 1,
      name: 'Sample Rule',
      userDescription: 'A sample rule with [parameter1] and [parameter2]',
      text: 'Rule text with ~SampleParameter'
    }
  ];

  const handleRuleConfiguration = (ruleName: string, paramName: string, value: any) => {
    const existingRuleIndex = configuredRules.findIndex(
      rule => rule.name === ruleName
    );

    if (existingRuleIndex !== -1) {
      const updatedRules = [...configuredRules];
      updatedRules[existingRuleIndex].parameters[paramName] = value;
      setConfiguredRules(updatedRules);
    } else {
      setConfiguredRules([
        ...configuredRules, 
        { 
          name: ruleName, 
          parameters: { [paramName]: value } 
        }
      ]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Crew Pairing Rule Configurator
      </h1>

      <div className="flex">
        <div className="w-1/3 pr-4">
          <h2 className="text-xl font-semibold mb-2">Rules</h2>
          <div className="space-y-2">
            {ruleData.map(rule => (
              <button
                key={rule.id}
                onClick={() => setSelectedRule(rule)}
                className="w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                {rule.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-2/3">
          {selectedRule && (
            <div className="bg-white shadow-md rounded p-4">
              <h2 className="text-2xl font-bold mb-4">{selectedRule.name}</h2>
              <p className="mb-4">{selectedRule.userDescription}</p>

              {extractAndMapParameters(selectedRule).map(param => (
                <div key={param.name} className="mb-4">
                  <label className="block mb-2 font-semibold">{param.name}</label>
                  <A2UIAdaptiveInput 
                    rule={selectedRule}
                    parameter={param}
                    onParameterConfigured={(value) => 
                      handleRuleConfiguration(selectedRule.name, param.name, value)
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {configuredRules.length > 0 && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <h3 className="text-xl font-semibold mb-2">
                Configured Rules
              </h3>
              <pre>{JSON.stringify(configuredRules, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
