import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  copyEnvelopeToClipboard,
  persistEnvelopeLocally,
  submitOpportunity,
  addOpportunity,
  OPPORTUNITY_TYPE_OPTIONS,
  OPPORTUNITY_STATUS_OPTIONS,
  DOMAIN_OPTIONS,
  TECH_STACK_OPTIONS,
  ROLE_OPTIONS,
} from './submitRecruitment.js';
import TagSelector from './TagSelector.jsx';

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600';
const labelClass = 'block text-sm font-medium text-slate-700';
const hintClass = 'mt-1 text-xs text-slate-400';

const initialForm = {
  title: '',
  type: '',
  organizer: '',
  description: '',
  url: '',
  domains: [],
  requiredSkills: [],
  requiredRoles: [],
  teamSize: '',
  deadline: '',
  eventDate: '',
  status: '모집중',
  notes: '',
};

export default function OpportunityForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const setTags = (field) => (tags) => {
    setForm((f) => ({ ...f, [field]: tags }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = '제목을 입력해 주세요.';
    if (!form.type) e.type = '유형을 선택해 주세요.';
    if (!form.deadline) e.deadline = '마감일을 입력해 주세요.';
    if (form.domains.length === 0) e.domains = '관련 도메인을 1개 이상 선택해 주세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setResult(null);
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      type: form.type,
      organizer: form.organizer.trim() || null,
      description: form.description.trim() || null,
      url: form.url.trim() || null,
      matching_tags: {
        domains: form.domains,
        required_skills: form.requiredSkills,
        required_roles: form.requiredRoles,
      },
      team_size: form.teamSize ? Number(form.teamSize) : null,
      deadline: form.deadline,
      event_date: form.eventDate || null,
      status: form.status,
      notes: form.notes.trim() || null,
    };

    // 로컬 저장소에 추가 (매칭용)
    addOpportunity(payload);

    try {
      const { delivered, envelope } = await submitOpportunity(payload);
      if (!delivered) {
        persistEnvelopeLocally(envelope);
        const copied = await copyEnvelopeToClipboard(envelope);
        setResult({
          kind: 'local',
          message: copied
            ? '로컬에 저장 완료! JSON 파일이 다운로드되었고 클립보드에도 복사했습니다.'
            : '로컬에 저장 완료! JSON 파일이 다운로드되었습니다.',
        });
      } else {
        setResult({ kind: 'ok', message: '기회 정보가 등록되었습니다!' });
      }
      setForm(initialForm);
    } catch (err) {
      setResult({
        kind: 'error',
        message: err instanceof Error ? err.message : '등록에 실패했습니다. 다시 시도해 주세요.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resultColors = {
    ok: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    local: 'border-amber-200 bg-amber-50 text-amber-800',
    error: 'border-red-200 bg-red-50 text-red-800',
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <Link to="/recruit/opportunities" className="text-sm font-medium text-emerald-700 hover:underline">
          &larr; 기회 목록
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">기회 등록</h1>
        <p className="mt-2 text-sm text-slate-500">
          공모전, 학회, 교육 등 외부 기회를 등록하면 인력풀과 자동으로 매칭됩니다. * 표시는 필수 항목입니다.
        </p>
      </div>

      {result?.kind && (
        <div className={`mb-6 rounded-lg border px-4 py-3 text-sm ${resultColors[result.kind] || ''}`}>
          {result.message}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* 기본 정보 */}
        <fieldset className="space-y-5">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">기본 정보</legend>

          <div>
            <label htmlFor="o-title" className={labelClass}>제목 *</label>
            <input id="o-title" name="title" value={form.title} onChange={onChange} placeholder="예: 2026 공공데이터 활용 공모전" className={inputClass} />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="o-type" className={labelClass}>유형 *</label>
              <select id="o-type" name="type" value={form.type} onChange={onChange} className={inputClass}>
                <option value="">선택해 주세요</option>
                {OPPORTUNITY_TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
            </div>
            <div>
              <label htmlFor="o-status" className={labelClass}>상태</label>
              <select id="o-status" name="status" value={form.status} onChange={onChange} className={inputClass}>
                {OPPORTUNITY_STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="o-organizer" className={labelClass}>주최/주관</label>
              <input id="o-organizer" name="organizer" value={form.organizer} onChange={onChange} placeholder="예: 한국정보화진흥원" className={inputClass} />
            </div>
            <div>
              <label htmlFor="o-url" className={labelClass}>관련 링크</label>
              <input id="o-url" name="url" type="url" value={form.url} onChange={onChange} placeholder="https://..." className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="o-desc" className={labelClass}>설명</label>
            <textarea id="o-desc" name="description" rows={3} value={form.description} onChange={onChange} placeholder="기회에 대한 간단한 설명" className={inputClass} />
          </div>
        </fieldset>

        <hr className="border-slate-100" />

        {/* 매칭 태그 */}
        <fieldset className="space-y-5">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">매칭 조건</legend>
          <p className="text-xs text-slate-400">여기서 설정한 태그가 인력풀 프로필과 비교되어 적합한 후보를 추천합니다.</p>

          <div>
            <TagSelector
              label="관련 도메인 * (복수 선택)"
              options={DOMAIN_OPTIONS}
              selected={form.domains}
              onChange={setTags('domains')}
              color="emerald"
            />
            {errors.domains && <p className="mt-1 text-sm text-red-600">{errors.domains}</p>}
          </div>

          <TagSelector
            label="필요 기술 스택 (복수 선택)"
            options={TECH_STACK_OPTIONS}
            selected={form.requiredSkills}
            onChange={setTags('requiredSkills')}
            color="emerald"
          />

          <TagSelector
            label="필요 역할 (복수 선택)"
            options={ROLE_OPTIONS}
            selected={form.requiredRoles}
            onChange={setTags('requiredRoles')}
            color="emerald"
          />

          <div>
            <label htmlFor="o-team" className={labelClass}>팀 규모</label>
            <input id="o-team" name="teamSize" type="number" min={1} max={50} value={form.teamSize} onChange={onChange} placeholder="예: 4" className={inputClass} />
            <p className={hintClass}>필요한 인원 수 (대략적으로)</p>
          </div>
        </fieldset>

        <hr className="border-slate-100" />

        {/* 일정 */}
        <fieldset className="space-y-5">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">일정</legend>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="o-deadline" className={labelClass}>접수 마감일 *</label>
              <input id="o-deadline" name="deadline" type="date" value={form.deadline} onChange={onChange} className={inputClass} />
              {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
            </div>
            <div>
              <label htmlFor="o-event" className={labelClass}>행사/시작일</label>
              <input id="o-event" name="eventDate" type="date" value={form.eventDate} onChange={onChange} className={inputClass} />
            </div>
          </div>
        </fieldset>

        <hr className="border-slate-100" />

        <div className="space-y-4">
          <div>
            <label htmlFor="o-notes" className={labelClass}>비고</label>
            <textarea id="o-notes" name="notes" rows={2} value={form.notes} onChange={onChange} placeholder="추가 참고사항" className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-emerald-800 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 hover:shadow-lg disabled:opacity-60"
          >
            {submitting ? '등록 중...' : '기회 등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
