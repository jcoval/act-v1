import { useState, useEffect } from 'react';
import { useSession } from '../hooks/useSession.js';
import { useStats } from '../hooks/useStats.js';
import Stage1 from './Stage1.jsx';
import Stage2 from './Stage2.jsx';
import RuleCard from './RuleCard.jsx';
import ProgressBar from './ProgressBar.jsx';
import { RULES } from '../data/rules.js';

export default function SessionScreen({ sessionLength, ruleStats, recordIdentify, recordApply, onSessionEnd }) {
  const {
    questions, currentIndex, stage, setStage,
    sessionResults, setSessionResults,
    startSession, advanceToNextQuestion, recentRules, setRecentRules,
  } = useSession(ruleStats, sessionLength);

  const [stage1Wrong, setStage1Wrong] = useState(false);
  const [stage1WrongChoice, setStage1WrongChoice] = useState(null);
  const [localResults, setLocalResults] = useState([]);
  const [identifyCorrectThisQ, setIdentifyCorrectThisQ] = useState(null);

  useEffect(() => { startSession(); }, []);

  const current = questions[currentIndex];
  const targetRuleId = current?.ruleId;
  const question = current?.question;

  function handleStage1Correct() {
    recordIdentify(targetRuleId, true);
    setIdentifyCorrectThisQ(true);
    setStage1Wrong(false);
    setStage('stage2');
  }

  function handleStage1Wrong(choice) {
    recordIdentify(targetRuleId, false);
    setIdentifyCorrectThisQ(false);
    setStage1Wrong(true);
    setStage1WrongChoice(choice);
  }

  function handleStage1Retry() {
    setStage1Wrong(false);
    setStage('stage2');
  }

  function handleStage2Correct() {
    recordApply(targetRuleId, true);
    const result = { ruleId: targetRuleId, identifyCorrect: identifyCorrectThisQ, applyCorrect: true };
    setLocalResults(prev => [...prev, result]);
    setStage('rulecard');
  }

  function handleStage2Wrong(choice) {
    recordApply(targetRuleId, false);
    const result = { ruleId: targetRuleId, identifyCorrect: identifyCorrectThisQ, applyCorrect: false };
    setLocalResults(prev => [...prev, result]);
    setStage('rulecard');
  }

  function handleRuleCardNext() {
    setStage('loading');
    advanceToNextQuestion(localResults);
  }

  const stats = ruleStats[targetRuleId] || {};
  const idAcc = stats.identifyTotal > 0 ? stats.identifyCorrect / stats.identifyTotal : null;
  const apAcc = stats.applyTotal > 0 ? stats.applyCorrect / stats.applyTotal : null;

  return (
    <div className="min-h-dvh flex flex-col bg-navy" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Header */}
      <div className="px-4 pt-safe pb-2 flex items-center gap-3" style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}>
        <button onClick={onSessionEnd} className="text-secondaryText text-2xl w-10 h-10 flex items-center justify-center rounded-full active:bg-surface">
          ←
        </button>
        <div className="flex-1">
          <ProgressBar current={currentIndex} total={sessionLength} />
        </div>
        <span className="text-sm text-secondaryText">{currentIndex + 1}/{sessionLength}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {stage === 'loading' && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-secondaryText text-sm">Generating question…</p>
          </div>
        )}

        {stage === 'error' && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="text-accent text-center">Couldn't generate question</p>
            <button
              onClick={startSession}
              className="px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: '#4fc3f7' }}
            >
              Tap to retry
            </button>
          </div>
        )}

        {stage === 'stage1' && question && !stage1Wrong && (
          <Stage1
            question={question}
            targetRuleId={targetRuleId}
            onCorrect={handleStage1Correct}
            onWrong={handleStage1Wrong}
          />
        )}

        {stage === 'stage1' && stage1Wrong && question && (
          <div className="flex flex-col gap-4">
            <div className="bg-accent/10 border border-accent rounded-xl p-4">
              <p className="text-accent font-bold mb-1">Not quite</p>
              <p className="text-sm text-primaryText">
                The correct rule is <span className="font-mono font-bold">{targetRuleId}</span>: {RULES[targetRuleId]?.name}
              </p>
              <p className="text-sm text-secondaryText mt-1">{RULES[targetRuleId]?.card}</p>
            </div>
            <button
              onClick={handleStage1Retry}
              className="w-full py-4 rounded-2xl font-bold text-white"
              style={{ backgroundColor: '#4fc3f7', minHeight: '56px' }}
            >
              Got it — Try Stage 2
            </button>
          </div>
        )}

        {stage === 'stage2' && question && (
          <Stage2
            question={question}
            targetRuleId={targetRuleId}
            onCorrect={handleStage2Correct}
            onWrong={handleStage2Wrong}
          />
        )}
      </div>

      {stage === 'rulecard' && question && (
        <RuleCard
          ruleId={targetRuleId}
          exampleText={question.passage?.replace(/\[U\]|\[\/U\]/g, '')}
          identifyAccuracy={idAcc}
          applyAccuracy={apAcc}
          onNext={handleRuleCardNext}
        />
      )}

      {stage === 'done' && (
        <SessionSummary results={localResults} sessionLength={sessionLength} onDone={onSessionEnd} />
      )}
    </div>
  );
}

