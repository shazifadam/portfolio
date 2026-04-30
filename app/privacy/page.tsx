import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How shazifadam.com collects, uses, and protects information from visitors and contact-form submissions.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="April 30, 2026">
      <LegalSection heading="Who I am">
        <p>
          Shazif Adam is a sole proprietor based in Malé, Maldives, registered
          with the Maldives Ministry of Economic Development under{" "}
          <strong>SP Registration No.: SP20142020</strong>. This privacy policy
          applies to <strong>shazifadam.com</strong> (the &ldquo;Site&rdquo;) —
          my personal portfolio.
        </p>
        <p>
          Throughout this policy, &ldquo;I&rdquo;, &ldquo;me&rdquo;, and
          &ldquo;my&rdquo; refer to Shazif Adam. &ldquo;You&rdquo; and
          &ldquo;your&rdquo; refer to anyone visiting the Site or interacting
          with its contact form.
        </p>
      </LegalSection>

      <LegalSection heading="What I collect">
        <p>
          <strong>Information you submit through the contact form.</strong> The
          form at <Link href="/contact">/contact</Link> asks for three fields:
          your name, your email, and the message you write. That information is
          delivered to my inbox by email and stored only there.
        </p>
        <p>
          <strong>Aggregate analytics.</strong> The Site uses Plausible
          Analytics to count pageviews, referrers, country, and device type in
          aggregate. Plausible does not use cookies, does not collect personal
          data, and does not track you across sites.
        </p>
      </LegalSection>

      <LegalSection heading="How I use it">
        <p>
          Contact-form messages are used to reply to your inquiry — never for
          marketing, never sold or shared. Aggregate analytics helps me
          understand which content is useful so I can improve the Site over
          time.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party services">
        <p>
          Two third-party services touch your data, each as a data processor
          with its own privacy policy:
        </p>
        <ul>
          <li>
            <strong>Resend</strong> — delivers contact-form emails to my
            inbox.{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Resend privacy policy
            </a>
          </li>
          <li>
            <strong>Plausible Analytics</strong> — privacy-friendly,
            cookieless visitor analytics.{" "}
            <a
              href="https://plausible.io/privacy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Plausible privacy policy
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          The Site does not use cookies for analytics, advertising, or
          tracking. See the <Link href="/cookies">Cookie Policy</Link> for
          details.
        </p>
      </LegalSection>

      <LegalSection heading="Data retention">
        <p>
          Contact-form messages remain in my email inbox until I delete them.
          You can request deletion at any time.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can request access to, correction of, or deletion of any data I
          hold about you. Email{" "}
          <a href="mailto:shazifadam@gmail.com">shazifadam@gmail.com</a> and
          I&apos;ll respond within a reasonable timeframe.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          This policy may be updated to reflect changes in services or legal
          requirements. The &ldquo;Last updated&rdquo; date at the top of this
          page reflects the most recent revision.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Shazif Adam
          <br />
          SP Registration No.: SP20142020
          <br />
          Malé, Maldives
          <br />
          <a href="mailto:shazifadam@gmail.com">shazifadam@gmail.com</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
