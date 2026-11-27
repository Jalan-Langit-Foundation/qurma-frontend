import { createHash } from "node:crypto";

export function sessionFingerprint(token: string): string {
  return createHash("sha256").update(token).digest("base64url").slice(0, 22);
}
