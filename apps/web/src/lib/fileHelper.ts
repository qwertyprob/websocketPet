import crypto from "crypto";

export function generateFileName() {
  const unique = crypto.randomUUID();
  return `${unique}`;
}

export function normalizeSize(bytes:number){
  const mb = bytes / (1024 * 1024);

  return mb.toFixed(2);
}
