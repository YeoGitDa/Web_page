import { Link } from 'react-router-dom';

/**
 * 공용 버튼 · 카드 — YeoGitDa/Design system/02-components.md
 * 색·모서리를 페이지에서 직접 정하지 말고 이걸 쓴다
 */

const BUTTON = {
  primary: 'border border-transparent bg-yb-forest text-white hover:bg-yb-deep active:bg-yb-night',
  secondary: 'border border-yb-forest bg-transparent text-yb-forest hover:bg-yb-leaf-12',
  // 사진 위 보조 버튼 (홈 첫 화면) — onLight 밝은 사진 · onImage 어두운 사진
  onLight: 'border border-yb-forest bg-white/70 text-yb-forest backdrop-blur-xl hover:bg-white',
  onImage: 'border border-white/60 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20',
};

const SIZE = {
  md: 'px-4 py-2 text-sm',
  lg: 'w-52 px-8 py-4 text-base', // 홈 첫 화면
};

/**
 * to → 사이트 안(Link) · href → 밖(a, 새 탭) · 둘 다 없으면 button
 * 주 버튼(primary)은 한 화면에 하나 · 사진 위 보조 버튼은 onLight/onImage
 */
export function Button({ variant = 'primary', size = 'md', to, href, className = '', children, ...rest }) {
  const cls = `inline-flex items-center justify-center gap-1.5 rounded-full font-semibold no-underline transition focus:outline-none focus-visible:ring-[3px] focus-visible:ring-yb-leaf/45 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-yb-leaf-6 disabled:text-slate-500 ${SIZE[size]} ${BUTTON[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

/**
 * 흰 카드. to/href 가 있으면 누르는 카드라 hover 효과가 붙는다
 * image: 윗칸 그림 (16:10 으로 꽉 채움)
 */
export function Card({ to, href, image, imageAlt = '', className = '', children }) {
  const cls = `flex flex-col overflow-hidden rounded-card border border-slate-200 bg-white text-left no-underline shadow-rest ${
    to || href ? 'transition hover:-translate-y-1 hover:shadow-hover' : ''
  } ${className}`;
  const body = (
    <>
      {image && <img src={image} alt={imageAlt} className="aspect-[16/10] w-full object-cover" />}
      <div className="flex flex-1 flex-col p-6">{children}</div>
    </>
  );
  if (to) return <Link to={to} className={cls}>{body}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls}>{body}</a>;
  return <div className={cls}>{body}</div>;
}
