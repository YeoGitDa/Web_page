import { useState } from 'react';
import { Link } from 'react-router-dom';
import { copyEnvelopeToClipboard, persistEnvelopeLocally, submitRecruitment } from './submitRecruitment.js';

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600';
const labelClass = 'block text-sm font-medium text-slate-700';

const initialPool = {
  name: '',
  affiliation: '',
  phone: '',
  email: '',
  preferredActivities: '',
  weeklyAvailability: '',
  skillsSummary: '',
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

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = '이름을 입력해 주세요.';
    if (!form.affiliation.trim()) e.affiliation = '학번 또는 소속을 입력해 주세요.';
    if (!form.phone.trim()) e.phone = '연락처를 입력해 주세요.';
    if (!form.preferredActivities.trim()) e.preferredActivities = '참여 희망 유형을 입력해 주세요.';
    if (!form.privacyAgree) e.privacyAgree = '개인정보 수집·이용에 동의해 주세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setResult(null);
    if (!validate()) return;
    setSubmitting(true);
    const payload = {
      name: form.name.trim(),
      affiliation: form.affiliation.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      preferredActivities: form.preferredActivities.trim(),
      weeklyAvailability: form.weeklyAvailability.trim() || null,
      skillsSummary: form.skillsSummary.trim() || null,
      notes: form.notes.trim() || null,
    };
    try {
      const { delivered, envelope } = await submitRecruitment('talent_pool', payload);
      if (!delivered) {
        persistEnvelopeLocally(envelope);
        const copied = await copyEnvelopeToClipboard(envelope);
        setResult({
          kind: 'local',
          message: copied
            ? 'JSON 파일을 저장했고, 내용을 클립보드에 복사했습니다. 운영진에게 전달해 주세요.'
            : 'JSON 파일을 저장했습니다. 파일을 운영진에게 전달해 주세요.',
        });
      } else {
        setResult({ kind: 'ok', message: '등록이 완료되었습니다. 필요 시 연락드리겠습니다.' });
        setForm(initialPool);
      }
    } catch (err) {
      setResult({
        kind: 'error',
        message: err instanceof Error ? err.message : '제출에 실패했습니다. 잠시 후 다시 시도하거나 JSON 백업을 이용해 주세요.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <Link to="/recruit" className="text-sm font-medium text-sky-800 hover:underline">
          ← 모집 홈
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">인력풀 등록</h1>
        <p className="mt-2 text-slate-600">
          대외활동·동아리 프로젝트 등에 인력이 필요할 때 연락드릴 수 있도록 남겨 주세요. <strong className="font-medium text-slate-800">동아리 부원 가입과는 별개</strong>입니다.
        </p>
      </div>

      {result?.kind === 'ok' && (
        <div className="mb-6 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">{result.message}</div>
      )}
      {result?.kind === 'local' && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{result.message}</div>
      )}
      {result?.kind === 'error' && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{result.message}</div>
      )}

      <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <label htmlFor="t-name" className={labelClass}>
            이름 <span className="text-red-600">*</span>
          </label>
          <input id="t-name" name="name" value={form.name} onChange={onChange} className={inputClass} autoComplete="name" />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="t-aff" className={labelClass}>
            학번 또는 소속 <span className="text-red-600">*</span>
          </label>
          <input id="t-aff" name="affiliation" value={form.affiliation} onChange={onChange} className={inputClass} placeholder="학과·학번 등 자유 서술" />
          {errors.affiliation && <p className="mt-1 text-sm text-red-600">{errors.affiliation}</p>}
        </div>
        <div>
          <label htmlFor="t-phone" className={labelClass}>
            연락처 <span className="text-red-600">*</span>
          </label>
          <input id="t-phone" name="phone" type="tel" value={form.phone} onChange={onChange} className={inputClass} autoComplete="tel" />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="t-email" className={labelClass}>
            이메일
          </label>
          <input id="t-email" name="email" type="email" value={form.email} onChange={onChange} className={inputClass} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="t-act" className={labelClass}>
            참여 희망 유형 <span className="text-red-600">*</span>
          </label>
          <textarea
            id="t-act"
            name="preferredActivities"
            rows={4}
            value={form.preferredActivities}
            onChange={onChange}
            className={inputClass}
            placeholder="예: 공모전 팀 합류, 단기 데이터 전처리 지원, 동아리 내부 해커톤 등"
          />
          {errors.preferredActivities && <p className="mt-1 text-sm text-red-600">{errors.preferredActivities}</p>}
        </div>
        <div>
          <label htmlFor="t-time" className={labelClass}>
            가능 시간대·주당 참여 가능 시간
          </label>
          <input id="t-time" name="weeklyAvailability" value={form.weeklyAvailability} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="t-skills" className={labelClass}>
            역량·기술 요약
          </label>
          <textarea id="t-skills" name="skillsSummary" rows={4} value={form.skillsSummary} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="t-notes" className={labelClass}>
            기타 전달 사항
          </label>
          <textarea id="t-notes" name="notes" rows={3} value={form.notes} onChange={onChange} className={inputClass} />
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <input id="t-privacy" name="privacyAgree" type="checkbox" checked={form.privacyAgree} onChange={onChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-600" />
          <label htmlFor="t-privacy" className="text-sm text-slate-700">
            <span className="font-medium text-slate-900">개인정보 수집·이용에 동의합니다.</span> 인력 매칭·연락 목적으로만 사용됩니다.{' '}
            <span className="text-red-600">*</span>
          </label>
        </div>
        {errors.privacyAgree && <p className="text-sm text-red-600">{errors.privacyAgree}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-sky-800 py-3 text-sm font-semibold text-white shadow transition hover:bg-sky-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? '제출 중…' : '인력풀 등록 제출'}
        </button>
      </form>
    </div>
  );
}
