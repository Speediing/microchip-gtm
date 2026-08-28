import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "team",
    name: "Your team",
    blurb: "People make the decisions. The agent fleet prepares the work around them.",
    color: "#E8E8ED",
    mark: "You",
    seat: true,
  },
  {
    id: "signal",
    name: "Signal",
    blurb: "Uses its computer to map a change across issues, code, tests, and notes.",
    jobId: "map-change",
    color: "#D32027",
  },
  {
    id: "trace",
    name: "Trace",
    blurb: "Uses its computer to follow a regression through shared paths and validation.",
    jobId: "trace-impact",
    color: "#0F766E",
  },
  {
    id: "relay",
    name: "Relay",
    blurb: "Uses its computer to carry a decision through the production handoff.",
    jobId: "carry-production",
    color: "#B45309",
  },
];
