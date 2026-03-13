export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--zt-bg)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />
      <div className="absolute left-0 right-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(56,189,248,0.16),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(0deg,rgba(15,23,42,0.9),transparent)]" />
    </div>
  );
}
