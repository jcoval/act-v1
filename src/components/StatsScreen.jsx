import { loadHistory } from '../hooks/useStats.js';
import { RULES, FAMILY_COLORS } from '../data/rules.js';

export default function StatsScreen({ ruleStats, onBack }) {
  const history = loadHistory();

  const families = {};
  Object.entries(RULES).forEach(([id, rule]) => {
    if (!families[rule.family]) families[rule.family] = [];
    families[rule.family].push(id);
  });

  return (
    <div className="min-h-dvh bg-navy flex flex-col" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="px-4 flex items-center gap-3 mb-4" style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}>
        <button onClick={onBack} className="text-secondaryText text-2xl w-10 h-10 flex items-center justify-center rounded-full active:bg-surface">←</button>
        <h1 className="text-xl font-bold">Stats</h1>
      </div>

      <div className="overflow-y-auto px-4 pb-8 flex flex-col gap-6">
        {Object.entries(families).map(([family, ids]) => (
          <div key={family}>
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: FAMILY_COLORS[family] }}>{family}</h2>
            <div className="flex flex-col gap-2">
              {ids.map(id => {
                const s = ruleStats[id] || {};
                const idAcc = s.identifyTotal > 0 ? s.identifyCorrect / s.identifyTotal : null;
                const apAcc = s.applyTotal > 0 ? s.applyCorrect / s.applyTotal : null;
                return (
                  <div key={id} className="bg-surface rounded-xl p-3 flex items-center gap-3">
                    <span className="font-mono text-sm w-8 flex-shrink-0" style={{ color: FAMILY_COLORS[family] }}>{id}</span>
                    <span className="flex-1 text-sm text-primaryText">{RULES[id]?.name}</span>
                    <div className="flex gap-2 text-xs">
                      <Pill label="ID" value={idAcc} />
                      <Pill label="AP" value={apAcc} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {history.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide text-secondaryText">Session History</h2>
            <div className="flex flex-col gap-2">
              {[...history].reverse().slice(0, 10).map((s, i) => (
                <div key={i} className="bg-surface rounded-xl p-3 flex items-center justify-between">
                  <span className="text-sm text-secondaryText">{s.date}</span>
                  <span className="text-sm">ID: {Math.round(s.identifyAccuracy * 100)}% · AP: {Math.round(s.applyAccuracy * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ label, value }) {
  const color = value === null ? '#8892b0' : value >= 0.7 ? '#0f9b58' : '#e94560';
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: color + '33', color }}>
      {label} {value !== null ? `${Math.round(value * 100)}%` : '—'}
    </span>
  );
}
