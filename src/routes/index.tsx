import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Send, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import publicWorksLogo from "@/assets/public-works-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DPWI Leave Portal — Apply for Leave of Absence" },
      { name: "description", content: "Submit your leave of absence application to the Department of Public Works and Infrastructure. Email confirmation sent on submission." },
    ],
  }),
  component: LeavePortal,
});

const LEAVE_TYPES = [
  "Annual Leave",
  "Normal Sick Leave",
  "Family Responsibility Leave",
  "Maternity Leave",
  "Special Leave",
  "Unpaid Leave",
];

type FormState = {
  surname: string;
  initials: string;
  persal_number: string;
  department: string;
  component: string;
  tel: string;
  applicant_email: string;
  address_during_leave: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  working_days: string;
  reason: string;
  signature: string;
};

const empty: FormState = {
  surname: "",
  initials: "",
  persal_number: "",
  department: "",
  component: "",
  tel: "",
  applicant_email: "",
  address_during_leave: "",
  leave_type: LEAVE_TYPES[0],
  start_date: "",
  end_date: "",
  working_days: "",
  reason: "",
  signature: "",
};

function LeavePortal() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("appear")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { error: dbErr } = await supabase.from("leave_applications").insert({
        surname: form.surname,
        initials: form.initials,
        persal_number: form.persal_number,
        department: form.department || null,
        component: form.component || null,
        tel: form.tel || null,
        applicant_email: form.applicant_email,
        address_during_leave: form.address_during_leave || null,
        leave_type: form.leave_type,
        start_date: form.start_date,
        end_date: form.end_date,
        working_days: form.working_days ? Number(form.working_days) : null,
        reason: form.reason || null,
        signature: form.signature || null,
      });
      if (dbErr) throw dbErr;

      // Trigger email notifications (best-effort; failure won't block confirmation)
      try {
        await supabase.functions.invoke("send-leave-notification", {
          body: { ...form },
        });
      } catch (emailErr) {
        console.warn("Email notification failed:", emailErr);
      }

      setDone(true);
      setForm(empty);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-gov-dark-grey min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="w-[90%] max-w-4xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-gov-green">
            <img
              src={publicWorksLogo}
              alt="Department of Public Works & Infrastructure - Free State Province"
              className="h-12 w-auto"
            />
            <span className="hidden md:inline">Leave Portal</span>
          </div>
          <span className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} /> Department of Public Works and Infrastructure
          </span>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="w-full max-w-3xl mx-auto fade-in">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gov-green mb-3">
              Leave Application Portal
            </h1>
            <p className="text-muted-foreground">
              Complete the form below to apply for leave of absence. A confirmation email
              will be sent to you and to HR.
            </p>
          </div>

          {done ? (
            <div className="bg-white rounded-xl shadow-md border-t-8 border-gov-green p-10 text-center">
              <CheckCircle2 size={56} className="mx-auto text-gov-green mb-4" />
              <h2 className="text-2xl font-bold text-gov-green mb-2">Application Submitted</h2>
              <p className="text-muted-foreground mb-6">
                Your leave application has been received. A confirmation email has been
                sent to your address and to HR.
              </p>
              <button
                onClick={() => setDone(false)}
                className="px-6 py-3 rounded bg-gov-green text-white font-semibold hover:bg-gov-green/90"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-white p-6 md:p-10 rounded-xl shadow-md border-t-8 border-gov-green"
            >
              <SubHeading>Personal Details</SubHeading>
              <div className="grid sm:grid-cols-3 gap-5 mb-5">
                <Field label="Surname" required value={form.surname} onChange={(v) => set("surname", v)} />
                <Field label="Initials" required value={form.initials} onChange={(v) => set("initials", v)} />
                <Field label="PERSAL Number" required value={form.persal_number} onChange={(v) => set("persal_number", v)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field label="Email Address" type="email" required value={form.applicant_email} onChange={(v) => set("applicant_email", v)} />
                <Field label="Telephone" type="tel" value={form.tel} onChange={(v) => set("tel", v)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field label="Department" value={form.department} onChange={(v) => set("department", v)} />
                <Field label="Component / Office" value={form.component} onChange={(v) => set("component", v)} />
              </div>
              <div className="mb-5">
                <Field label="Address During Leave Period" value={form.address_during_leave} onChange={(v) => set("address_during_leave", v)} />
              </div>

              <SubHeading>Leave Details</SubHeading>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold mb-1">Type of Leave <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={form.leave_type}
                    onChange={(e) => set("leave_type", e.target.value)}
                    className="w-full p-2.5 border rounded bg-white"
                  >
                    {LEAVE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <Field label="Working Days" type="number" value={form.working_days} onChange={(v) => set("working_days", v)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field label="Start Date" type="date" required value={form.start_date} onChange={(v) => set("start_date", v)} />
                <Field label="End Date" type="date" required value={form.end_date} onChange={(v) => set("end_date", v)} />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-1">Reason / Motivation</label>
                <textarea
                  rows={3}
                  value={form.reason}
                  onChange={(e) => set("reason", e.target.value)}
                  className="w-full p-2.5 border rounded"
                />
              </div>

              <div className="bg-secondary p-4 border-l-4 border-gov-gold text-sm my-6">
                <strong>Certification:</strong> I certify that the information provided is correct.
                I understand that if I fail to return to duty on the first working day following
                the expiry of my leave, disciplinary action may be taken.
              </div>

              <div className="mb-5">
                <Field label="Electronic Signature (Type Full Name)" required value={form.signature} onChange={(v) => set("signature", v)} />
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 rounded bg-gov-green text-white font-semibold hover:bg-gov-green/90 flex items-center gap-2 disabled:opacity-60"
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="bg-gov-dark-grey text-white text-center text-xs py-6 px-4">
        © 2026 Department of Public Works and Infrastructure. Republic of South Africa.
      </footer>
    </div>
  );
}

function Field({
  label, type = "text", value, onChange, required,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">
        {label}{required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2.5 border rounded"
      />
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="bg-gov-green text-white px-4 py-2 rounded mb-5 text-sm font-semibold">{children}</h3>;
}
