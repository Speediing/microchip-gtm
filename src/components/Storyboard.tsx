import type { StoryBeat, StoryScene, StoryVisual } from "@/data/types";

function Screen({ scene }: { scene: StoryScene }) {
  if (scene === "map" || scene === "inspect") {
    return (
      <>
        <circle
          cx="28"
          cy="23"
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.5"
        />
        <circle
          cx="56"
          cy="34"
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.5"
        />
        <path
          d="M34 25 50 32M22 32l-4 9M62 27l4-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.35"
        />
      </>
    );
  }

  if (scene === "notes" || scene === "voice") {
    return (
      <path
        d="M20 18h44M20 26h44M20 34h30M20 42h22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
      />
    );
  }

  return (
    <>
      <rect
        x="20"
        y="16"
        width="44"
        height="25"
        rx="2"
        fill="currentColor"
        opacity="0.08"
      />
      <path
        d="m28 30 7 6 19-15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity="0.55"
      />
    </>
  );
}

function Laptop({ scene }: { scene: StoryScene }) {
  return (
    <svg className="story-laptop" viewBox="0 0 88 58" aria-hidden>
      <rect
        x="10"
        y="4"
        width="68"
        height="44"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="14"
        y="8"
        width="60"
        height="36"
        rx="1.2"
        fill="currentColor"
        opacity="0.06"
      />
      <Screen scene={scene} />
      <path
        d="M4 50h80l3 5H1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LiveVisual({ visual }: { visual: StoryVisual }) {
  switch (visual.kind) {
    case "work-intake":
      return (
        <div className="story-ui story-intake-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>{visual.source}</strong>
            <span>New</span>
          </header>
          <div className="story-intake-body">
            <span className="story-chip-mark" />
            <p>
              <strong>{visual.title}</strong>
              <small>{visual.detail}</small>
            </p>
          </div>
          <footer>Agent computer opened</footer>
        </div>
      );
    case "context-scan":
      return (
        <div className="story-ui story-context-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>Context scan</strong>
            <span>{visual.status}</span>
          </header>
          <ul>
            {visual.sources.map((source) => (
              <li key={source.name}>
                <span>✓</span>
                <p>
                  <strong>{source.name}</strong>
                  <small>{source.finding}</small>
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    default: {
      const exhaustiveVisual: never = visual;
      return exhaustiveVisual;
    }
  }
}

export function Storyboard({ beats }: { beats: StoryBeat[] }) {
  const hasLiveFlow = beats.some((beat) => beat.visual);

  return (
    <ol className={`storyboard${hasLiveFlow ? " is-live-flow" : ""}`}>
      {beats.map((beat) => (
        <li
          key={`${beat.when}-${beat.label}`}
          className={`story-beat${beat.visual ? " has-visual" : ""}`}
        >
          {beat.visual ? (
            <LiveVisual visual={beat.visual} />
          ) : (
            <Laptop scene={beat.scene} />
          )}
          {beat.when ? <p className="story-when">{beat.when}</p> : null}
          <p className="story-line">{beat.label}</p>
        </li>
      ))}
    </ol>
  );
}
