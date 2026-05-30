import { useState } from 'react';
import { RULES, FAMILY_COLORS } from '../data/rules.js';

export default function RuleBookScreen({ onBack }) {
  const [expanded, setExpanded] = useState(null);

  const families = {};
  Object.entries(RULES).forEach(([id, rule]) => {
    if (!families[rule.family]) families[rule.family] = [];
    families[rule.family].push({ id, ...rule });
  });

  return (
    <div className="min-h-dvh bg-navy flex flex-col" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="px-4 flex items-center gap-3 mb-4" style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}>
        <button onClick={onBack} className="text-secondaryText text-2xl w-10 h-10 flex items-center justify-center rounded-full active:bg-surface">←</button>
        <div>
          <h1 className="text-xl font-bold">Rule Book</h1>
          <p className="text-xs text-secondaryText">Tap any rule to expand</p>
        </div>
      </div>

      <div className="overflow-y-auto px-4 pb-8 flex flex-col gap-6">
        {Object.entries(families).map(([family, rules]) => {
          const color = FAMILY_COLORS[family];
          return (
            <div key={family}>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 rounded" style={{ backgroundColor: color + '60' }} />
                <h2 className="text-sm font-bold uppercase tracking-widest px-2" style={{ color }}>{family}</h2>
                <div className="h-px flex-1 rounded" style={{ backgroundColor: color + '60' }} />
              </div>
              <div className="flex flex-col gap-2">
                {rules.map(rule => {
                  const isOpen = expanded === rule.id;
                  return (
                    <button
                      key={rule.id}
                      onClick={() => setExpanded(isOpen ? null : rule.id)}
                      className="w-full text-left bg-surface rounded-2xl overflow-hidden transition-all"
                      style={{ border: isOpen ? `1px solid ${color}60` : '1px solid transparent' }}
                    >
                      <div className="flex items-center gap-3 px-4 py-3">
                        <span className="font-mono text-sm font-bold w-8 flex-shrink-0" style={{ color }}>{rule.id}</span>
                        <span className="flex-1 text-base font-medium text-primaryText">{rule.name}</span>
                        <span className="text-secondaryText text-lg">{isOpen ? '▲' : '▼'}</span>
                      </div>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <div className="h-px mb-3" style={{ backgroundColor: color + '30' }} />
                          <p className="text-secondaryText text-sm leading-relaxed">{rule.card}</p>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
