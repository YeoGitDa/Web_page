/**
 * 로고 옆 타이틀: YEOBAEK | {suffix}
 * public 시안 v3의 .v3-brand-title / .v3-brand-pipe 와 같은 맥락
 */
export function SiteBrandMark({ suffix = 'Web', tone = 'onDark' }) {
  const pipeClass =
    tone === 'onDark'
      ? 'ml-1 font-normal text-white/75 text-[0.82em] md:text-[0.88em] tracking-tight'
      : 'ml-1 font-normal text-slate-500 text-sm md:text-base tracking-tight';

  return (
    <>
      YEOBAEK
      <span className={pipeClass}>| {suffix}</span>
    </>
  );
}
