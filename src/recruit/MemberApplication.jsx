import { useState } from 'react';
import { Link } from 'react-router-dom';
import { copyEnvelopeToClipboard, persistEnvelopeLocally, submitRecruitment } from './submitRecruitment.js';

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600';
const labelClass = 'block text-sm font-medium text-slate-700';

const initialMember = {
  name: '',
  studentId: '',
  major: '',
  phone: '',
  email: '',
  interestDomains: '',
  techStack: '',
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

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setResult(null);
    if (!validate()) return;
    setSubmitting(true);
    const payload = {
      name: form.name.trim(),
      studentId: form.studentId.trim(),
      major: form.major.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      interestDomains: form.interestDomains.trim() || null,
      techStack: form.techStack.trim() || null,
      projectHistory: form.projectHistory.trim() || null,
      motivation: form.motivation.trim(),
      expectations: form.expectations.trim() || null,
    };
    try {
      const { delivered, envelope } = await submitRecruitment('member', payload);
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
        setResult({ kind: 'ok', message: '제출이 완료되었습니다. 연락을 기다려 주세요.' });
        setForm(initialMember);
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
        <Link to="/recruit" className="text-sm font-medium text-emerald-800 hover:underline">
          ← 모집 홈
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">동아리 부원 지원서</h1>
      </div>

      {result?.kind && (
        <div className="mb-6 rounded-lg border px-4 py-3 text-sm">
          {result.message}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <label htmlFor="m-name" className={labelClass}>이름 *</label>
          <input id="m-name" name="name" value={form.name} onChange={onChange} className={inputClass} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="m-sid" className={labelClass}>학번 *</label>
          <input id="m-sid" name="studentId" value={form.studentId} onChange={onChange} className={inputClass} />
          {errors.studentId && <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>}
        </div>
        <div>
          <label htmlFor="m-major" className={labelClass}>전공 *</label>
          <input id="m-major" name="major" value={form.major} onChange={onChange} className={inputClass} />
          {errors.major && <p className="mt-1 text-sm text-red-600">{errors.major}</p>}
        </div>
        <div>
          <label htmlFor="m-phone" className={labelClass}>연락처 *</label>
          <input id="m-phone" name="phone" type="tel" value={form.phone} onChange={onChange} className={inputClass} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="m-mot" className={labelClass}>지원 동기 *</label>
          <textarea id="m-mot" name="motivation" rows={5} value={form.motivation} onChange={onChange} className={inputClass} />
          {errors.motivation && <p className="mt-1 text-sm text-red-600">{errors.motivation}</p>}
        </div>
        <div className="flex items-start gap-3">
          <input id="m-privacy" name="privacyAgree" type="checkbox" checked={form.privacyAgree} onChange={onChange} />
          <label htmlFor="m-privacy" className="text-sm text-slate-700">개인정보 수집·이용 동의 *</label>
        </div>
        {errors.privacyAgree && <p className="text-sm text-red-600">{errors.privacyAgree}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-emerald-800 py-3 text-sm font-semibold text-white"
        >
          {submitting ? '제출 중…' : '지원서 제출'}
        </button>
      </form>
    </div>
  );
}
