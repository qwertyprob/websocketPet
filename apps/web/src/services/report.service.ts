import { IssueStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { type ReportIssue, ReportStatus } from "@/types/report";
import { saveFileOnDisk } from "./file.service";

//mapping from enum into type ReportStatus constant
const statusMap: Record<IssueStatus, ReportStatus> = {
  [IssueStatus.OPEN]: ReportStatus.OPEN,
  [IssueStatus.IN_PROGRESS]: ReportStatus.IN_PROGRESS,
  [IssueStatus.CLOSED]: ReportStatus.CLOSED,
};

//GET
export async function getAllReportsAsync(): Promise<ReportIssue[]> {
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

//POST
export async function createReportAsync(
  data: ReportIssue
): Promise<ReportIssue> {
  const savedFiles = data.files;

  //saving files in folder:uploads
  if (savedFiles) {
    await saveFileOnDisk(savedFiles);
  }

  try {
    const report = await prisma.issueReport.create({
      data: {
        title: data.title,
        description: data.description,
        attachments: savedFiles?.length ? { create: savedFiles } : undefined,
      },
      include: { attachments: true },
    });

    return {
      id: report.id,
      title: report.title,
      description: report.description ?? undefined,
      status: statusMap[report.status],
      files: savedFiles ? savedFiles : [],
    };
    // biome-ignore lint/suspicious/noExplicitAny: <cath service report>
  } catch (error: any) {
    throw new Error(error.message);
  }
}
