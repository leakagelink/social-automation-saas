/**
 * User domain module — sync with Clerk webhooks in production.
 */

export type PlanTier = "free" | "starter" | "growth" | "agency";

export interface UserRecord {
  id: string;
  clerkUserId: string;
  email: string;
  plan: PlanTier;
  workspaceId: string;
  createdAt: Date;
}

export interface UserRepository {
  findByClerkId(clerkUserId: string): Promise<UserRecord | null>;
  upsertFromClerk(payload: {
    clerkUserId: string;
    email: string;
  }): Promise<UserRecord>;
  updatePlan(clerkUserId: string, plan: PlanTier): Promise<UserRecord>;
}

/** In-memory stub until PostgreSQL is wired. */
const store = new Map<string, UserRecord>();

export const userRepository: UserRepository = {
  async findByClerkId(clerkUserId) {
    return store.get(clerkUserId) ?? null;
  },
  async upsertFromClerk({ clerkUserId, email }) {
    const existing = store.get(clerkUserId);
    if (existing) return existing;
    const record: UserRecord = {
      id: crypto.randomUUID(),
      clerkUserId,
      email,
      plan: "free",
      workspaceId: crypto.randomUUID(),
      createdAt: new Date(),
    };
    store.set(clerkUserId, record);
    return record;
  },
  async updatePlan(clerkUserId, plan) {
    const user = store.get(clerkUserId);
    if (!user) throw new Error("User not found");
    const updated = { ...user, plan };
    store.set(clerkUserId, updated);
    return updated;
  },
};