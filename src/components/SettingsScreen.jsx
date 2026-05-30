import { useState } from 'react';

const SETTINGS_KEY = 'act_settings';

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { sessionLength: 10 };
  } catch { return { sessionLength: 10 }; }
}

function saveSettings(s) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch {}
}

export default function SettingsScreen({ onBack, onResetStats }) {
  const [settings, setSettings] = useState(loadSettings);
  const [saved, setSaved] = useState(false);

  function handleLengthChange(e) {
    const val = Math.max(5, Math.min(20, parseInt(e.target.value) || 10));
    const next = { ...settings, sessionLength: val };
    setSettings(next);
    saveSettings(next);
  }

  function handleSave() {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-dvh bg-navy flex flex-col px-4" style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))', paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-secondaryText text-2xl w-10 h-10 flex items-center justify-center rounded-full active:bg-surface">←</button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-surface rounded-2xl p-4">
          <label className="block text-sm text-secondaryText mb-2">Session Length</label>
          <input
            type="number"
            value={settings.sessionLength}
            onChange={handleLengthChange}
            min={5} max={20}
            className="w-full bg-navy rounded-xl px-4 py-3 text-primaryText text-base border border-gray-700 focus:outline-none focus:border-blue-400"
            style={{ fontSize: '16px' }}
          />
          <p className="text-xs text-secondaryText mt-1">Questions per session (5–20)</p>
        </div>

        <div className="bg-surface rounded-2xl p-4">
          <p className="text-sm text-secondaryText mb-2">API Key</p>
          <p className="text-xs text-secondaryText bg-navy rounded-xl p-3 leading-relaxed">
            Your Anthropic API key is stored in the <span className="font-mono text-blue-400">.env</span> file on the server. It is never sent to any third party — only to Anthropic's API.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl font-bold text-white"
          style={{ backgroundColor: saved ? '#0f9b58' : '#4fc3f7', minHeight: '56px' }}
        >
          {saved ? 'Saved!' : 'Save Settings'}
        </button>

        <button
          onClick={() => { if (confirm('Reset all stats? This cannot be undone.')) onResetStats(); }}
          className="w-full py-4 rounded-2xl font-bold"
          style={{ backgroundColor: '#e9456020', color: '#e94560', minHeight: '56px' }}
        >
          Reset All Stats
        </button>
      </div>
    </div>
  );
}
