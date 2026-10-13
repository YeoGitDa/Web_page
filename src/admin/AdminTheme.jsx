import { useMemo, useState } from 'react';
import { Button, Card } from '../components/ui';
import { DRAFT_KEY, EFFECTS, pickTheme, savedConfig } from '../theme';

/*
 * 운영 「홈 꾸미기」 — 홈 첫 화면 테마(src/theme.json)를 고르고 미리 본다
 * 1단계: 저장은 theme.json 을 내보내서 GitHub 에서 고친다 (DB 는 LAB4 뒤)
 * 고친 내용은 이 브라우저에만 임시 저장 → 미리보기(?draft=1)에 바로 보임
 */

// public/backend/image 에 이미 있는 배경 그림. 새 그림은 그 폴더에 올린 뒤 경로를 직접 입력
const BACKGROUNDS = [
  '/backend/image/Spring_Main_IMG.png',
  '/backend/image/summer_back.png',
  '/backend/image/summer_back2.png',
  '/backend/image/gomdol.jpg',
  '/backend/image/hallo.png',
];
const SEASONS = ['봄', '여름', '가을', '겨울'];
const EDIT_URL = 'https://github.com/YeoGitDa/Web_page/edit/main/src/theme.json';

const field =
  'w-full rounded-card border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-yb-leaf focus:ring-1 focus:ring-yb-leaf';
const label = 'mb-1 block text-xs font-semibold text-slate-700';

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* 저장소를 못 쓰는 브라우저 — 원본에서 시작 */
  }
  return structuredClone(savedConfig);
}

function saveDraft(cfg) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(cfg));
  } catch {
    /* 미리보기만 원본으로 보임 */
  }
}

/** 고칠 수 없게 만드는 실수 — 내보내기 전에 보여준다 */
function check(cfg) {
  const names = Object.keys(cfg['테마'] || {});
  const errs = [];
  (cfg['지정'] || []).forEach((s, i) => {
    if (!names.includes(s['테마'])) errs.push(`기간 지정 ${i + 1}번: 없는 테마 「${s['테마']}」`);
    if (!s['시작'] || !s['끝'] || s['시작'] > s['끝']) errs.push(`기간 지정 ${i + 1}번: 시작·끝 날짜 확인`);
  });
  SEASONS.forEach((k) => {
    if (!names.includes(cfg['계절']?.[k])) errs.push(`계절 「${k}」: 없는 테마`);
  });
  names.forEach((n) => {
    if (!cfg['테마'][n]['배경']) errs.push(`테마 「${n}」: 배경 그림 없음`);
  });
  return errs;
}

