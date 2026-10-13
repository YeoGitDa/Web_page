import { Link } from 'react-router-dom';

/**
 * 공용 버튼 · 카드 — YeoGitDa/Design system/02-components.md
 * 색·모서리를 페이지에서 직접 정하지 말고 이걸 쓴다
 */

const BUTTON = {
  primary: 'bg-yb-forest text-white hover:bg-yb-deep active:bg-yb-night',
  secondary: 'border border-yb-forest bg-transparent text-yb-forest hover:bg-yb-leaf-12',
};

/**
 * to → 사이트 안(Link) · href → 밖(a, 새 탭) · 둘 다 없으면 button
 * 주 버튼(primary)은 한 화면에 하나
 */
export function Button({ variant = 'primary', to, href, className = '', children, ...rest }) {
  const cls = `inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold no-underline transition focus:outline-none focus-visible:ring-[3px] focus-visible:ring-yb-leaf/45 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-yb-leaf-6 disabled:text-slate-500 ${BUTTON[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

/**
 * 흰 카드. to/href 가 있으면 누르는 카드라 hover 효과가 붙는다
 * image: 윗칸 그림 (16:10 으로 꽉 채움)
 */
export function Card({ to, href, image, imageAlt = '', className = '', children }) {
  const cls = `block overflow-hidden rounded-card border border-slate-200 bg-white text-left no-underline shadow-rest ${
    to || href ? 'transition hover:-translate-y-1 hover:shadow-hover' : ''
  } ${className}`;
  const body = (
    <>
      {image && <img src={image} alt={imageAlt} className="aspect-[16/10] w-full object-cover" />}
      <div className="p-6">{children}</div>
    </>
  );
  if (to) return <Link to={to} className={cls}>{body}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls}>{body}</a>;
  return <div className={cls}>{body}</div>;
}
