
CREATE TABLE public.leave_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  surname text NOT NULL,
  initials text NOT NULL,
  persal_number text NOT NULL,
  department text,
  component text,
  tel text,
  applicant_email text NOT NULL,
  address_during_leave text,
  leave_type text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  working_days numeric,
  reason text,
  signature text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.leave_applications ENABLE ROW LEVEL SECURITY;

-- Public form: anyone can submit
CREATE POLICY "Anyone can submit a leave application"
ON public.leave_applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);
