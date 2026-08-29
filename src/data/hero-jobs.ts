import type { DemoThread } from "./types";

export type HeroJob = {
  id: string;
  pill: string;
  thread: DemoThread;
};

function bot(
  id: string,
  name: string,
  persona: string,
  color: string,
): DemoThread["participants"][number] {
  return { id, name, role: "bot", persona, color };
}

const you = { id: "you", name: "You", role: "you" as const };

export const HERO_JOBS: HeroJob[] = [
  {
    id: "map",
    pill: "Map a Gen6 change",
    thread: {
      title: "Signal",
      subtitle: "Change review, context ready",
      participants: [
        you,
        bot(
          "signal",
          "Signal",
          "Maps a change across the engineering workspace",
          "#D32027",
        ),
      ],
      messages: [
        {
          id: "m1",
          from: "signal",
          kind: "routine",
          body: "A sample Gen6 interface change entered review. I am reading the work item, linked code, tests, and design notes.",
        },
        {
          id: "m2",
          from: "signal",
          kind: "text",
          body: "The implementation path and test links are in one place. Open questions stay separate from confirmed context.",
        },
        {
          id: "m3",
          from: "signal",
          kind: "system",
          body: "Nothing changed. The map is ready for the engineer.",
        },
      ],
    },
  },
  {
    id: "follow",
    pill: "Trace firmware impact",
    thread: {
      title: "Trace",
      subtitle: "Regression triage, impact bounded",
      participants: [
        you,
        bot(
          "trace",
          "Trace",
          "Follows firmware changes across code and validation",
          "#0F766E",
        ),
      ],
      messages: [
        {
          id: "m1",
          from: "trace",
          kind: "routine",
          body: "A sample validation regression entered the queue. I am opening the failed check and the change that came before it.",
        },
        {
          id: "m2",
          from: "trace",
          kind: "text",
          body: "The first changed behavior is pinned. Shared callers and open checks are listed for triage.",
        },
        {
          id: "m3",
          from: "trace",
          kind: "system",
          body: "No fix was merged. The impact note is waiting.",
        },
      ],
    },
  },
  {
    id: "carry",
    pill: "Carry a design decision",
    thread: {
      title: "Relay",
      subtitle: "Decision to production, handoff ready",
      participants: [
        you,
        bot(
          "relay",
          "Relay",
          "Carries approved decisions through the release handoff",
          "#B45309",
        ),
      ],
      messages: [
        {
          id: "m1",
          from: "relay",
          kind: "routine",
          body: "A sample design decision was approved. I am following the linked implementation, validation, and documentation work.",
        },
        {
          id: "m2",
          from: "relay",
          kind: "text",
          body: "Completed checks have evidence. The documentation update stays open because no source says it is done.",
        },
        {
          id: "m3",
          from: "relay",
          kind: "system",
          body: "Nothing was released. The brief is ready for review.",
        },
      ],
    },
  },
  {
    id: "collect",
    pill: "Build a review packet",
    thread: {
      title: "Atlas",
      subtitle: "Design review, files gathered",
      participants: [
        you,
        bot(
          "atlas",
          "Atlas",
          "Collects the files a reviewer needs before a design meeting",
          "#526F78",
        ),
      ],
      messages: [
        {
          id: "m1",
          from: "you",
          kind: "text",
          body: "Can you gather the files for the sample interface design review?",
        },
        {
          id: "m2",
          from: "atlas",
          kind: "text",
          body: "I collected the spec, related code, and prior notes. Missing items stay marked as missing.",
        },
        {
          id: "m3",
          from: "atlas",
          kind: "system",
          body: "The pack is a draft for the reviewer.",
        },
      ],
    },
  },
  {
    id: "list",
    pill: "List validation gaps",
    thread: {
      title: "Gauge",
      subtitle: "Validation plan, open checks visible",
      participants: [
        you,
        bot(
          "gauge",
          "Gauge",
          "Lists completed checks and the ones that still need an owner",
          "#6F8279",
        ),
      ],
      messages: [
        {
          id: "m1",
          from: "gauge",
          kind: "routine",
          body: "A sample validation plan is open. I am listing completed checks and the ones that still need an owner.",
        },
        {
          id: "m2",
          from: "gauge",
          kind: "text",
          body: "Completed checks have results. Open checks stay visible. I did not mark any of those done.",
        },
        {
          id: "m3",
          from: "gauge",
          kind: "system",
          body: "No check was skipped. The list is ready.",
        },
      ],
    },
  },
  {
    id: "draft",
    pill: "Draft a review handoff",
    thread: {
      title: "Brief",
      subtitle: "Second review, note unsent",
      participants: [
        you,
        bot(
          "brief",
          "Brief",
          "Drafts a reviewer note from existing comments and open questions",
          "#3F6212",
        ),
      ],
      messages: [
        {
          id: "m1",
          from: "you",
          kind: "text",
          body: "Draft a firmware review handoff from the existing comments.",
        },
        {
          id: "m2",
          from: "brief",
          kind: "text",
          body: "The note restates what is known and what still needs a decision. It does not add a recommendation.",
        },
        {
          id: "m3",
          from: "brief",
          kind: "system",
          body: "The note is unsent.",
        },
      ],
    },
  },
  {
    id: "pull",
    pill: "Map connectivity work",
    thread: {
      title: "Span",
      subtitle: "Related tickets, reading list",
      participants: [
        you,
        bot(
          "span",
          "Span",
          "Pulls related connectivity work into one reading list",
          "#334155",
        ),
      ],
      messages: [
        {
          id: "m1",
          from: "span",
          kind: "routine",
          body: "A sample data center connectivity issue mentioned related work. I am collecting those links in one place.",
        },
        {
          id: "m2",
          from: "span",
          kind: "text",
          body: "Related work is listed with its current state. I did not merge or close anything.",
        },
        {
          id: "m3",
          from: "span",
          kind: "system",
          body: "This is a reading list, not a status report from the team.",
        },
      ],
    },
  },
  {
    id: "prepare",
    pill: "Prepare release notes",
    thread: {
      title: "Ledger",
      subtitle: "Release packet, draft only",
      participants: [
        you,
        bot(
          "ledger",
          "Ledger",
          "Prepares a release-note draft from the approved change",
          "#9F171D",
        ),
      ],
      messages: [
        {
          id: "m1",
          from: "ledger",
          kind: "routine",
          body: "A sample firmware change is marked for the next release packet. I am drafting a note from the approved change and open documentation.",
        },
        {
          id: "m2",
          from: "ledger",
          kind: "text",
          body: "The draft names the change and the documentation update that still needs an owner.",
        },
        {
          id: "m3",
          from: "ledger",
          kind: "system",
          body: "Nothing was published.",
        },
      ],
    },
  },
];
