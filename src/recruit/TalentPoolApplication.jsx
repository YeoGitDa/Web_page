import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  copyEnvelopeToClipboard,
  persistEnvelopeLocally,
  submitRecruitment,
  TECH_STACK_OPTIONS,
  DOMAIN_OPTIONS,
  ACTIVITY_TYPE_OPTIONS,
  ROLE_OPTIONS,
} from './submitRecruitment.js';
import TagSelector from './TagSelector.jsx';

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600';
const labelClass = 'block text-sm font-medium text-slate-700';
const hintClass = 'mt-1 text-xs text-slate-400';

const initialPool = {
  name: '',
  affiliation: '',
  major: '',
  phone: '',
  email: '',
  techStack: [],
  domains: [],
  preferredActivities: [],
  preferredRole: [],
  weeklyHours: '',
  availablePeriod: '',
  projectHistory: '',
  awards: '',
  portfolioUrl: '',
  notes: '',
  privacyAgree: false,
};

export default function TalentPoolApplication() {
  const [form, setForm] = useState(initialPool);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const setTags = (field) => (tags) => {
    setForm((f) => ({ ...f, [field]: tags }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = '이름을 입력해 주세요.';
    if (!form.affiliation.trim()) e.affiliation = '학번 또는 소속을 입력해 주세요.';
    if (!form.phone.trim()) e.phone = '연락처를 입력해 주세요.';
    if (form.preferredActivities.length === 0) e.preferredActivities = '참여 희망 유형을 1개 이상 선택해 주세요.';
    if (!form.privacyAgree) e.privacyAgree = '개인정보 수집·이용에 동의해 주세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const LANG_SET = ['Python', 'SQL', 'JavaScript', 'React', 'HTML/CSS'];
  const TOOL_SET = ['AWS', 'Firebase', 'MongoDB', 'Git/GitHub', 'Figma', 'Notion', 'Obsidian'];

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setResult(null);
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      student_id: form.affiliation.trim(),
      department: form.major.trim() || null,
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      skills: {
        languages: form.techStack.filter((t) => LANG_SET.includes(t)),
        tools: form.techStack.filter((t) => TOOL_SET.includes(t)),
        domain: form.domains,
        other: form.techStack.filter((t) => !LANG_SET.includes(t) && !TOOL_SET.includes(t)),
      },
      preferences: {
        preferred_activities: form.preferredActivities,
        preferred_role: form.preferredRole,
        availability_hours_per_week: form.weeklyHours ? Number(form.weeklyHours) : null,
        available_period: form.availablePeriod.trim() || null,
      },
      project_history: form.projectHistory.trim() || null,
      awards: form.awards.trim() || null,
      portfolio_url: form.portfolioUrl.trim() || null,
      notes: form.notes.trim() || null,
      status: 'candidate',
    };

    try {
      const { delivered, envelope } = await submitRecruitment('talent_pool', payload);
      if (!delivered) {
        persistEnvelopeLocally(envelope);
        const copied = await copyEnvelopeToClipboard(envelope);
        setResult({
          kind: 'local',
          message: copied
            ? 'JSON 파일을 저장했고, 클립보드에 복사했습니다. 운영진에게 전달해 주세요.'
            : 'JSON 파일을 저장했습니다. 파일을 운영진에게 전달해 주세요.',
        });
      } else {
        setResult({ kind: 'ok', message: '등록이 완료되었습니다! 필요 시 연락드리겠습니다.' });
        setForm(initialPool);
      }
    } catch (err) {
      setResult({
        kind: 'error',
        message: err instanceof Error ? err.message : '제출에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resultColors = {
    ok: 'border-sky-200 bg-sky-50 text-sky-800',
    local: 'border-amber-200 bg-amber-50 text-amber-800',
    error: 'border-red-200 bg-red-50 text-red-800',
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <Link to="/recruit" className="text-sm font-medium text-sky-700 hover:underline">
          &larr; 모집 홈
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">인력풀 등록</h1>
        <p className="mt-2 text-sm text-slate-500">
          입력된 정보는 AI 기반 팀 매칭 및 대외활동 연계에 활용됩니다. * 표시는 필수 항목입니다.
        </p>
      </div>

      {result?.kind && (
        <div className={`mb-6 rounded-lg border px-4 py-3 text-sm ${resultColors[result.kind] || ''}`}>
          {result.message}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <fieldset className="space-y-5">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">기본 정보</legend>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="t-name" className={labelClass}>이름 *</label>
              <input id="t-name" name="name" value={form.name} onChange={onChange} placeholder="성함" className={inputClass} />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="t-aff" className={labelClass}>학번 또는 소속 *</label>
              <input id="t-aff" name="affiliation" value={form.affiliation} onChange={onChange} placeholder="예: 202200546 / 문헌정보학과" className={inputClass} />
              {errors.affiliation && <p className="mt-1 text-sm text-red-600">{errors.affiliation}</p>}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="t-major" className={labelClass}>전공</label>
              <input id="t-major" name="major" value={form.major} onChange={onChange} placeholder="예: 산업경영공학과" className={inputClass} />
            </div>
            <div>
              <label htmlFor="t-phone" className={labelClass}>연락처 *</label>
              <input id="t-phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="010-0000-0000" className={inputClass} />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="t-email" className={labelClass}>이메일</label>
            <input id="t-email" name="email" type="email" value={form.email} onChange={onChange} placeholder="선택 사항" className={inputClass} />
          </div>
        </fieldset>

        <hr className="border-slate-100" />

        <fieldset className="space-y-5">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">역량 정보</legend>

          <TagSelector
            label="사용 가능 기술 스택 (복수 선택)"
            options={TECH_STACK_OPTIONS}
            selected={form.techStack}
            onChange={setTags('techStack')}
            color="sky"
          />

          <TagSelector
            label="관심 도메인 (복수 선택)"
            options={DOMAIN_OPTIONS}
            selected={form.domains}
            onChange={setTags('domains')}
            color="sky"
          />

          <div>
            <label htmlFor="t-proj" className={labelClass}>프로젝트 및 학습 이력</label>
            <textarea
              id="t-proj"
              name="projectHistory"
              rows={3}
              value={form.projectHistory}
              onChange={onChange}
              placeholder="참여했던 프로젝트나 대외활동 경험을 자유롭게 적어 주세요."
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="t-awards" className={labelClass}>수상 및 자격 이력</label>
            <textarea
              id="t-awards"
              name="awards"
              rows={2}
              value={form.awards}
              onChange={onChange}
              placeholder="공모전 수상, 자격증 등 (해당 시 입력)"
              className={inputClass}
            />
            <p className={hintClass}>AI 팀 매칭 시 역량 평가에 참고됩니다.</p>
          </div>

          <div>
            <label htmlFor="t-port" className={labelClass}>포트폴리오 링크</label>
            <input
              id="t-port"
              name="portfolioUrl"
              type="url"
              value={form.portfolioUrl}
              onChange={onChange}
              placeholder="GitHub, Notion, 개인 사이트 등"
              className={inputClass}
            />
          </div>
        </fieldset>

        <hr className="border-slate-100" />

        <fieldset className="space-y-5">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">참여 희망</legend>

          <div>
            <TagSelector
              label="참여 희망 유형 * (복수 선택)"
              options={ACTIVITY_TYPE_OPTIONS}
              selected={form.preferredActivities}
              onChange={setTags('preferredActivities')}
              color="sky"
            />
            {errors.preferredActivities && <p className="mt-1 text-sm text-red-600">{errors.preferredActivities}</p>}
          </div>

          <TagSelector
            label="선호 역할 (복수 선택)"
            options={ROLE_OPTIONS}
            selected={form.preferredRole}
            onChange={setTags('preferredRole')}
            color="sky"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="t-hours" className={labelClass}>주당 가용 시간</label>
              <input
                id="t-hours"
                name="weeklyHours"
                type="number"
                min={0}
                max={80}
                value={form.weeklyHours}
                onChange={onChange}
                placeholder="예: 10"
                className={inputClass}
              />
              <p className={hintClass}>시간 단위 (대략적으로)</p>
            </div>
            <div>
              <label htmlFor="t-period" className={labelClass}>참가 가능 기간</label>
              <input
                id="t-period"
                name="availablePeriod"
                value={form.availablePeriod}
                onChange={onChange}
                placeholder="예: 2026년 1학기, 상시 가능"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="t-notes" className={labelClass}>기타 사항</label>
            <textarea
              id="t-notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={onChange}
              placeholder="추가로 알려주실 내용이 있다면 적어 주세요."
              className={inputClass}
            />
          </div>
        </fieldset>

        <hr className="border-slate-100" />

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              id="t-privacy"
              name="privacyAgree"
              type="checkbox"
              checked={form.privacyAgree}
              onChange={onChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="t-privacy" className="text-sm text-slate-700">
              개인정보 수집/이용에 동의합니다. *
              <span className="block text-xs text-slate-400">
                수집 항목: 이름, 소속, 연락처, 이메일, 역량 정보 | 목적: 팀 매칭 및 대외활동 연계 | 보유 기간: 등록 후 2년
              </span>
            </label>
          </div>
          {errors.privacyAgree && <p className="text-sm text-red-600">{errors.privacyAgree}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-sky-800 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-sky-700 hover:shadow-lg disabled:opacity-60"
          >
            {submitting ? '제출 중...' : '인력풀 등록 제출'}
          </button>
        </div>
      </form>
    </div>
  );
}
