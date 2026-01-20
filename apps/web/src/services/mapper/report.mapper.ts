import { type Attachment, type IssueReport, IssueStatus } from "@prisma/client";
import {
  type ReportAttachment,
  type ReportIssue,
  ReportStatus,
} from "@/types/report";

export interface IssueReportCreate {
  title: string;
  description: string | null;
  status: IssueStatus;
}

const statusMap: Record<IssueStatus, ReportStatus> = {
  [IssueStatus.OPEN]: ReportStatus.OPEN,
  [IssueStatus.IN_PROGRESS]: ReportStatus.IN_PROGRESS,
  [IssueStatus.CLOSED]: ReportStatus.CLOSED,
};

const statusReverseMap: Record<number, IssueStatus> = {
  0: IssueStatus.OPEN,
  1: IssueStatus.IN_PROGRESS,
  2: IssueStatus.CLOSED,
};

//Map from Entity to DTO
export function mapReportToDto(report: IssueReport): ReportIssue {
  return {
    id: report.id,
    title: report.title,
    description: report.description ?? undefined,
    status: statusMap[report.status],
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
  } as ReportIssue;
}
export function mapReportToDtoWithFiles(
  report: IssueReport,
  attachment: Attachment[]
): ReportIssue {
  return {
    id: report.id,
    title: report.title,
    description: report.description ?? undefined,
    status: statusMap[report.status],
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
    files: attachment.map((x) => mapReportFiles(x)),
  } as ReportIssue;
}
export function mapReportFiles(attachment: Attachment): ReportAttachment {
  return {
    id: attachment.id,
    file_name: attachment.file_name,
    file_path: attachment.file_path,
    file_size: attachment.file_size,
    file_type: attachment.file_type,
    reportId:attachment.reportId
    
  } as ReportAttachment;
}

export function mapReportToEntity(report: ReportIssue): Partial<IssueReport> {
  return {
    id: report.id,
    title: report.title,
    description: report.description ?? null,
    status: statusReverseMap[report.status],
  };
}

export function mapReportToCreateEntity(
  report: ReportIssue
): IssueReportCreate {
  return {
    title: report.title,
    description: report.description ?? null,
    status: statusReverseMap[report.status],
  };
}
