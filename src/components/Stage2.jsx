import { useState } from 'react';
import AnswerChoice from './AnswerChoice.jsx';
import { PassageDisplay } from './Stage1.jsx';
import { RULES } from '../data/rules.js';

export default function Stage2({ question, targetRuleId, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const rule = RULES[targetRuleId];

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

  const { stage2choices, explanation } = question;
  const correctChoice = stage2choices.find(c => c.isCorrect);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: '#0f9b58' }}>
        Step 2 of 2 — Apply the Rule
      </p>

      {rule && (
        <div className="text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: '#0f9b5820', color: '#0f9b58' }}>
          <span className="font-mono font-bold">{targetRuleId}</span>: {rule.name}
        </div>
      )}

      <PassageDisplay passage={question.passage} prompt={question.prompt} />

      <div className="flex flex-col gap-2">
        {stage2choices.map(choice => {
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
              {choice.text}
            </AnswerChoice>
          );
        })}
      </div>

      {revealed && !selected?.isCorrect && explanation && (
        <div className="mt-2 bg-navy rounded-xl p-4 flex flex-col gap-2">
          <p className="text-sm font-semibold" style={{ color: '#0f9b58' }}>Correct: {correctChoice?.text}</p>
          <p className="text-sm text-primaryText">{explanation.correct}</p>
          {selected && explanation[selected.letter] && (
            <div className="border-t border-gray-700 pt-2 mt-1">
              <p className="text-xs text-secondaryText">Why {selected.letter} is wrong:</p>
              <p className="text-sm text-primaryText">{explanation[selected.letter]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
