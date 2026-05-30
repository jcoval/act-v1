import { useState } from 'react';
import AnswerChoice from './AnswerChoice.jsx';
import { RULES } from '../data/rules.js';

export default function Stage1({ question, targetRuleId, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  function handleSelect(choice) {
    if (revealed) return;
    setSelected(choice);
    setRevealed(true);
    if (choice.isCorrect) {
      setTimeout(() => onCorrect(), 600);
    } else {
      onWrong(choice);
    }
  }

  const { stage1choices } = question;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: '#4fc3f7' }}>
        Step 1 of 2 — Identify the Rule
      </p>

      <PassageDisplay passage={question.passage} prompt={question.prompt} />

      <p className="text-base font-medium mt-2 mb-1">Which rule is being tested?</p>

      <div className="flex flex-col gap-2">
        {stage1choices.map(choice => {
          let state = 'default';
          if (revealed) {
            if (choice.isCorrect) state = 'correct';
            else if (selected?.letter === choice.letter) state = 'wrong';
            else state = 'neutral';
          }
          return (
            <AnswerChoice
              key={choice.letter}
              letter={choice.letter}
              state={state}
              onClick={() => handleSelect(choice)}
              disabled={revealed}
            >
              <span className="font-mono text-xs mr-1" style={{ color: '#8892b0' }}>{choice.ruleId}</span>
              {' '}{choice.ruleName}
            </AnswerChoice>
          );
        })}
      </div>
    </div>
  );
}

export function PassageDisplay({ passage, prompt }) {
  if (!passage) return null;

  const parts = passage.split(/(\[U\].*?\[\/U\])/g);

  return (
    <div className="bg-navy rounded-xl p-4 text-base leading-relaxed text-primaryText">
      {parts.map((part, i) => {
        const match = part.match(/^\[U\](.*?)\[\/U\]$/);
        if (match) {
          return (
            <span key={i} className="underline decoration-2 decoration-blue-400 font-medium">
              {match[1]}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
      {prompt && <p className="mt-3 font-medium text-secondaryText">{prompt}</p>}
    </div>
  );
}
