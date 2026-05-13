import { useState } from 'react';

/**
 * 태그 토글 선택 + 커스텀 입력 컴포넌트
 */
export default function TagSelector({ label, options, selected, onChange, color = 'emerald' }) {
  const [custom, setCustom] = useState('');

  const toggle = (tag) => {
    onChange(selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag]);
  };

  const addCustom = () => {
    const v = custom.trim();
    if (v && !selected.includes(v)) {
      onChange([...selected, v]);
    }
    setCustom('');
  };

  const colors = {
    emerald: {
      active: 'bg-emerald-600 text-white border-emerald-600',
      idle: 'border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700',
    },
    sky: {
      active: 'bg-sky-600 text-white border-sky-600',
      idle: 'border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700',
    },
  };

  const c = colors[color] || colors.emerald;

  return (
    <div className="space-y-3">
      <span className="block text-sm font-medium text-slate-700">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              selected.includes(tag) ? c.active : c.idle
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }}
          placeholder="직접 입력 후 Enter"
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={addCustom}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-500 transition hover:bg-slate-100"
        >
          추가
        </button>
      </div>
    </div>
  );
}
