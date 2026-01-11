import { type IssueReport, IssueStatus } from "@prisma/client";
import { type ReportIssue, ReportStatus } from "@/types/report";


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

