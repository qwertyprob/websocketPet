import { IssueStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { type ReportIssue, ReportStatus } from "@/types/report";

//mapping from enum into type ReportStatus constant
const statusMap: Record<IssueStatus, ReportStatus> = {
  [IssueStatus.OPEN]: ReportStatus.OPEN,
  [IssueStatus.IN_PROGRESS]: ReportStatus.IN_PROGRESS,
  [IssueStatus.CLOSED]: ReportStatus.CLOSED,
};

export default async function getAllReportsAsync(): Promise<ReportIssue[]> {
  const reports = await prisma.issueReport.findMany({
    where: {
      status: {
        in: [IssueStatus.OPEN, IssueStatus.IN_PROGRESS],
      },
    },
  });

  return reports.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description ?? undefined,
    status: statusMap[r.status],
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}
