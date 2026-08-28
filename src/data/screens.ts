import type { JobId } from "./types";

export type SiteKind = "work" | "code" | "tests" | "docs" | "brief";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  status: string;
  items: string[];
  tabs: ChromeTab[];
};

const work = { id: "work", host: "workbench.local", label: "Work" };
const code = { id: "code", host: "code.local", label: "Code" };
const tests = { id: "tests", host: "tests.local", label: "Tests" };
const docs = { id: "docs", host: "docs.local", label: "Docs" };
const brief = { id: "brief", host: "brief.local", label: "Artifact" };

const reviewTabs = [work, code, tests, docs, brief];
const traceTabs = [tests, code, work, docs, brief];
const relayTabs = [docs, code, tests, work, brief];

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "map-change": {
    m1: {
      pill: "Reading the linked work",
      host: "workbench.local",
      path: "/review/gen6-interface-change",
      title: "Gen6 interface change",
      site: "work",
      status: "Context scan started",
      items: [
        "Open the source work item",
        "Collect linked implementation files",
        "Collect tests and design notes",
      ],
      tabs: reviewTabs,
    },
    m2: {
      pill: "Following implementation paths",
      host: "code.local",
      path: "/review/gen6-interface-change",
      title: "Related implementation paths",
      site: "code",
      status: "Questions separated from facts",
      items: [
        "Map interface definitions",
        "List shared call sites",
        "Attach existing validation coverage",
      ],
      tabs: reviewTabs,
    },
    m3: {
      pill: "Writing the review map",
      host: "brief.local",
      path: "/artifacts/change-review-map",
      title: "Sample Gen6 change review map",
      site: "brief",
      status: "Draft ready",
      items: ["Scope mapped", "Evidence linked", "Review questions listed"],
      tabs: reviewTabs,
    },
    m4: {
      pill: "Artifact ready for review",
      host: "brief.local",
      path: "/artifacts/change-review-map",
      title: "Sample Gen6 change review map",
      site: "brief",
      status: "Waiting for engineer review",
      items: ["No code changed", "No review approved"],
      tabs: reviewTabs,
    },
  },
  "trace-impact": {
    m1: {
      pill: "Opening the failed check",
      host: "tests.local",
      path: "/queue/firmware-regression",
      title: "Firmware regression",
      site: "tests",
      status: "Triage started",
      items: [
        "Open the first failing check",
        "Attach the preceding change",
        "List nearby test coverage",
      ],
      tabs: traceTabs,
    },
    m2: {
      pill: "Tracing shared code",
      host: "code.local",
      path: "/trace/firmware-impact",
      title: "Firmware impact trace",
      site: "code",
      status: "Boundary drafted",
      items: [
        "Pin the first changed behavior",
        "List callers and build variants",
        "Keep unverified paths open",
      ],
      tabs: traceTabs,
    },
    m3: {
      pill: "Writing the impact trace",
      host: "brief.local",
      path: "/artifacts/firmware-impact-trace",
      title: "Sample firmware impact trace",
      site: "brief",
      status: "Draft ready",
      items: [
        "Confirmed impact marked",
        "Likely impact labeled",
        "Open checks assigned for review",
      ],
      tabs: traceTabs,
    },
    m4: {
      pill: "Artifact ready for triage",
      host: "brief.local",
      path: "/artifacts/firmware-impact-trace",
      title: "Sample firmware impact trace",
      site: "brief",
      status: "Waiting for triage",
      items: ["No fix merged", "Open checks remain visible"],
      tabs: traceTabs,
    },
  },
  "carry-production": {
    m1: {
      pill: "Reading the approved decision",
      host: "docs.local",
      path: "/decisions/approved-change",
      title: "Approved design decision",
      site: "docs",
      status: "Handoff scan started",
      items: [
        "Read the decision source",
        "Open linked implementation work",
        "Open validation and documentation work",
      ],
      tabs: relayTabs,
    },
    m2: {
      pill: "Checking the release handoff",
      host: "workbench.local",
      path: "/handoff/production-readiness",
      title: "Production handoff",
      site: "work",
      status: "One open update kept visible",
      items: [
        "Attach code review state",
        "Attach completed validation",
        "Keep the documentation update open",
      ],
      tabs: relayTabs,
    },
    m3: {
      pill: "Writing the readiness brief",
      host: "brief.local",
      path: "/artifacts/production-readiness",
      title: "Sample production readiness brief",
      site: "brief",
      status: "Draft ready",
      items: [
        "Decision source linked",
        "Implementation state attached",
        "Unfinished work still visible",
      ],
      tabs: relayTabs,
    },
    m4: {
      pill: "Artifact ready for production review",
      host: "brief.local",
      path: "/artifacts/production-readiness",
      title: "Sample production readiness brief",
      site: "brief",
      status: "Waiting for production review",
      items: ["Nothing released", "No open item was filled in"],
      tabs: relayTabs,
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
