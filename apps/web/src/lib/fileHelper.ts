import crypto from "crypto";

export function generateFileName() {
  const unique = crypto.randomUUID();
  return `${unique}`;
}
