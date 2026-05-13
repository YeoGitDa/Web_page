import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  copyEnvelopeToClipboard,
  persistEnvelopeLocally,
  submitRecruitment,
  TECH_STACK_OPTIONS,
  DOMAIN_OPTIONS,
} from './submitRecruitment.js';
import TagSelector from './TagSelector.jsx';

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600';
const labelClass = 'block text-sm font-medium text-slate-700';
const hintClass = 'mt-1 text-xs text-slate-400';

const initialMember = {
  name: '',
  studentId: '',
  major: '',
  subMajor: '',
  phone: '',
  email: '',
  techStack: [],
  interestDomains: [],
  projectHistory: '',
  motivation: '',
  expectations: '',
  privacyAgree: false,
};

export default function MemberApplication() {
  const [form, setForm] = useState(initialMember);
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
    if (!form.studentId.trim()) e.studentId = '학번을 입력해 주세요.';
    if (!form.major.trim()) e.major = '전공을 입력해 주세요.';
    if (!form.phone.trim()) e.phone = '연락처를 입력해 주세요.';
    if (!form.motivation.trim()) e.motivation = '지원 동기를 입력해 주세요.';
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
      student_id: form.studentId.trim(),
      department: form.major.trim(),
      sub_major: form.subMajor.trim() || null,
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      skills: {
        languages: form.techStack.filter((t) => LANG_SET.includes(t)),
        tools: form.techStack.filter((t) => TOOL_SET.includes(t)),
        domain: form.interestDomains,
        other: form.techStack.filter((t) => !LANG_SET.includes(t) && !TOOL_SET.includes(t)),
      },
      project_history: form.projectHistory.trim() || null,
      motivation: form.motivation.trim(),
      expectations: form.expectations.trim() || null,
      status: 'candidate',
    };

    try {
      const { delivered, envelope } = await submitRecruitment('member', payload);
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
        setResult({ kind: 'ok', message: '제출이 완료되었습니다! 연락을 기다려 주세요.' });
        setForm(initialMember);
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
    ok: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    local: 'border-amber-200 bg-amber-50 text-amber-800',
    error: 'border-red-200 bg-red-50 text-red-800',
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <Link to="/recruit" className="text-sm font-medium text-emerald-700 hover:underline">
          &larr; 모집 홈
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">동아리 부원 지원서</h1>
        <p className="mt-2 text-sm text-slate-500">
          입력된 정보는 지원 검토 및 온보딩에 활용됩니다. * 표시는 필수 항목입니다.
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
              <label htmlFor="m-name" className={labelClass}>이름 *</label>
              <input id="m-name" name="name" value={form.name} onChange={onChange} placeholder="성함" className={inputClass} />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="m-sid" className={labelClass}>학번 *</label>
              <input id="m-sid" name="studentId" value={form.studentId} onChange={onChange} placeholder="예: 202200546" className={inputClass} />
              {errors.studentId && <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="m-major" className={labelClass}>주전공 *</label>
              <input id="m-major" name="major" value={form.major} onChange={onChange} placeholder="예: 문헌정보학과" className={inputClass} />
              {errors.major && <p className="mt-1 text-sm text-red-600">{errors.major}</p>}
            </div>
            <div>
              <label htmlFor="m-sub" className={labelClass}>부/복수전공</label>
              <input id="m-sub" name="subMajor" value={form.subMajor} onChange={onChange} placeholder="해당 시 입력" className={inputClass} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="m-phone" className={labelClass}>연락처 *</label>
              <input id="m-phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="010-0000-0000" className={inputClass} />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="m-email" className={labelClass}>이메일</label>
              <input id="m-email" name="email" type="email" value={form.email} onChange={onChange} placeholder="선택 사항" className={inputClass} />
            </div>
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
            color="emerald"
          />

          <TagSelector
            label="관심 도메인 (복수 선택)"
            options={DOMAIN_OPTIONS}
            selected={form.interestDomains}
            onChange={setTags('interestDomains')}
            color="emerald"
          />

          <div>
            <label htmlFor="m-proj" className={labelClass}>프로젝트 및 학습 이력</label>
            <textarea
              id="m-proj"
              name="projectHistory"
              rows={4}
              value={form.projectHistory}
              onChange={onChange}
              placeholder="참여했던 프로젝트, 사용 도구, 학습 경험 등을 자유롭게 적어 주세요."
              className={inputClass}
            />
            <p className={hintClass}>예: Chat-bul-i 프로젝트 참여, Notion/Obsidian 활용 등</p>
          </div>
        </fieldset>

        <hr className="border-slate-100" />

        <fieldset className="space-y-5">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">지원 동기</legend>

          <div>
            <label htmlFor="m-mot" className={labelClass}>지원 동기 *</label>
            <textarea
              id="m-mot"
              name="motivation"
              rows={5}
              value={form.motivation}
              onChange={onChange}
              placeholder="여백에 지원하게 된 계기와 동아리에서 하고 싶은 활동을 적어 주세요."
              className={inputClass}
            />
            {errors.motivation && <p className="mt-1 text-sm text-red-600">{errors.motivation}</p>}
          </div>

          <div>
            <label htmlFor="m-exp" className={labelClass}>기대하는 점</label>
            <textarea
              id="m-exp"
              name="expectations"
              rows={3}
              value={form.expectations}
              onChange={onChange}
              placeholder="동아리 활동을 통해 얻고 싶은 것이 있다면 적어 주세요."
              className={inputClass}
            />
          </div>
        </fieldset>

        <hr className="border-slate-100" />

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              id="m-privacy"
              name="privacyAgree"
              type="checkbox"
              checked={form.privacyAgree}
              onChange={onChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="m-privacy" className="text-sm text-slate-700">
              개인정보 수집/이용에 동의합니다. *
              <span className="block text-xs text-slate-400">
                수집 항목: 이름, 학번, 전공, 연락처, 이메일 | 목적: 지원 검토 및 연락 | 보유 기간: 모집 완료 후 1년
              </span>
            </label>
          </div>
          {errors.privacyAgree && <p className="text-sm text-red-600">{errors.privacyAgree}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-emerald-800 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 hover:shadow-lg disabled:opacity-60"
          >
            {submitting ? '제출 중...' : '지원서 제출'}
          </button>
        </div>
      </form>
    </div>
  );
}
