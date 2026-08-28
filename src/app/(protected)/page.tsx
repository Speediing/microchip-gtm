import { CompareTable } from "@/components/CompareTable";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-watercolor-image"
          src="/brand/microchip-watercolor-hero.webp"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <section className="hero">
            <div>
              <p className="eyebrow">
                A sample agent fleet for Microchip Technology
              </p>
              <h1>The agents that keep engineering work moving.</h1>
              <p className="hero-intro">
                Grok Bot gives each agent its own computer, context, and
                routine. They can read across the tools a team already uses,
                prepare the work, and return with an artifact for review.
              </p>
            </div>
          </section>

          <section className="usecase-framing">
            <p className="eyebrow">Three workflows to discuss</p>
            <h2>
              Start with work around PCIe Gen6 and data center connectivity,
              then teach the fleet the rest of the engineering system.
            </h2>
            <p>
              These are examples based on public priorities. They do not
              describe Microchip&apos;s current workflow.
            </p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
              </a>
            ))}
          </div>
          <RosterChart />
        </div>

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/microchip-watercolor-orbit.webp" alt="" />
      </div>

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">Microchip Technology × SpaceXAI</p>
          <p>A private working leave-behind</p>
        </div>
        <address className="footer-contact">
          <p>Your Cursor contact</p>
          <strong>Tyler Pickler</strong>
          <a href="mailto:tyler.pickler@cursor.com">tyler.pickler@cursor.com</a>
        </address>
      </footer>
    </main>
  );
}
