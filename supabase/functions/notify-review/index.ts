// ============================================================
// Supabase Edge Function: notify-review
// Sends email notification to bluelineautosuk@gmail.com on new review submission
// ============================================================
// To deploy to your Supabase project:
// 1. Install Supabase CLI: npm install -g supabase
// 2. Set RESEND_API_KEY secret: supabase secrets set RESEND_API_KEY=re_your_api_key
// 3. Deploy function: supabase functions deploy notify-review

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RECIPIENT_EMAIL = "bluelineautosuk@gmail.com";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { customer_name, service_received, star_rating, review_text } = payload.record || payload;

    if (!customer_name || !review_text) {
      return new Response(JSON.stringify({ error: "Missing required review fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not configured in Supabase secrets. Email skipped.");
      return new Response(
        JSON.stringify({
          success: false,
          warning: "RESEND_API_KEY not configured. Set secret in Supabase dashboard to enable email delivery.",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Stars display
    const stars = "★".repeat(Number(star_rating) || 5) + "☆".repeat(5 - (Number(star_rating) || 5));

    // Send email using Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Blueline Reviews <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: `New Customer Review Pending Approval: ${customer_name} (${star_rating}/5)`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="background-color: #0f1d38; padding: 20px; border-radius: 6px; text-align: center; color: white;">
              <h2 style="margin: 0; font-size: 20px;">BLUELINE AUTO SERVICES LTD</h2>
              <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">New Customer Review Received</p>
            </div>
            
            <div style="padding: 24px 0;">
              <p style="font-size: 15px; color: #334155;">A new customer review has been submitted and is <strong>pending administrator approval</strong>:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px; font-weight: bold; color: #475569; width: 35%;">Customer Name:</td>
                  <td style="padding: 10px; color: #0f172a;">${customer_name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px; font-weight: bold; color: #475569;">Rating:</td>
                  <td style="padding: 10px; color: #f59e0b; font-size: 18px;">${stars} (${star_rating}/5)</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px; font-weight: bold; color: #475569;">Service Received:</td>
                  <td style="padding: 10px; color: #0f172a;">${service_received || "General Service"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #475569; vertical-align: top;">Review:</td>
                  <td style="padding: 10px; color: #0f172a; line-height: 1.6; font-style: italic;">"${review_text}"</td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #0066ff; border-radius: 4px;">
                <p style="margin: 0; font-size: 13px; color: #475569;">
                  <strong>Action Required:</strong> Log in to the Blueline Auto Services website Admin Portal or your Supabase Table Editor to approve or reject this testimonial before it appears publicly.
                </p>
              </div>
            </div>

            <div style="text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              Blueline Auto Services Ltd • 65 Watch House Lane, Bentley, Doncaster, DN5 9LY
            </div>
          </div>
        `,
      }),
    });

    const resData = await res.json();
    return new Response(JSON.stringify(resData), {
      status: res.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
