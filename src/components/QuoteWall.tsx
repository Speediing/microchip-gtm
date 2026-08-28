import { QUOTES } from "@/data/quotes";

const FEATURED_SOURCES = [
  "https://x.com/naval/status/2090497355649008059",
  "https://x.com/prasenx/status/2087239768006590487",
  "https://x.com/martin_casado/status/2087273088002216104",
];

export function QuoteWall() {
  const featuredQuotes = QUOTES.filter((quote) =>
    FEATURED_SOURCES.includes(quote.source),
  );

  return (
    <section id="testimonials" className="quotes">
      <h2>From people using Grok Bot</h2>
      <p className="section-lede">
        Public posts from people who have tried the product.
      </p>
      <div className="quote-thread">
        {featuredQuotes.map((quote) => (
          <article
            key={`${quote.handle}-${quote.date}-${quote.source}`}
            className="quote-row"
          >
            <div className="quote-who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={quote.avatar}
                alt=""
                width={36}
                height={36}
                className="quote-avatar"
              />
              <div>
                <p className="quote-name">{quote.name}</p>
                <p className="quote-handle">{quote.handle}</p>
              </div>
            </div>
            <blockquote className="quote-bubble">{quote.quote}</blockquote>
            {quote.source ? (
              <a
                href={quote.source}
                target="_blank"
                rel="noopener noreferrer"
                className="quote-source"
              >
                Read source →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
