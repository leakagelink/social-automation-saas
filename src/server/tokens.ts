/**
 * Encrypted OAuth token storage pattern.
 * Production: use AWS KMS / GCP KMS to wrap DEKs; store ciphertext + iv + authTag in PostgreSQL.
 */

export interface EncryptedBlob {
  ciphertext: string; // base64
  iv: string; // base64
  authTag: string; // base64
  keyVersion: string;
}

export interface StoredPlatformToken {
  id: string;
  userId: string;
  platform: string;
  externalAccountId: string;
  scopes: string[];
  refreshToken: EncryptedBlob;
  accessToken?: EncryptedBlob;
  accessTokenExpiresAt?: Date;
  status: "active" | "reauth_required" | "revoked";
  updatedAt: Date;
}

export interface TokenVault {
  encrypt(plaintext: string): Promise<EncryptedBlob>;
  decrypt(blob: EncryptedBlob): Promise<string>;
  saveToken(record: Omit<StoredPlatformToken, "id" | "updatedAt">): Promise<StoredPlatformToken>;
  getToken(userId: string, platform: string): Promise<StoredPlatformToken | null>;
  revokeToken(id: string): Promise<void>;
}

/** Dev stub — XOR-ish encoding only for demo; NEVER use in production. */
function devEncode(value: string): EncryptedBlob {
  const ciphertext = Buffer.from(value, "utf8").toString("base64");
  return {
    ciphertext,
    iv: Buffer.from("dev-iv-16bytes!").toString("base64"),
    authTag: Buffer.from("dev-tag").toString("base64"),
    keyVersion: "dev-v0",
  };
}

function devDecode(blob: EncryptedBlob): string {
  return Buffer.from(blob.ciphertext, "base64").toString("utf8");
}

const tokenStore = new Map<string, StoredPlatformToken>();

export const tokenVault: TokenVault = {
  async encrypt(plaintext) {
    return devEncode(plaintext);
  },
  async decrypt(blob) {
    return devDecode(blob);
  },
  async saveToken(record) {
    const id = crypto.randomUUID();
    const saved: StoredPlatformToken = {
      ...record,
      id,
      updatedAt: new Date(),
    };
    tokenStore.set(`${record.userId}:${record.platform}`, saved);
    return saved;
  },
  async getToken(userId, platform) {
    return tokenStore.get(`${userId}:${platform}`) ?? null;
  },
  async revokeToken(id) {
    for (const [key, val] of Array.from(tokenStore.entries())) {
      if (val.id === id) {
        tokenStore.set(key, { ...val, status: "revoked", updatedAt: new Date() });
        return;
      }
    }
  },
};

/**
 * Production checklist:
 * - Server-side only decryption
 * - Never log plaintext tokens
 * - Rotate on invalid_grant from OAuth refresh
 * - Audit every decrypt with userId + reason
 */