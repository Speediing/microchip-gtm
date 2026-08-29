"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_JOBS, type HeroJob } from "@/data/hero-jobs";
import type { Participant } from "@/data/types";
import { useDemoPlayback } from "@/hooks/useDemoPlayback";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function isLight(hex?: string) {
  if (!hex || !hex.startsWith("#") || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

function GrokFace() {
  return (
    <svg className="face" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#111" />
      <rect
        x="5.4"
        y="8"
        width="4.1"
        height="7.4"
        rx="2.05"
        fill="#fff"
        transform="rotate(-18 7.45 11.7)"
      />
      <rect
        x="14.5"
        y="8"
        width="4.1"
        height="7.4"
        rx="2.05"
        fill="#fff"
        transform="rotate(-18 16.55 11.7)"
      />
    </svg>
  );
}

function BotAvatar({ bot }: { bot?: Participant }) {
  const color = bot?.color || "#8E8E93";
  return (
    <span
      className="avatar"
      style={{
        background: color,
        color: isLight(color) ? "#111" : "#fff",
      }}
    >
      {initials(bot?.name || "Bot")}
    </span>
  );
}

function Phone({ job }: { job: HeroJob }) {
  const playback = useDemoPlayback(job.thread);
  const rootRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const setInView = playback.setInView;
  const {
    liveThread,
    people,
    visible,
    visibleCount,
    typingFrom,
    playing,
    done,
    setPlaying,
    replay,
    current,
  } = playback;
  const threadBots = liveThread.participants.filter((p) => p.role === "bot");
  const speakingId =
    typingFrom ||
    (current && people[current.from]?.role === "bot" ? current.from : null);
  const headerBot = (speakingId && people[speakingId]) || threadBots[0];
  const working = Boolean(playing && !done) || Boolean(typingFrom);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [setInView]);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    thread.scrollTop = thread.scrollHeight;
  }, [visibleCount, typingFrom]);

  return (
    <div className="hero-phone" ref={rootRef} aria-label="Grok Bot">
      <div className="notch" aria-hidden />
      <header className="header">
        <span className="back" aria-hidden>
          ‹
        </span>
        <BotAvatar bot={headerBot} />
        <div className="who">
          <strong>{headerBot?.name || "Grok Bot"}</strong>
          <span className={working ? "live is-on" : "live"}>
            <i />
            {working ? "Working" : "Ready"}
          </span>
        </div>
        <button
          type="button"
          className="replay"
          onClick={() => (done ? replay() : setPlaying((value) => !value))}
        >
          {done ? "Replay" : playing ? "Pause" : "Play"}
        </button>
      </header>
      <div className="thread" ref={threadRef} role="log" aria-live="polite">
        {visible.map((message) => {
          const who = people[message.from];
          const isYou = who?.role === "you";
          const isSystem =
            message.kind === "system" || message.kind === "routine";

          if (isSystem) {
            return (
              <div key={message.id} className="note">
                {message.kind === "routine" ? "Routine · " : ""}
                {message.body}
              </div>
            );
          }

          return (
            <div key={message.id} className={isYou ? "row out" : "row in"}>
              {!isYou ? <GrokFace /> : null}
              <div className={isYou ? "bubble out" : "bubble in"}>
                {message.body}
              </div>
            </div>
          );
        })}
        {typingFrom ? (
          <div className="row in">
            <GrokFace />
            <div className="bubble in typing" aria-label="Bot is typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : null}
      </div>
      <div className="composer">
        <span className="plus" aria-hidden>
          +
        </span>
        <span className="field">
          Message {headerBot?.name || "Grok Bot"}
        </span>
        <span className="mic" aria-hidden>
          <svg viewBox="0 0 24 24" width="18" height="18">
            <rect
              x="9"
              y="3.5"
              width="6"
              height="10"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function HeroDemo() {
  const [activeId, setActiveId] = useState(HERO_JOBS[0].id);
  const job = HERO_JOBS.find((item) => item.id === activeId) ?? HERO_JOBS[0];

  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          A sample agent fleet for Microchip Technology
        </p>
        <h1>The agents that keep engineering work moving.</h1>
        <p className="hero-intro">
          Grok Bot gives each agent its own computer, context, and
          routine. They can read across the tools a team already uses,
          prepare the work, and return with an artifact for review.
        </p>
        <div className="hero-phone-jobs">
          {HERO_JOBS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === job.id ? "is-on" : undefined}
              aria-pressed={item.id === job.id}
              onClick={() => setActiveId(item.id)}
            >
              {item.pill}
            </button>
          ))}
        </div>
      </div>
      <div className="hero-bot-demo">
        <Phone key={job.id} job={job} />
      </div>
    </section>
  );
}
