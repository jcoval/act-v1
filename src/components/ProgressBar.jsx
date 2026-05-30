export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-surface rounded-full h-2">
      <div
        className="h-2 rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: '#4fc3f7' }}
      />
    </div>
  );
}
