import { useState } from 'react';

/*
 * 문의 밴드 (v3 시안) + 바닥글
 * 「보내기」 는 서버 없이 메일 앱을 열어 CONTACT_EMAIL 로 보낸다
 * (서버로 받는 기능은 챗봇 서버 배포 후 별도)
 */
const CONTACT_EMAIL = 'lisyeobaek@gmail.com';

const LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/team_yeobeak' },
  { label: 'Velog', href: 'https://velog.io/@yeobaek/posts' },
  { label: 'GitHub', href: 'https://github.com/YeoGitDa' },
];

const field =
  'w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none focus:border-white focus:bg-white/15';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `[여백 웹 문의] ${form.name || '이름 없음'}`;
    const body = `이름: ${form.name}\n회신 메일: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div id="contact">
      <section className="bg-gradient-to-br from-teal-600 to-emerald-800 px-5 py-20 text-white sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">Contact</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">문의하기</h2>
            <p className="mt-3 text-base text-white/80">
              보내기를 누르면 메일 앱이 열립니다. 바로 메일을 보내셔도 돼요.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="w-14 shrink-0 text-white/60">메일</dt>
                <dd className="m-0"><a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline-offset-4 hover:underline">{CONTACT_EMAIL}</a></dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-14 shrink-0 text-white/60">위치</dt>
                <dd className="m-0">인천대학교 문헌정보학과</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/40 px-4 py-1.5 text-sm font-semibold text-white no-underline transition hover:bg-white/10"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-white/80">이름</span>
              <input className={field} value={form.name} onChange={set('name')} placeholder="이름" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-white/80">이메일</span>
              <input className={field} type="email" value={form.email} onChange={set('email')} placeholder="email@example.com" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-white/80">내용</span>
              <textarea className={`${field} min-h-32`} required value={form.message} onChange={set('message')} placeholder="문의 내용" />
            </label>
            <button
              type="submit"
              className="rounded-full border-none bg-white px-6 py-2.5 text-sm font-bold text-emerald-800 cursor-pointer transition hover:bg-emerald-50"
            >
              보내기
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 px-5 py-8 text-center text-xs text-slate-500">
        © 2024 YEOBAEK. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Contact;
