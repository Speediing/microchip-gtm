import type { Artifact, CroJob } from "./types";

export const CHANGE_REVIEW_MAP: Extract<Artifact, { kind: "table" }> = {
  kind: "table",
  title: "Sample Gen6 change review map",
  caption:
    "The reviewer gets one place to check scope, evidence, and open questions.",
  columns: ["Area", "Context gathered", "Review question"],
  rows: [
    [
      "Interface",
      "Linked definitions and implementation files",
      "Does the change preserve expected behavior?",
    ],
    [
      "Firmware path",
      "Initialization, fallback, and error handling call sites",
      "Which shared paths need a second review?",
    ],
    [
      "Validation",
      "Existing coverage and the tests tied to this change",
      "What must run before approval?",
    ],
  ],
};

export const FIRMWARE_IMPACT_TRACE: Extract<
  Artifact,
  { kind: "one-pager" }
> = {
  kind: "one-pager",
  title: "Sample firmware impact trace",
  eyebrow: "Review artifact",
  sections: [
    {
      heading: "Start at the failure",
      body: "Pin the regression to the failing check and the first changed behavior.",
    },
    {
      heading: "Follow shared code",
      body: "List callers, build variants, board configurations, and nearby tests that may share the path.",
    },
    {
      heading: "Separate fact from question",
      body: "Mark confirmed impact, likely impact, and the open checks that still need an owner.",
    },
  ],
};

export const PRODUCTION_READINESS_BRIEF: Extract<
  Artifact,
  { kind: "one-pager" }
> = {
  kind: "one-pager",
  title: "Sample production readiness brief",
  eyebrow: "Handoff artifact",
  sections: [
    {
      heading: "Decision",
      body: "Carry the approved design decision and its source into the handoff.",
    },
    {
      heading: "Implementation",
      body: "Link the code change, review state, and any follow-up work.",
    },
    {
      heading: "Validation",
      body: "Show the completed checks and keep unresolved checks visible.",
    },
    {
      heading: "Documentation",
      body: "Name the release note, integration guide, or support material that still needs an update.",
    },
  ],
};

