import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "path";
import { generateFileName } from "@/lib/fileHelper";
import type { ReportAttachment } from "@/types/report";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const UPLOADS_DIR = path.join(__dirname, "../../../../uploads");


export async function checkIfFileExists(fileName: string) {
  try {
    const filesOnDisk = await fs.readdir(UPLOADS_DIR);

    if (filesOnDisk.includes(fileName)) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("Error checking file existence:", err);
    return false;
  }
}

export async function saveFilesAsync(
  files: File[]
): Promise<ReportAttachment[]> {
  const saved: ReportAttachment[] = [];

  for (const file of files) {
    const ext = path.extname(file.name); // ".jpg", ".mp4" и т.д.
    const fileName = generateFileName() + ext;
    const filePath = path.join(UPLOADS_DIR, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    saved.push({
      file_name: fileName,
      file_path: filePath,
      file_type: file.type ?? undefined,
      file_size: file.size ?? undefined,
    });
  }

  return saved;
}


