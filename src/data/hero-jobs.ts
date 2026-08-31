export type HeroIconKind =
  | "change"
  | "impact"
  | "handoff"
  | "review"
  | "validation"
  | "notes"
  | "connectivity"
  | "release";

export type HeroJob = {
  name: string;
  icon: HeroIconKind;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS: HeroJob[] = [
  {
    name: "Map a Gen6 change",
    icon: "change",
    account: "Sample Gen6 interface change",
    signal: "Change entered review",
    work: "I read the work item, linked code, tests, and design notes. Open questions stay separate from confirmed context.",
    result: "Review map ready",
    user: "open the map",
    bot: "ready. nothing was changed.",
  },
  {
    name: "Trace firmware impact",
    icon: "impact",
    account: "Sample validation regression",
    signal: "Failing check entered the queue",
    work: "I opened the failed check and the change that came before it. Shared callers and open checks are listed for triage.",
    result: "Impact note ready",
    user: "start triage",
    bot: "waiting. no fix was merged.",
  },
  {
    name: "Carry a design decision",
    icon: "handoff",
    account: "Sample approved design",
    signal: "Decision recorded",
    work: "I followed the linked implementation, validation, and documentation work. The documentation update stays open because no source says it is done.",
    result: "Readiness brief ready",
    user: "open the brief",
    bot: "ready. nothing was released.",
  },
  {
    name: "Build a review packet",
    icon: "review",
    account: "Sample design review",
    signal: "Review on the calendar",
    work: "I collected the spec, related code, and prior notes. Missing items stay marked as missing.",
    result: "Review pack drafted",
    user: "send the pack",
    bot: "drafted. nothing was sent.",
  },
  {
    name: "List validation gaps",
    icon: "validation",
    account: "Sample validation plan",
    signal: "Plan opened",
    work: "I listed completed checks and the ones that still need an owner. I did not mark any open check done.",
    result: "Check list ready",
    user: "keep the list visible",
    bot: "ready. no check was skipped.",
  },
  {
    name: "Draft a review handoff",
    icon: "notes",
    account: "Sample second review",
    signal: "Change waiting on a reviewer",
    work: "I drafted a note from the existing comments and open questions. It restates what is known and does not add a recommendation.",
    result: "Reviewer note drafted",
    user: "leave it unsent",
    bot: "unsent. the note is waiting.",
  },
  {
    name: "Map connectivity work",
    icon: "connectivity",
    account: "Sample connectivity issue",
    signal: "Related tickets mentioned",
    work: "I collected those links in one place. Related work is listed with its current state. I did not merge or close anything.",
    result: "Reading list ready",
    user: "keep it as a list",
    bot: "listed. this is not a status report.",
  },
  {
    name: "Prepare release notes",
    icon: "release",
    account: "Sample release packet",
    signal: "Change marked for the packet",
    work: "I drafted a note from the approved change and open documentation. The draft names the documentation update that still needs an owner.",
    result: "Release-note draft ready",
    user: "do not publish",
    bot: "drafted. nothing was published.",
  },
];
