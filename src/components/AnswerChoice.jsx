export default function AnswerChoice({ letter, children, state, onClick, disabled }) {
  const base = "flex items-start gap-3 w-full text-left rounded-xl p-4 min-h-[64px] transition-all duration-300 border-2";
  const states = {
    default: "bg-surface border-transparent active:border-blue-400",
    correct: "bg-success/20 border-success",
    wrong: "bg-accent/20 border-accent",
    neutral: "bg-surface/50 border-transparent opacity-60",
  };

  return (
    <button
      className={`${base} ${states[state || 'default']}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
        style={{ backgroundColor: state === 'correct' ? '#0f9b58' : state === 'wrong' ? '#e94560' : '#2d3748', color: '#eaeaea' }}>
        {letter}
      </span>
      <span className="flex-1 text-base leading-snug mt-0.5">{children}</span>
      {state === 'correct' && <span className="text-success text-xl">✓</span>}
      {state === 'wrong' && <span className="text-accent text-xl">✗</span>}
    </button>
  );
}
