import { NextResponse } from "next/server";
import { Resend } from "resend";

// Node runtime so the Resend SDK has access to crypto/streams it expects.
// Edge runtime would also work but offers no advantage for this endpoint.
export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 },
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long (5000 chars max)." },
      { status: 400 },
    );
  }

  // Sender + recipient + key all come from env so the same code path works
  // against Resend's sandbox sender (onboarding@resend.dev) before the
  // shazifadam.com domain is verified, and against the production sender
  // afterwards — no code change required.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      // Lightweight HTML so the inbox preview reads cleanly without a heavy
      // template — the plain-text fallback above stays readable too.
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111110;line-height:1.5">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json(
        { error: "Failed to send. Try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] resend threw", err);
    return NextResponse.json(
      { error: "Failed to send. Try again." },
      { status: 502 },
    );
  }
}

// Minimal HTML escape so user input can't inject markup into the email body.
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
