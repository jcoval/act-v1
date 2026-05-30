import { useState, useCallback, useRef } from 'react';
import { selectNextRule, selectConfusers } from '../utils/adaptive.js';
import { generateQuestion } from '../api/claude.js';

export function useSession(ruleStats, sessionLength = 10) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState('loading'); // 'loading' | 'stage1' | 'stage2' | 'rulecard' | 'done'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [recentRules, setRecentRules] = useState([]);
  const [sessionResults, setSessionResults] = useState([]);
  const prefetchedRef = useRef(null);
  const prefetchingRef = useRef(false);

  const fetchQuestion = useCallback(async (ruleId, confuserIds, qNum) => {
    return generateQuestion(ruleId, confuserIds, qNum);
  }, []);

  const prefetchNext = useCallback(async (nextIndex, nextRecentRules) => {
    if (nextIndex >= sessionLength) return;
    if (prefetchingRef.current) return;
    prefetchingRef.current = true;
    try {
      const ruleId = selectNextRule(ruleStats, nextRecentRules);
      const confuserIds = selectConfusers(ruleId);
      const q = await fetchQuestion(ruleId, confuserIds, nextIndex + 1);
      prefetchedRef.current = { ruleId, confuserIds, question: q, index: nextIndex };
    } catch {
      prefetchedRef.current = null;
    }
    prefetchingRef.current = false;
  }, [ruleStats, sessionLength, fetchQuestion]);

  const startSession = useCallback(async () => {
    setQuestions([]);
    setCurrentIndex(0);
    setStage('loading');
    setSelectedAnswer(null);
    setIsCorrect(null);
    setRecentRules([]);
    setSessionResults([]);
    prefetchedRef.current = null;

    const ruleId = selectNextRule(ruleStats, []);
    const confuserIds = selectConfusers(ruleId);
    try {
      const q = await fetchQuestion(ruleId, confuserIds, 1);
      setQuestions([{ ruleId, confuserIds, question: q }]);
      setStage('stage1');
      prefetchNext(1, [ruleId]);
    } catch (err) {
      setStage('error');
    }
  }, [ruleStats, fetchQuestion, prefetchNext]);

  const advanceToNextQuestion = useCallback(async (results) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= sessionLength) {
      setSessionResults(results);
      setStage('done');
      return;
    }

    setStage('loading');
    setSelectedAnswer(null);
    setIsCorrect(null);

    let nextQ;
    if (prefetchedRef.current && prefetchedRef.current.index === nextIndex) {
      nextQ = prefetchedRef.current;
      prefetchedRef.current = null;
    } else {
      const ruleId = selectNextRule(ruleStats, recentRules);
      const confuserIds = selectConfusers(ruleId);
      try {
        const q = await fetchQuestion(ruleId, confuserIds, nextIndex + 1);
        nextQ = { ruleId, confuserIds, question: q, index: nextIndex };
      } catch {
        setStage('error');
        return;
      }
    }

    const newRecentRules = [...recentRules, nextQ.ruleId];
    setRecentRules(newRecentRules);
    setQuestions(prev => [...prev, { ruleId: nextQ.ruleId, confuserIds: nextQ.confuserIds, question: nextQ.question }]);
    setCurrentIndex(nextIndex);
    setStage('stage1');
    prefetchNext(nextIndex + 1, newRecentRules);
  }, [currentIndex, sessionLength, ruleStats, recentRules, fetchQuestion, prefetchNext]);

  return {
    questions,
    currentIndex,
    stage,
    setStage,
    selectedAnswer,
    setSelectedAnswer,
    isCorrect,
    setIsCorrect,
    sessionResults,
    setSessionResults,
    startSession,
    advanceToNextQuestion,
    recentRules,
    setRecentRules,
  };
}
