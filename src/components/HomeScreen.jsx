import { useState, useEffect } from 'react';
import { loadStreak } from '../hooks/useStats.js';
import { RULES, FAMILY_COLORS } from '../data/rules.js';

export default function HomeScreen({ ruleStats, onStartSession, onStats, onSettings, onRuleBook }) {
  const streak = loadStreak();

  return (
    <div className="min-h-dvh bg-navy flex flex-col px-4" style={{ paddingTop: 'calc(2rem + env(safe-area-inset-top))', paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primaryText">ACT English</h1>
          <p className="text-secondaryText text-sm">Prep</p>
        </div>
        <button
          onClick={onSettings}
          className="w-10 h-10 flex items-center justify-center rounded-full text-secondaryText active:bg-surface text-xl"
        >
          ⚙
        </button>
      </div>

      {/* Streak */}
      <div className="bg-surface rounded-2xl p-4 mb-4 flex items-center gap-4">
        <div className="text-4xl">🔥</div>
        <div>
          <div className="text-3xl font-bold text-primaryText">{streak.currentStreak}</div>
          <div className="text-sm text-secondaryText">day streak · best {streak.longestStreak}</div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-surface rounded-2xl p-4 mb-6">
        <h2 className="text-sm font-semibold text-secondaryText mb-3 uppercase tracking-wide">Rule Accuracy</h2>
        <HeatMap ruleStats={ruleStats} />
      </div>

      {/* Buttons */}
      <button
        onClick={onStartSession}
        className="w-full py-5 rounded-2xl font-bold text-xl text-white mb-3"
        style={{ backgroundColor: '#4fc3f7', minHeight: '64px' }}
      >
        Start Session
      </button>

      <div className="flex gap-3">
        <button
          onClick={onStats}
          className="flex-1 py-4 rounded-2xl font-semibold text-primaryText"
          style={{ backgroundColor: '#16213e', border: '1px solid #2d3748', minHeight: '56px' }}
        >
          View Stats
        </button>
        <button
          onClick={onRuleBook}
          className="flex-1 py-4 rounded-2xl font-semibold text-primaryText"
          style={{ backgroundColor: '#16213e', border: '1px solid #2d3748', minHeight: '56px' }}
        >
          📖 Rule Book
        </button>
      </div>
    </div>
  );
}

function HeatMap({ ruleStats }) {
  const families = {};
  Object.entries(RULES).forEach(([id, rule]) => {
    if (!families[rule.family]) families[rule.family] = [];
    families[rule.family].push(id);
  });

  return (
    <div className="flex flex-col gap-3">
      {Object.entries(families).map(([family, ids]) => (
        <div key={family}>
          <p className="text-xs text-secondaryText mb-1.5" style={{ color: FAMILY_COLORS[family] }}>{family}</p>
          <div className="flex flex-wrap gap-1.5">
            {ids.map(id => {
              const s = ruleStats[id] || {};
              const total = (s.identifyTotal || 0) + (s.applyTotal || 0);
              const correct = (s.identifyCorrect || 0) + (s.applyCorrect || 0);
              const acc = total > 0 ? correct / total : null;
              const bg = acc === null ? '#2d3748' : acc >= 0.8 ? '#0f9b58' : acc >= 0.5 ? '#f59e0b' : '#e94560';
              return (
                <div key={id} className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: bg + '80', border: `1px solid ${bg}` }}>
                  <span className="text-xs font-mono font-bold" style={{ color: bg === '#2d3748' ? '#8892b0' : '#eaeaea' }}>{id}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