export default function AdminTheme() {
  const [cfg, setCfg] = useState(loadDraft);
  const [selected, setSelected] = useState(() => pickTheme(new Date(), '?draft=1').name);
  const [previewKey, setPreviewKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const today = useMemo(() => pickTheme(new Date(), ''), []);
  const themes = cfg['테마'] || {};
  const t = themes[selected];
  const changed = JSON.stringify(cfg) !== JSON.stringify(savedConfig);
  const errs = check(cfg);
  const json = `${JSON.stringify(cfg, null, 2)}\n`;

  const update = (fn) => {
    const next = structuredClone(cfg);
    fn(next);
    setCfg(next);
    saveDraft(next);
    setCopied(false);
  };
  const setField = (k, v) => update((c) => { c['테마'][selected][k] = v; });

  const addTheme = () => {
    const name = window.prompt('새 테마 이름 (영문 소문자, 예: christmas)')?.trim();
    if (!name) return;
    if (!/^[a-z0-9-]+$/.test(name) || themes[name]) return window.alert('영문 소문자·숫자·- 만, 겹치지 않게');
    update((c) => { c['테마'][name] = { 배경: BACKGROUNDS[0], 효과: '없음', 음악: '', 글자: '보임', 글자색: '어둡게' }; });
    setSelected(name);
  };

  const reset = () => {
    if (!window.confirm('고친 내용을 버리고 지금 사이트 설정으로 돌릴까요?')) return;
    const orig = structuredClone(savedConfig);
    setCfg(orig);
    saveDraft(orig);
    setPreviewKey((k) => k + 1);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
    } catch {
      window.alert('복사가 막혔어요. 아래 칸을 직접 선택해 복사해 주세요.');
    }
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    a.download = 'theme.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="space-y-10">
      <section>
        <p className="font-brand text-xs font-bold uppercase tracking-[0.14em] text-yb-forest">Home Theme</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">홈 꾸미기</h1>
        <p className="mt-3 text-slate-500">
          홈 첫 화면의 배경 그림·떨어지는 효과·음악을 고르고 미리 봅니다. 지금 사이트에는{' '}
          <strong className="text-yb-forest">{today.name}</strong> 테마가 보여요 ({today.reason}).
        </p>
      </section>

      {/* 테마 목록 */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">테마</h2>
          <Button variant="secondary" onClick={addTheme}>테마 추가</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {Object.entries(themes).map(([name, v]) => (
            <button
              key={name}
              type="button"
              onClick={() => setSelected(name)}
              className={`overflow-hidden rounded-card border bg-white p-0 text-left transition ${
                name === selected ? 'border-yb-forest ring-2 ring-yb-leaf/45' : 'border-slate-200 hover:border-yb-leaf-24'
              }`}
            >
              <img src={v['배경']} alt="" className="aspect-[16/10] w-full bg-slate-100 object-cover" />
              <div className="p-3">
                <p className="text-sm font-bold text-slate-900">
                  {name}
                  {name === today.name && <span className="ml-2 rounded-full bg-yb-leaf-12 px-2 py-0.5 text-xs font-semibold text-yb-forest">지금</span>}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  효과 {v['효과'] || '없음'} · 음악 {v['음악'] ? '있음' : '없음'} · 글자 {v['글자'] || '보임'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 고르기 + 미리보기 */}
      {t && (
        <section className="grid gap-6 md:grid-cols-[18rem_1fr]">
          <Card>
            <h2 className="text-lg font-bold text-slate-900">「{selected}」 고치기</h2>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className={label}>배경 그림</span>
                <select className={field} value={BACKGROUNDS.includes(t['배경']) ? t['배경'] : ''} onChange={(e) => e.target.value && setField('배경', e.target.value)}>
                  <option value="">직접 입력한 경로</option>
                  {BACKGROUNDS.map((b) => <option key={b} value={b}>{b.split('/').pop()}</option>)}
                </select>
                <input className={`${field} mt-2`} value={t['배경']} onChange={(e) => setField('배경', e.target.value)} />
                <span className="mt-1 block text-xs text-slate-500">새 그림은 public/backend/image 에 먼저 올려야 해요</span>
              </label>
              <label className="block">
                <span className={label}>떨어지는 효과</span>
                <select className={field} value={t['효과'] || '없음'} onChange={(e) => setField('효과', e.target.value)}>
                  {EFFECTS.map((x) => <option key={x}>{x}</option>)}
                </select>
              </label>
              <label className="block">
                <span className={label}>배경 음악 (mp3 경로, 없으면 비움)</span>
                <input className={field} value={t['음악'] || ''} onChange={(e) => setField('음악', e.target.value)} />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className={label}>글자</span>
                  <select className={field} value={t['글자'] || '보임'} onChange={(e) => setField('글자', e.target.value)}>
                    <option>보임</option><option>숨김</option>
                  </select>
                </label>
                <label className="block">
                  <span className={label}>글자색</span>
                  <select className={field} value={t['글자색'] || '어둡게'} onChange={(e) => setField('글자색', e.target.value)}>
                    <option>어둡게</option><option>밝게</option>
                  </select>
                </label>
              </div>
              <Button variant="secondary" className="w-full" onClick={() => setPreviewKey((k) => k + 1)}>미리보기 새로고침</Button>
            </div>
          </Card>

          <div>
            <div className="overflow-hidden rounded-card border border-slate-200 bg-white shadow-rest">
              {/* 홈 화면을 1280×720 으로 띄워 줄여 보여준다 */}
              <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  key={`${selected}-${previewKey}`}
                  title="홈 미리보기"
                  src={`/?theme=${encodeURIComponent(selected)}&draft=1`}
                  className="absolute left-0 top-0 origin-top-left border-0"
                  style={{ width: 1280, height: 720, transform: 'scale(var(--s))' }}
                  ref={(el) => el && el.parentElement && el.style.setProperty('--s', String(el.parentElement.clientWidth / 1280))}
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">미리보기는 이 브라우저에서만 보여요. 사이트에 반영하려면 아래 「내보내기」</p>
          </div>
        </section>
      )}

      {/* 기간·계절 */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">기간 지정</h2>
            <Button
              variant="secondary"
              onClick={() => update((c) => { (c['지정'] ||= []).push({ 테마: selected, 시작: '', 끝: '', _메모: '' }); })}
            >
              추가
            </Button>
          </div>
          <p className="mt-1 text-xs text-slate-500">이 기간에는 계절보다 먼저 이 테마가 보여요</p>
          <ul className="m-0 mt-4 list-none space-y-3 p-0">
            {(cfg['지정'] || []).map((s, i) => (
              <li key={i} className="grid grid-cols-[1fr_auto] gap-2 rounded-card border border-slate-200 p-3">
                <div className="grid grid-cols-2 gap-2">
                  <select className={`${field} col-span-2`} value={s['테마']} onChange={(e) => update((c) => { c['지정'][i]['테마'] = e.target.value; })}>
                    {Object.keys(themes).map((n) => <option key={n}>{n}</option>)}
                  </select>
                  <input type="date" className={field} value={s['시작']} onChange={(e) => update((c) => { c['지정'][i]['시작'] = e.target.value; })} />
                  <input type="date" className={field} value={s['끝']} onChange={(e) => update((c) => { c['지정'][i]['끝'] = e.target.value; })} />
                  <input className={`${field} col-span-2`} placeholder="메모 (예: 할로윈 주간)" value={s['_메모'] || ''} onChange={(e) => update((c) => { c['지정'][i]['_메모'] = e.target.value; })} />
                </div>
                <button type="button" onClick={() => update((c) => { c['지정'].splice(i, 1); })} className="self-start rounded-md bg-transparent px-2 py-1 text-sm text-red-600 hover:bg-red-50">
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-900">계절별 테마</h2>
          <p className="mt-1 text-xs text-slate-500">봄 3–5월 · 여름 6–8월 · 가을 9–11월 · 겨울 12–2월</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {SEASONS.map((k) => (
              <label key={k} className="block">
                <span className={label}>{k}</span>
                <select className={field} value={cfg['계절']?.[k] || ''} onChange={(e) => update((c) => { c['계절'][k] = e.target.value; })}>
                  {Object.keys(themes).map((n) => <option key={n}>{n}</option>)}
                </select>
              </label>
            ))}
          </div>
        </Card>
      </section>

      {/* 내보내기 */}
      <section>
        <Card>
          <h2 className="text-lg font-bold text-slate-900">사이트에 반영하기</h2>
          {!changed ? (
            <p className="mt-2 text-sm text-slate-500">고친 내용이 없어요.</p>
          ) : errs.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-red-600">
              {errs.map((e) => <li key={e}>{e}</li>)}
            </ul>
          ) : (
            <>
              <ol className="mt-3 space-y-1 pl-5 text-sm text-slate-600">
                <li>「복사」 를 누른다</li>
                <li>「GitHub 에서 열기」 → 내용을 전부 지우고 붙여넣기</li>
                <li>아래 「Propose changes」 → PR 이 만들어지고, 머지되면 사이트에 반영</li>
              </ol>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={copy}>{copied ? '복사했어요' : '복사'}</Button>
                <Button variant="secondary" href={EDIT_URL}>GitHub 에서 열기</Button>
                <Button variant="secondary" onClick={download}>파일로 받기</Button>
                <Button variant="secondary" onClick={reset}>고친 것 버리기</Button>
              </div>
              <textarea readOnly value={json} className={`${field} mt-4 h-48 font-mono text-xs`} />
            </>
          )}
        </Card>
      </section>
    </div>
  );
}
