/**
 * Scheduler / queue sketch — wire to BullMQ, Inngest, or Trigger.dev in production.
 */

export type JobStatus =
  | "pending"
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "dead_letter";

export interface ScheduledPublishJob {
  id: string;
  userId: string;
  idempotencyKey: string;
  platform: string;
  payload: {
    caption: string;
    hashtags: string[];
    mediaUrl?: string;
    isReel?: boolean;
  };
  runAt: Date;
  timezone: string;
  status: JobStatus;
  attempts: number;
  lastError?: string;
}

export interface QueueAdapter {
  enqueue(job: Omit<ScheduledPublishJob, "id" | "status" | "attempts">): Promise<ScheduledPublishJob>;
  listPending(userId: string): Promise<ScheduledPublishJob[]>;
  markComplete(id: string): Promise<void>;
  retry(id: string): Promise<ScheduledPublishJob>;
}

const jobs = new Map<string, ScheduledPublishJob>();

export const publishQueue: QueueAdapter = {
  async enqueue(input) {
    const job: ScheduledPublishJob = {
      ...input,
      id: crypto.randomUUID(),
      status: "queued",
      attempts: 0,
    };
    jobs.set(job.id, job);
    // Production: LPUSH to Redis / submit to Inngest
    return job;
  },
  async listPending(userId) {
    return Array.from(jobs.values()).filter(
      (j) => j.userId === userId && ["pending", "queued", "running"].includes(j.status)
    );
  },
  async markComplete(id) {
    const j = jobs.get(id);
    if (j) jobs.set(id, { ...j, status: "completed" });
  },
  async retry(id) {
    const j = jobs.get(id);
    if (!j) throw new Error("Job not found");
    const updated = {
      ...j,
      status: "queued" as const,
      attempts: j.attempts + 1,
      lastError: undefined,
    };
    jobs.set(id, updated);
    return updated;
  },
};

export interface CronSchedule {
  /** CRON expression or preset key */
  expression: string;
  timezone: string;
  days: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
  slots: string[]; // "09:00", "18:30"
}

export function describeSchedule(cron: CronSchedule): string {
  return `${cron.days.join(", ")} at ${cron.slots.join(", ")} (${cron.timezone})`;
}