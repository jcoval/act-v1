import { RULE_FREQUENCY, CONFUSION_MATRIX, RULES } from '../data/rules.js';

export function selectNextRule(ruleStats, recentRules = []) {
  const allRules = Object.keys(RULE_FREQUENCY);

  const weights = allRules.map(ruleId => {
    const stats = ruleStats[ruleId] || { identifyTotal: 0, applyTotal: 0, identifyCorrect: 0, applyCorrect: 0 };
    const total = stats.identifyTotal + stats.applyTotal;
    const correct = stats.identifyCorrect + stats.applyCorrect;
    const accuracy = total > 0 ? correct / total : 0.5;

    const baseWeight = RULE_FREQUENCY[ruleId] || 1;
    const performanceMultiplier = 2 - accuracy;
    const recencyPenalty = recentRules.slice(-4).includes(ruleId) ? 0.1 : 1.0;

    return { ruleId, weight: baseWeight * performanceMultiplier * recencyPenalty };
  });

  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  let rand = Math.random() * totalWeight;

  for (const { ruleId, weight } of weights) {
    rand -= weight;
    if (rand <= 0) return ruleId;
  }
  return weights[weights.length - 1].ruleId;
}

export function selectConfusers(targetRuleId, count = 3) {
  const matrix = CONFUSION_MATRIX[targetRuleId] || [];
  const confusers = [...matrix.slice(0, count)];

  if (confusers.length < count) {
    const familyPrefix = targetRuleId[0];
    const sameFamily = Object.keys(RULE_FREQUENCY)
      .filter(r => r[0] === familyPrefix && r !== targetRuleId && !confusers.includes(r));
    confusers.push(...sameFamily.slice(0, count - confusers.length));
  }

  return confusers.slice(0, count);
}
