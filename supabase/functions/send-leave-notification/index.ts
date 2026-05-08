// Sends a confirmation email to the applicant and a notification to HR
// when a leave application is submitted. Once an email domain is configured
// for the project, this function will send via Lovable Emails.

const HR_EMAIL = "darlington1717@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const data = await req.json();
    console.log("Leave application received:", {
      applicant: `${data.initials} ${data.surname}`,
      email: data.applicant_email,
      type: data.leave_type,
      from: data.start_date,
      to: data.end_date,
    });

    // TODO: Email sending will be wired up once an email domain is configured
    // for the project. For now, the submission is logged and stored in the DB.
    console.log(`Would email applicant: ${data.applicant_email}`);
    console.log(`Would email HR: ${HR_EMAIL}`);

    return new Response(
      JSON.stringify({ success: true, queued: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("send-leave-notification error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : "unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
