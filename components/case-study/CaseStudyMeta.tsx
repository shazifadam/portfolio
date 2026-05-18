type Props = {
  myRole?: string;
  team?: string;
  showTeamLink?: boolean;
  teamUrl?: string;
  scope?: string;
  deliveredIn?: string;
};

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-cta text-semantic-text-secondary">{label}</p>
      <p className="text-p1 text-brand-black">{value}</p>
    </div>
  );
}

function MetaRowLink({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-cta text-semantic-text-secondary">{label}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-p1 inline-flex items-center gap-1.5 text-brand-black underline underline-offset-4 decoration-brand-black"
      >
        {value}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 17L17 7M17 7H8M17 7V16"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}

export function CaseStudyMeta({ myRole, team, showTeamLink, teamUrl, scope, deliveredIn }: Props) {
  const hasAny = myRole || team || scope || deliveredIn;
  if (!hasAny) return null;

  return (
    <div className="flex flex-col gap-6 rounded-sm border border-brand-light-gray bg-semantic-surface-primary p-6">
      {myRole && <MetaRow label="MY ROLE" value={myRole} />}
      {team && showTeamLink && teamUrl
        ? <MetaRowLink label="TEAM" value={team} href={teamUrl} />
        : team && <MetaRow label="TEAM" value={team} />}
      {scope && <MetaRow label="SCOPE" value={scope} />}
      {deliveredIn && <MetaRow label="DELIVERED IN" value={deliveredIn} />}
    </div>
  );
}
