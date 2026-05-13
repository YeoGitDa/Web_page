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
        message: err instanceof Error ? err.message : '제출에 실패했습니다.',
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
      </div>

      {result?.kind && (
        <div className="mb-6 rounded-lg border px-4 py-3 text-sm">
          {result.message}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <label htmlFor="t-name" className={labelClass}>이름 *</label>
          <input id="t-name" name="name" value={form.name} onChange={onChange} className={inputClass} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="t-aff" className={labelClass}>학번 또는 소속 *</label>
          <input id="t-aff" name="affiliation" value={form.affiliation} onChange={onChange} className={inputClass} />
          {errors.affiliation && <p className="mt-1 text-sm text-red-600">{errors.affiliation}</p>}
        </div>
        <div>
          <label htmlFor="t-phone" className={labelClass}>연락처 *</label>
          <input id="t-phone" name="phone" value={form.phone} onChange={onChange} className={inputClass} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="t-act" className={labelClass}>참여 희망 유형 *</label>
          <textarea id="t-act" name="preferredActivities" rows={4} value={form.preferredActivities} onChange={onChange} className={inputClass} />
          {errors.preferredActivities && <p className="mt-1 text-sm text-red-600">{errors.preferredActivities}</p>}
        </div>
        <div className="flex items-start gap-3">
          <input id="t-privacy" name="privacyAgree" type="checkbox" checked={form.privacyAgree} onChange={onChange} />
          <label htmlFor="t-privacy" className="text-sm text-slate-700">개인정보 수집·이용 동의 *</label>
        </div>
        {errors.privacyAgree && <p className="text-sm text-red-600">{errors.privacyAgree}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-sky-800 py-3 text-sm font-semibold text-white"
        >
          {submitting ? '제출 중…' : '인력풀 등록 제출'}
        </button>
      </form>
    </div>
  );
}
