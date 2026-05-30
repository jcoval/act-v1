import { RULES } from '../data/rules.js';

const SYSTEM_PROMPT = `You are an expert ACT English question writer. Generate original ACT-style English questions.
You will be given a target rule to test and 3 distractor rules for wrong answers.
Return ONLY a valid JSON object — no markdown, no preamble, no explanation.

The passage must be original (not from any real ACT test), 2-5 sentences, in ACT style (informational, narrative, or persuasive), on any interesting topic.

For grammar/punctuation questions: embed the underlined portion using [U] and [/U] markers.
For rhetoric questions (rules starting with R): write a passage without underlines, and include a "prompt" field with the question stem.

When the correct answer is NO CHANGE: design the underlined portion so that a small, obvious modification (e.g. removing a comma, changing a word) would clearly violate the target rule. This ensures Stage 1 (rule identification) has an unambiguous answer even when the original text is already correct.

The JSON must exactly match this schema — no extra fields:
{
  "passage": "string with [U]underlined[/U] portion marked, or plain passage for rhetoric",
  "prompt": "string for rhetoric question stem, or null for grammar questions",
  "stage1choices": [
    {"letter": "A", "ruleId": "...", "ruleName": "...", "isCorrect": true}
  ],
  "stage2choices": [
    {"letter": "A", "text": "...", "isCorrect": true, "ruleId": "..."}
  ],
  "explanation": {
    "correct": "Why the correct answer is right, referencing the specific rule.",
    "B": "Why B is wrong.",
    "C": "Why C is wrong.",
    "D": "Why D is wrong."
  }
}

stage1choices: exactly 4 items, exactly one isCorrect true.
stage2choices: exactly 4 items, exactly one isCorrect true. Use NO CHANGE as option A when appropriate.`;

export async function generateQuestion(targetRuleId, confuserIds, questionNumber = 1) {
  const targetRule = RULES[targetRuleId];
  if (!targetRule) throw new Error(`Unknown rule: ${targetRuleId}`);

  const letters = questionNumber % 2 === 1 ? ['A', 'B', 'C', 'D'] : ['F', 'G', 'H', 'J'];

  const confuserLines = confuserIds.map(id => {
    const r = RULES[id];
    return r ? `- ${id}: ${r.name}` : `- ${id}: (unknown rule)`;
  }).join('\n');

  const userMessage = `Target rule to test: ${targetRuleId} — ${targetRule.name}
Rule description: ${targetRule.card}

Distractor rules for wrong answers:
${confuserLines}

Generate one complete ACT English question testing ${targetRule.name}.
Use these letters for stage2choices: ${letters.join(', ')}.`;

  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt: SYSTEM_PROMPT, userMessage }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || 'API request failed');
  }

  const data = await response.json();
  if (data.error) throw new Error(data.error);

  let parsed;
  try {
    parsed = JSON.parse(data.text);
  } catch {
    throw new Error('Malformed JSON from API');
  }

  if (!parsed.passage || !parsed.stage1choices || !parsed.stage2choices) {
    throw new Error('Incomplete question data from API');
  }

  return parsed;
}
