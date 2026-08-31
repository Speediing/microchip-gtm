import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <div className="heard-slide">
        {slides.map((slide) => (
          <article key={slide.n}>
            <p className="heard-tag">{slide.kicker || `Frame ${slide.n}`}</p>
            <h3>{slide.title}</h3>
            <p>{slide.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
