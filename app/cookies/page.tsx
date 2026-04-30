import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How shazifadam.com uses cookies — short answer: barely at all. Here's the full breakdown.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="April 30, 2026">
      <LegalSection heading="Who I am">
        <p>
          This Cookie Policy applies to <strong>shazifadam.com</strong>, the
          personal portfolio of <strong>Shazif Adam</strong> (sole proprietor,
          SP Registration No.:{" "}
          <strong>SP20142020</strong>, Malé, Maldives).
        </p>
        <p>
          For the broader picture of what data is collected and how it&apos;s
          used, see the <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="What are cookies">
        <p>
          Cookies are small text files a website places on your device when
          you visit it. They&apos;re commonly used for analytics,
          personalisation, and tracking across sites.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies on this site">
        <p>
          shazifadam.com is designed to be cookie-light. As a public visitor
          you should expect <strong>no analytics, advertising, or tracking
          cookies</strong>. Analytics is handled by{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noreferrer noopener"
          >
            Vercel Web Analytics
          </a>
          , which is cookieless by design.
        </p>
      </LegalSection>

      <LegalSection heading="How to manage cookies">
        <p>
          Modern browsers let you control cookies via settings:
        </p>
        <ul>
          <li>Chrome: Settings → Privacy and Security → Cookies</li>
          <li>Safari: Settings → Privacy → Manage Website Data</li>
          <li>Firefox: Settings → Privacy &amp; Security → Cookies and Site Data</li>
          <li>Edge: Settings → Cookies and site permissions</li>
        </ul>
        <p>
          Disabling cookies will not affect normal browsing of public pages on
          shazifadam.com.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          This Cookie Policy may be updated to reflect changes in the
          underlying services or new legal requirements. The &ldquo;Last
          updated&rdquo; date at the top of this page reflects the most recent
          revision.
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
