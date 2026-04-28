import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  const { name, email, message } = (await req.json()) as Payload;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "shazifadam.com <hello@shazifadam.com>",
      to,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send. Try again." },
      { status: 502 },
    );
  }
}
