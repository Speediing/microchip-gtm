import type { StoryBeat } from "@/data/types";
import { ArtifactCard } from "./ArtifactCard";
import { HeardSlide } from "./HeardSlide";

export function ChapterPayoff({
  beat,
  value,
}: {
  beat: StoryBeat;
  wash?: string;
  value?: string;
}) {
  const body = beat.artifact ? (
    <ArtifactCard artifact={beat.artifact} />
  ) : beat.slides?.length ? (
    <HeardSlide slides={beat.slides} size="lg" />
  ) : null;

  if (!body) return null;

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      <div className="chapter-artifact">{body}</div>
      {value ? <p className="leave-value">{value}</p> : null}
    </div>
  );
}
