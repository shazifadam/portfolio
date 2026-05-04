type Props = {
  myRole?: string;
  team?: string;
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

export function CaseStudyMeta({ myRole, team, scope, deliveredIn }: Props) {
  const hasAny = myRole || team || scope || deliveredIn;
  if (!hasAny) return null;

  return (
    <div className="flex flex-col gap-6 rounded-sm border border-brand-light-gray bg-semantic-surface-primary p-6">
      {myRole && <MetaRow label="MY ROLE" value={myRole} />}
      {team && <MetaRow label="TEAM" value={team} />}
      {scope && <MetaRow label="SCOPE" value={scope} />}
      {deliveredIn && <MetaRow label="DELIVERED IN" value={deliveredIn} />}
    </div>
  );
}
