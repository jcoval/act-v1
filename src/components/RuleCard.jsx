import { RULES, FAMILY_COLORS } from '../data/rules.js';

export default function RuleCard({ ruleId, exampleText, identifyAccuracy, applyAccuracy, onNext }) {
  const rule = RULES[ruleId];
  if (!rule) return null;

  const color = FAMILY_COLORS[rule.family] || '#eaeaea';
  const idPct = identifyAccuracy !== null ? Math.round(identifyAccuracy * 100) : null;
  const apPct = applyAccuracy !== null ? Math.round(applyAccuracy * 100) : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-surface rounded-t-3xl p-6 pb-safe" style={{ paddingBottom: `calc(1.5rem + env(safe-area-inset-bottom))` }}>
        <div className="w-12 h-1 rounded-full bg-gray-600 mx-auto mb-5" />

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-sm font-bold px-2 py-0.5 rounded" style={{ backgroundColor: color + '33', color }}>
            {ruleId}
          </span>
          <span className="font-bold text-lg text-primaryText">{rule.name}</span>
        </div>

        <p className="text-secondaryText text-base mb-4 leading-relaxed">{rule.card}</p>

        {exampleText && (
          <div className="bg-navy rounded-xl p-3 mb-4 border-l-4" style={{ borderColor: color }}>
            <p className="text-xs text-secondaryText mb-1">From this question:</p>
            <p className="text-sm text-primaryText italic">{exampleText}</p>
          </div>
        )}

        <div className="flex gap-4 mb-5">
          <div className="flex-1 bg-navy rounded-xl p-3 text-center">
            <div className="text-xs text-secondaryText mb-1">Identify</div>
            <div className="text-xl font-bold" style={{ color: idPct === null ? '#8892b0' : idPct >= 70 ? '#0f9b58' : '#e94560' }}>
              {idPct !== null ? `${idPct}%` : '—'}
            </div>
          </div>
          <div className="flex-1 bg-navy rounded-xl p-3 text-center">
            <div className="text-xs text-secondaryText mb-1">Apply</div>
            <div className="text-xl font-bold" style={{ color: apPct === null ? '#8892b0' : apPct >= 70 ? '#0f9b58' : '#e94560' }}>
              {apPct !== null ? `${apPct}%` : '—'}
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white"
          style={{ backgroundColor: '#4fc3f7', minHeight: '56px' }}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}
