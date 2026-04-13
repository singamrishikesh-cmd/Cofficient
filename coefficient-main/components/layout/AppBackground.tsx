export default function AppBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(37,99,235,0.22),transparent_55%),radial-gradient(circle_at_85%_22%,rgba(16,185,129,0.16),transparent_52%),radial-gradient(circle_at_55%_95%,rgba(99,102,241,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.075)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.075)_1px,transparent_1px)] bg-[size:72px_72px] opacity-28" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/70 to-transparent" />
    </div>
  );
}