export const JOBS: CroJob[] = [
  {
    id: "map-change",
    number: 1,
    title: "Map a Gen6 change before review",
    trigger: "a PCIe Gen6 change enters review",
    backgroundAction: "reading the issue, code, tests, and design notes",
    problem:
      "A reviewer can spend the first part of a review rebuilding context. The issue, implementation, tests, and prior decision may sit in different tools.",
    botJob:
      "Signal opens the same workspace, follows the links, and prepares a review map. The engineer starts with the change and the questions that matter.",
    storyboard: [
      {
        when: "Change opened",
        label:
          "The review starts. Signal reads the work item and linked context without waiting for a prompt.",
        scene: "inspect",
        visual: {
          kind: "work-intake",
          source: "Illustrative work item",
          title: "PCIe Gen6 interface change",
          detail: "Code, test, and design-note links attached",
        },
      },
      {
        when: "Context gathered",
        label:
          "It follows the implementation path and keeps confirmed context separate from open questions.",
        scene: "map",
        visual: {
          kind: "context-scan",
          sources: [
            { name: "Code", finding: "Related call sites mapped" },
            { name: "Tests", finding: "Coverage links collected" },
            { name: "Design notes", finding: "Prior decision attached" },
          ],
          status: "Review context ready",
        },
      },
      {
        when: "Review starts",
        label: "The final frame is the review map the engineer can use.",
        scene: "send",
        artifact: CHANGE_REVIEW_MAP,
      },
    ],
    unlock:
      "The review opens with the relevant files, tests, and questions already in one place.",
    outcome:
      "A change enters review. A usable context map is ready when the reviewer opens it.",
    demo: {
      title: "Signal",
      subtitle: "Change review, context ready",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "signal",
          name: "Signal",
          role: "bot",
          persona: "Maps a change across the engineering workspace",
          color: "#D32027",
        },
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
          body: "The implementation path and validation links are mapped. I kept the open review questions separate from confirmed context.",
        },
        {
          id: "m3",
          from: "signal",
          kind: "draft",
          draftLabel: "Review map",
          artifact: CHANGE_REVIEW_MAP,
        },
        {
          id: "m4",
          from: "signal",
          kind: "system",
          body: "Nothing changed. The map is ready for the engineer to review.",
        },
      ],
    },
  },
  {
    id: "trace-impact",
    number: 2,
    title: "Trace firmware impact before a fix ships",
    trigger: "a validation regression enters the queue",
    backgroundAction: "following the failure across shared code and tests",
    problem:
      "A local failure can touch shared firmware, drivers, board configurations, and test fixtures. Finding that boundary is careful work.",
    botJob:
      "Trace starts at the failing check, follows the changed path, and prepares an impact note. It marks what is known and what still needs a human decision.",
    storyboard: [
      {
        when: "Regression queued",
        label:
          "The failing check lands. Trace opens the result and the change that came before it.",
        scene: "inspect",
        visual: {
          kind: "work-intake",
          source: "Illustrative validation queue",
          title: "Firmware regression needs triage",
          detail: "Failure, recent change, and test context linked",
        },
      },
      {
        when: "Boundary traced",
        label:
          "It follows shared callers and configurations, then lists the checks that still need an owner.",
        scene: "map",
        visual: {
          kind: "context-scan",
          sources: [
            { name: "Failure", finding: "First changed behavior pinned" },
            { name: "Shared path", finding: "Callers and variants listed" },
            { name: "Validation", finding: "Open checks kept visible" },
          ],
          status: "Impact boundary drafted",
        },
      },
      {
        when: "Triage begins",
        label: "The final frame is the impact trace the team can review.",
        scene: "send",
        artifact: FIRMWARE_IMPACT_TRACE,
      },
    ],
    unlock:
      "The team gets a bounded impact note without asking each engineer to retrace the same path.",
    outcome:
      "A regression enters the queue. A clear impact trace is ready for triage.",
    demo: {
      title: "Trace",
      subtitle: "Regression triage, impact bounded",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "trace",
          name: "Trace",
          role: "bot",
          persona: "Follows firmware changes across code and validation",
          color: "#0F766E",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "trace",
          kind: "routine",
          body: "A sample validation regression entered the queue. I am opening the failed check, recent change, shared callers, and nearby tests.",
        },
        {
          id: "m2",
          from: "trace",
          kind: "text",
          body: "The first changed behavior is pinned. I separated confirmed impact from the configurations and tests that still need review.",
        },
        {
          id: "m3",
          from: "trace",
          kind: "draft",
          draftLabel: "Impact trace",
          artifact: FIRMWARE_IMPACT_TRACE,
        },
        {
          id: "m4",
          from: "trace",
          kind: "system",
          body: "No fix was merged. The impact trace is waiting for triage.",
        },
      ],
    },
  },
  {
    id: "carry-production",
    number: 3,
    title: "Carry a design decision into production",
    trigger: "a design decision is approved",
    backgroundAction: "tracking code, validation, docs, and handoff work",
    problem:
      "An approved decision can fade as work moves through implementation, validation, release notes, and support material. The final handoff then starts from memory.",
    botJob:
      "Relay watches the approved decision and follows the work that should carry it forward. It prepares a readiness brief and leaves unresolved checks in view.",
    storyboard: [
      {
        when: "Decision approved",
        label:
          "The decision is recorded. Relay links it to the work that must carry it into production.",
        scene: "notes",
        visual: {
          kind: "work-intake",
          source: "Illustrative design record",
          title: "Decision approved for implementation",
          detail: "Implementation, validation, and documentation work linked",
        },
      },
      {
        when: "Handoff checked",
        label:
          "It checks each linked thread and keeps unfinished work visible instead of filling the gaps.",
        scene: "inspect",
        visual: {
          kind: "context-scan",
          sources: [
            { name: "Implementation", finding: "Review state attached" },
            { name: "Validation", finding: "Completed checks listed" },
            { name: "Documentation", finding: "Open update named" },
          ],
          status: "Handoff checked",
        },
      },
      {
        when: "Production review",
        label: "The final frame is the readiness brief, not another summary.",
        scene: "send",
        artifact: PRODUCTION_READINESS_BRIEF,
      },
    ],
    unlock:
      "The approved decision stays attached to implementation, validation, and documentation through the handoff.",
    outcome:
      "A decision is approved. The production review opens with a current readiness brief.",
    demo: {
      title: "Relay",
      subtitle: "Decision to production, handoff ready",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "relay",
          name: "Relay",
          role: "bot",
          persona: "Carries approved decisions through the release handoff",
          color: "#B45309",
        },
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
          body: "The handoff is assembled. Completed checks have evidence. The documentation update stays open because no source says it is done.",
        },
        {
          id: "m3",
          from: "relay",
          kind: "draft",
          draftLabel: "Production readiness brief",
          artifact: PRODUCTION_READINESS_BRIEF,
        },
        {
          id: "m4",
          from: "relay",
          kind: "system",
          body: "Nothing was released. The brief is ready for the production review.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
