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
        </p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>The message you write</li>
        </ul>
        <p>
          That information is delivered to my inbox via email and stored only
          there. It is never used for marketing, sold, or shared with anyone
          outside the third-party services described below.
        </p>
        <p>
          <strong>Information collected automatically.</strong> Standard server
          logs may record your IP address, user-agent (browser and device
          type), and request timestamps. This is handled by my hosting provider
          (Vercel) for normal operation and abuse prevention.
        </p>
        <p>
          <strong>Aggregate analytics.</strong> The Site uses Plausible
          Analytics to count pageviews, referrers, country, and device type in
          aggregate. Plausible does not use cookies, does not collect personal
          data, does not track you across sites, and does not sell or share
          data with third parties.
        </p>
      </LegalSection>

      <LegalSection heading="How I use it">
        <ul>
          <li>
            Contact-form messages are used to respond to your inquiry. I will
            not add you to any mailing list.
          </li>
          <li>
            Server logs help detect and prevent abuse of the Site.
          </li>
          <li>
            Aggregate analytics helps me understand which content is useful so
            I can improve the Site over time.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Third-party services">
        <p>
          The Site relies on a small set of third-party services. Each acts as
          a data processor and has its own privacy policy:
        </p>
        <ul>
          <li>
            <strong>Resend</strong> (resend.com) — delivers contact-form emails
            to my inbox. Processes your name, email, and message in transit.{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Resend privacy policy
            </a>
          </li>
          <li>
            <strong>Plausible Analytics</strong> (plausible.io) — privacy-
            friendly, cookieless visitor analytics, EU-based.{" "}
            <a
              href="https://plausible.io/privacy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Plausible privacy policy
            </a>
          </li>
          <li>
            <strong>Vercel</strong> (vercel.com) — hosts the Site. Processes
            connection data and server logs.{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Vercel privacy policy
            </a>
          </li>
          <li>
            <strong>Sanity</strong> (sanity.io) — content management system,
            used only by me to publish content. You don&apos;t interact with it
            directly as a visitor.{" "}
            <a
              href="https://www.sanity.io/legal/privacy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sanity privacy policy
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          The Site does not use cookies for analytics, advertising, or
          tracking. The only cookies that may be set are essential ones used
          by the embedded Sanity Studio at <code>/studio</code>, and those
          only affect admin sign-in. See the{" "}
          <Link href="/cookies">Cookie Policy</Link> for the full list.
        </p>
      </LegalSection>

      <LegalSection heading="Data retention">
        <ul>
          <li>
            Contact-form messages remain in my email inbox until I delete them.
            You can request deletion at any time.
          </li>
          <li>
            Aggregate analytics is retained by Plausible per their data
            retention policy.
          </li>
          <li>
            Server logs are retained by Vercel per their policy.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>You can request:</p>
        <ul>
          <li>Access to any data I hold about you</li>
          <li>Correction of inaccurate data</li>
          <li>Deletion of your data</li>
          <li>Information about how it&apos;s processed</li>
        </ul>
        <p>
          Email{" "}
          <a href="mailto:hussain.shaxif002@gmail.com">
            hussain.shaxif002@gmail.com
          </a>{" "}
          and I&apos;ll respond within a reasonable timeframe.
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
          <a href="mailto:hussain.shaxif002@gmail.com">
            hussain.shaxif002@gmail.com
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