function SessionSummary({ results, sessionLength, onDone }) {
  const total = results.length;
  const idCorrect = results.filter(r => r.identifyCorrect).length;
  const apCorrect = results.filter(r => r.applyCorrect).length;
  const idAcc = total > 0 ? idCorrect / total : 0;
  const apAcc = total > 0 ? apCorrect / total : 0;
  const overallAcc = total > 0 ? (idCorrect + apCorrect) / (total * 2) : 0;

  const ruleCounts = {};
  results.forEach(r => {
    if (!ruleCounts[r.ruleId]) ruleCounts[r.ruleId] = { id: 0, ap: 0, idT: 0, apT: 0 };
    ruleCounts[r.ruleId].idT++;
    ruleCounts[r.ruleId].apT++;
    if (r.identifyCorrect) ruleCounts[r.ruleId].id++;
    if (r.applyCorrect) ruleCounts[r.ruleId].ap++;
  });

  const weakest = Object.entries(ruleCounts).sort((a, b) => {
    const accA = (a[1].id + a[1].ap) / (a[1].idT + a[1].apT);
    const accB = (b[1].id + b[1].ap) / (b[1].idT + b[1].apT);
    return accA - accB;
  })[0];

  useEffect(() => {
    if (overallAcc > 0.8) {
      import('canvas-confetti').then(m => m.default({ particleCount: 100, spread: 70, origin: { y: 0.6 } }));
    }
  }, []);

  return (
    <div className="min-h-dvh bg-navy flex flex-col px-4 py-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
      <h1 className="text-2xl font-bold mb-6 text-center">Session Complete!</h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatBox label="Identify" value={`${Math.round(idAcc * 100)}%`} color={idAcc >= 0.7 ? '#0f9b58' : '#e94560'} />
        <StatBox label="Apply" value={`${Math.round(apAcc * 100)}%`} color={apAcc >= 0.7 ? '#0f9b58' : '#e94560'} />
      </div>

      {weakest && (
        <div className="bg-surface rounded-xl p-4 mb-6">
          <p className="text-xs text-secondaryText mb-1">Focus next time:</p>
          <p className="font-bold"><span className="font-mono text-blue-400">{weakest[0]}</span> — {RULES[weakest[0]]?.name}</p>
        </div>
      )}

      <div className="flex flex-col gap-2 mb-6">
        {results.map((r, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="font-mono text-secondaryText w-8">{r.ruleId}</span>
            <span className="flex-1 text-primaryText">{RULES[r.ruleId]?.name}</span>
            <span style={{ color: r.identifyCorrect ? '#0f9b58' : '#e94560' }}>ID</span>
            <span style={{ color: r.applyCorrect ? '#0f9b58' : '#e94560' }}>AP</span>
          </div>
        ))}
      </div>

      <button
        onClick={onDone}
        className="w-full py-4 rounded-2xl font-bold text-white text-lg"
        style={{ backgroundColor: '#4fc3f7' }}
      >
        Back to Home
      </button>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className="bg-surface rounded-xl p-4 text-center">
      <div className="text-sm text-secondaryText mb-1">{label}</div>
      <div className="text-3xl font-bold" style={{ color }}>{value}</div>
    </div>
  );
}
