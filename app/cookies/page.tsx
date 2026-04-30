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
          cookies</strong>.
        </p>
        <p>
          <strong>Necessary.</strong> The embedded Sanity Studio at{" "}
          <code>/studio</code> uses authentication cookies so I can sign in
          and edit content. These are only relevant if you&apos;re an admin
          (currently: just me). Public pages of the Site don&apos;t set them.
        </p>
        <p>
          <strong>Analytics.</strong> None. The Site uses{" "}
          <a
            href="https://plausible.io/data-policy"
            target="_blank"
            rel="noreferrer noopener"
          >
            Plausible Analytics
          </a>
          , which is cookieless by design — it counts pageviews and aggregate
          metrics without storing anything on your device.
        </p>
        <p>
          <strong>Advertising / marketing.</strong> None. The Site doesn&apos;t
          run ads or remarketing pixels.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party cookies">
        <p>
          A few third-party services may set their own cookies in narrow
          circumstances:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> — the Site&apos;s host may set short-lived
            cookies for security and performance routing. See the{" "}
            <a
              href="https://vercel.com/legal/cookie-policy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Vercel cookie policy
            </a>
            .
          </li>
          <li>
            <strong>Sanity</strong> — admin authentication only, on{" "}
            <code>/studio</code>. See the{" "}
            <a
              href="https://www.sanity.io/legal/privacy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sanity privacy policy
            </a>
            .
          </li>
        </ul>
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
          <a href="mailto:hussain.shaxif002@gmail.com">
            hussain.shaxif002@gmail.com
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
