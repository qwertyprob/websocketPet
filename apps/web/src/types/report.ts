import type { BaseType } from "./baseType";

export interface ReportIssue extends BaseType {
  title: string;
  description?: string;
  status: ReportStatus;
  files?: ReportAttachment[];
}

export interface ReportAttachment extends BaseType {
  file_name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
}

export const ReportStatus = {
  OPEN: 0,
  IN_PROGRESS: 1,
  CLOSED: 2,
} as const;

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];
