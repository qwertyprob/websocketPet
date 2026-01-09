"use server";

import { z } from "zod";
import {
  createReportAsync,
  getAllReportsAsync,
} from "@/services/report.service";
import {
  type ReportAttachment,
  type ReportIssue,
  ReportStatus,
} from "@/types/report";

const FormSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  status: z.union([
    z.literal(0),
    z.literal(ReportStatus.OPEN),
    z.literal(ReportStatus.IN_PROGRESS),
    z.literal(ReportStatus.CLOSED),
  ]),
  files: z
    .array(
      z.object({
        file_name: z.string(),
        file_path: z.string(),
        file_type: z.string().optional(),
        file_size: z.number().optional(),
      })
    )
    .optional(),
});

const CreateReport = FormSchema.omit({ id: true });

export async function fetchReports(): Promise<ReportIssue[]> {
  const reports = await getAllReportsAsync();
  return reports;
}

export async function postReport(formData: FormData) {
  const parsedData = await CreateReport.parseAsync({
    title: formData.get("title"),
    description: formData.get("description") ?? undefined,
    status: 0,
  });
  const { title, description, status } = parsedData;

  //files
  const filesRaw = formData.getAll("files") as File[];
  const files: ReportAttachment[] = filesRaw.map((f) => ({
    file_name: f.name,
    file_path: " ",
    file_type: f.type,
    file_size: f.size,
  }));

  const report: ReportIssue = { title, description, status, files };

  await createReportAsync(report);
}
