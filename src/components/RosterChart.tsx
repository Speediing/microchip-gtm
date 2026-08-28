import { FLEET, type FleetBot } from "@/data/fleet";

function initials(bot: FleetBot) {
  if (bot.mark) return bot.mark;
  const parts = bot.name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

function isLight(hex: string) {
  if (!hex.startsWith("#") || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

function Box({
  bot,
  chief = false,
}: {
  bot: FleetBot;
  chief?: boolean;
}) {
  const className = chief ? "org-box is-chief" : "org-box";
  const body = (
    <>
      <span
        className="org-avatar"
        style={{
          background: bot.color,
          color: isLight(bot.color) ? "#111" : "#fff",
        }}
        aria-hidden
      >
        {initials(bot)}
      </span>
      {!bot.seat ? (
        <span className="org-computer" aria-label={`${bot.name} computer`}>
          <svg viewBox="0 0 28 22" aria-hidden>
            <rect x="2" y="2" width="24" height="15" rx="2" />
            <path d="M9 20h10M14 17v3" />
          </svg>
        </span>
      ) : null}
      <span className="org-name">{bot.name}</span>
      <span className="org-blurb">{bot.blurb}</span>
    </>
  );

  if (bot.jobId) {
    return (
      <a className={className} href={`#${bot.jobId}`}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function RosterChart() {
  const seat = FLEET.find((item) => item.seat);
  const agents = FLEET.filter((item) => !item.seat);

  if (!seat) return null;

  return (
    <section id="roster" className="roster">
      <h2>A small fleet, each with its own computer</h2>
      <p className="section-lede">
        The work itself can be the trigger. A change opens, a regression lands,
        or a decision is approved. The right agent picks it up and returns with
        an artifact for a person to review.
      </p>

      <div className="org" role="tree">
        <div className="org-top">
          <Box bot={seat} chief />
        </div>
        <div className="org-branch">
          <div className="org-connect" aria-hidden>
            <i className="org-stem" />
            <i className="org-bar" />
          </div>
          <ul className="org-kids">
            {agents.map((agent) => (
              <li key={agent.id} className="org-kid">
                <Box bot={agent} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
