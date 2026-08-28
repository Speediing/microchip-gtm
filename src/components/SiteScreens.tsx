import type { DemoMessage } from "@/data/types";
import type { ComputerBeat, SiteKind } from "@/data/screens";
import { ArtifactCard } from "./ArtifactCard";

const SITE_LABEL: Record<SiteKind, string> = {
  work: "Work queue",
  code: "Code workspace",
  tests: "Validation",
  docs: "Design notes",
  brief: "Artifact",
};

export function SiteScreen({
  beat,
  message,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
}) {
  return (
    <div className={`workspace-app is-${beat.site}`}>
      <header className="workspace-app-bar">
        <strong>{SITE_LABEL[beat.site]}</strong>
        <span>Illustrative workspace</span>
      </header>
      <section className="workspace-app-head">
        <p>{beat.title}</p>
        <span>{beat.status}</span>
      </section>
      <div className="workspace-app-body">
        <ol>
          {beat.items.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
              <i aria-hidden>✓</i>
            </li>
          ))}
        </ol>
        {message?.artifact ? (
          <div className="workspace-artifact">
            <ArtifactCard artifact={message.artifact} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
