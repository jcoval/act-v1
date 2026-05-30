import { useState } from 'react';
import { useStats, updateStreak, saveHistory } from './hooks/useStats.js';
import { loadSettings } from './components/SettingsScreen.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import SessionScreen from './components/SessionScreen.jsx';
import StatsScreen from './components/StatsScreen.jsx';
import SettingsScreen from './components/SettingsScreen.jsx';

export default function App() {
  const [screen, setScreen] = useState('home');
  const { ruleStats, recordIdentify, recordApply, resetStats, storageWarning } = useStats();
  const settings = loadSettings();

  function handleSessionEnd(results) {
    if (results && results.length > 0) {
      const idCorrect = results.filter(r => r.identifyCorrect).length;
      const apCorrect = results.filter(r => r.applyCorrect).length;
      saveHistory({
        date: new Date().toISOString().slice(0, 10),
        questionsAnswered: results.length,
        identifyAccuracy: idCorrect / results.length,
        applyAccuracy: apCorrect / results.length,
      });
      updateStreak();
    }
    setScreen('home');
  }

  return (
    <div className="min-h-dvh bg-navy">
      {storageWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-accent text-white text-sm text-center px-4 py-2" style={{ paddingTop: 'calc(0.5rem + env(safe-area-inset-top))' }}>
          Running in Private Browsing — your progress won't be saved.
        </div>
      )}

      {screen === 'home' && (
        <HomeScreen
          ruleStats={ruleStats}
          onStartSession={() => setScreen('session')}
          onStats={() => setScreen('stats')}
          onSettings={() => setScreen('settings')}
        />
      )}

      {screen === 'session' && (
        <SessionScreen
          sessionLength={settings.sessionLength}
          ruleStats={ruleStats}
          recordIdentify={recordIdentify}
          recordApply={recordApply}
          onSessionEnd={handleSessionEnd}
        />
      )}

      {screen === 'stats' && (
        <StatsScreen ruleStats={ruleStats} onBack={() => setScreen('home')} />
      )}

      {screen === 'settings' && (
        <SettingsScreen onBack={() => setScreen('home')} onResetStats={resetStats} />
      )}
    </div>
  );
}
