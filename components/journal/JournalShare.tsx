import Image from "next/image";

// Share row at the end of a journal article. Each icon links to the
// platform's web-share intent (or, for Instagram which doesn't support
// URL sharing, to Shazif's profile). Icons live in /public/icons/social
// as 24×24 SVGs with #111111 fills baked in — fine on the white article
// surface; inline as <Image> so they ship statically without a runtime
// dependency on a sprite or icon library.

const SITE_URL = "https://shazifadam.com";

type Platform = {
  name: string;
  icon: string;
  // Instagram has no public share-URL intent, so it drops to a profile
  // link. The other three accept a URL (and Threads also a title).
  href: (encodedUrl: string, encodedTitle: string) => string;
};

const PLATFORMS: Platform[] = [
  {
    name: "Facebook",
    icon: "/icons/social/facebook-01.svg",
    href: (encodedUrl) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  },
  {
    name: "Instagram",
    icon: "/icons/social/instagram.svg",
    href: () => "https://www.instagram.com/shazifadam/",
  },
  {
    name: "LinkedIn",
    icon: "/icons/social/linkedin-01.svg",
    href: (encodedUrl) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  },
  {
    name: "Threads",
    icon: "/icons/social/threads-rectangle.svg",
    href: (encodedUrl, encodedTitle) =>
      `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
  },
];

export function JournalShare({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const articleUrl = `${SITE_URL}/journal/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-journal-meta text-semantic-text-secondary">
        Share this article
      </p>
      <div className="flex items-center gap-5">
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.href(encodedUrl, encodedTitle)}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Share on ${p.name}`}
            className="inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-60"
          >
            <Image src={p.icon} alt="" width={24} height={24} />
          </a>
        ))}
      </div>
    </div>
  );
}
