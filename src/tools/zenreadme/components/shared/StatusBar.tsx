import { MarkdownStats } from '../../types/editor';

interface StatusBarProps {
  stats: MarkdownStats;
}

export function StatusBar({ stats }: StatusBarProps) {
  const items = [
    { label: 'Words', value: stats.words.toLocaleString() },
    { label: 'Characters', value: stats.characters.toLocaleString() },
    { label: 'Lines', value: stats.lines.toLocaleString() },
    { label: 'Headings', value: stats.headings.toString() },
    { label: 'Reading', value: stats.readingTime },
  ];

  return (
    <footer className="flex items-center justify-between px-6 py-2 border-t border-[#111]/10 bg-white/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.15em] text-[#111]/40">
      <div className="flex items-center gap-5">
        {items.map(({ label, value }) => (
          <span key={label}>
            {label}{' '}
            <span className="text-[#111]/70">{value}</span>
          </span>
        ))}
      </div>
      <span>Markdown</span>
    </footer>
  );
}
