import type { Attachment } from "@prisma/client";
import type { ReportAttachment } from "@/types/report";

//to Dto
export function mapFileToDto(file: Attachment): ReportAttachment {
  return {
    id: file.id,
    file_name: file.file_name,
    file_size: file.file_size ?? null,
    file_path: file.file_path,
    file_type: file.file_type ?? null,
    reportId: file.reportId,
    createdAt: file.createdAt.toISOString(),
    updatedAt: file.updatedAt.toISOString(),
  } as ReportAttachment;
}

export function mapFileToEntity(file: ReportAttachment): Attachment {
  return {
    id: file.id,
    file_name: file.file_name,
    file_path: file.file_path,
    file_type: file.file_type ?? null,
    file_size: file.file_size ?? null,
    reportId: file.reportId,
  } as Attachment;
}
