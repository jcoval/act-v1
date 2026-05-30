import { useState, useCallback } from 'react';
import { RULES } from '../data/rules.js';

const STATS_KEY = 'act_rule_stats';
const HISTORY_KEY = 'act_session_history';
const STREAK_KEY = 'act_streak';

function storageAvailable() {
  try {
    localStorage.setItem('__test__', '1');
    localStorage.removeItem('__test__');
    return true;
  } catch {
    return false;
  }
}

const storageOk = storageAvailable();

function loadStats() {
  if (!storageOk) return initStats();
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : initStats();
  } catch {
    return initStats();
  }
}

function initStats() {
  const stats = {};
  Object.keys(RULES).forEach(id => {
    stats[id] = { identifyCorrect: 0, identifyTotal: 0, applyCorrect: 0, applyTotal: 0 };
  });
  return stats;
}

function saveStats(stats) {
  if (!storageOk) return;
  try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch {}
}

export function loadHistory() {
  if (!storageOk) return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveHistory(entry) {
  if (!storageOk) return;
  try {
    const history = loadHistory();
    history.push(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-50)));
  } catch {}
}

export function loadStreak() {
  if (!storageOk) return { currentStreak: 0, lastSessionDate: null, longestStreak: 0 };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : { currentStreak: 0, lastSessionDate: null, longestStreak: 0 };
  } catch { return { currentStreak: 0, lastSessionDate: null, longestStreak: 0 }; }
}

export function updateStreak() {
  if (!storageOk) return;
  try {
    const streak = loadStreak();
    const today = new Date().toISOString().slice(0, 10);
    if (streak.lastSessionDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const newStreak = streak.lastSessionDate === yesterday ? streak.currentStreak + 1 : 1;
    const updated = {
      currentStreak: newStreak,
      lastSessionDate: today,
      longestStreak: Math.max(newStreak, streak.longestStreak),
    };
    localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  } catch {}
}

export function useStats() {
  const [ruleStats, setRuleStats] = useState(loadStats);
  const storageWarning = !storageOk;

  const recordIdentify = useCallback((ruleId, correct) => {
    setRuleStats(prev => {
      const next = { ...prev, [ruleId]: { ...prev[ruleId] } };
      next[ruleId].identifyTotal += 1;
      if (correct) next[ruleId].identifyCorrect += 1;
      saveStats(next);
      return next;
    });
  }, []);

  const recordApply = useCallback((ruleId, correct) => {
    setRuleStats(prev => {
      const next = { ...prev, [ruleId]: { ...prev[ruleId] } };
      next[ruleId].applyTotal += 1;
      if (correct) next[ruleId].applyCorrect += 1;
      saveStats(next);
      return next;
    });
  }, []);

  const resetStats = useCallback(() => {
    const fresh = initStats();
    saveStats(fresh);
    setRuleStats(fresh);
  }, []);

  return { ruleStats, recordIdentify, recordApply, resetStats, storageWarning };
}
