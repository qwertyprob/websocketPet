import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "path";
import { generateFileName } from "@/lib/fileHelper";
import type { ReportAttachment } from "@/types/report";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const UPLOADS_DIR = path.join(__dirname, "../../../../uploads");

export async function saveFileOnDisk(files: ReportAttachment[]) {
  try {
    for (const file of files) {
      file.file_name = generateFileName();
      const filePath = path.join(UPLOADS_DIR, file.file_name);
      await fs.copyFile(filePath, path.join(UPLOADS_DIR, file.file_name));
    }
    // biome-ignore lint/suspicious/noExplicitAny: <cathing error>
  } catch (error: any) {
    throw new Error(error);
  }
}
