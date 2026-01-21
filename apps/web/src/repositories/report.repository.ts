import { type Attachment, type IssueReport, IssueStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { IssueReportCreate } from "@/services/mapper/report.mapper";
import type { ReportAttachment } from "@/types/report";

//GET
export async function getAllOpen(): Promise<IssueReport[]> {
  return await prisma.issueReport.findMany({
    where: {
      status: {
        in: [IssueStatus.OPEN, IssueStatus.IN_PROGRESS],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getById(reportId: number): Promise<IssueReport | null> {
  return await prisma.issueReport.findFirst({
    where: {
      id: reportId,
    },
  });
}
export async function getAttachmentById(
  reportId: number
): Promise<Attachment[]> {
  return await prisma.attachment.findMany({
    where: {
      reportId,
    },
  });
}
//DELETE
export async function deleteById(reportId: number): Promise<boolean> {
  await prisma.issueReport.delete({
    where: {
      id: reportId,
    },
  });
  return true;
}

//CREATE
export async function createReport(
  data: IssueReportCreate,
  filesMetaData: ReportAttachment[]
) {
  const report = await prisma.issueReport.create({
    data: {
      ...data,
      attachments: {
        create: filesMetaData,
      },
      chat: {
        create: {
          name: data.title,
        },
      },
    },
    include: {
      attachments: true,
      chat: {
        include: {
          messages: true,
        },
      },
    },
  });

  return report;
}
