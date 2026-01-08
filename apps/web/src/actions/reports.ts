"use server";

// import { z } from "zod";
// import { ReportStatus } from "@/types/report";

import getAllReportsAsync from "@/services/report.service";
import type { ReportIssue } from "@/types/report";

// const FormSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   description: z.string().optional(),
//   status: z.union([
//     z.literal(ReportStatus.OPEN),
//     z.literal(ReportStatus.IN_PROGRESS),
//     z.literal(ReportStatus.CLOSED),
//   ]),
//   createdAt: z.string(),
// });

// const CreateReport = FormSchema.omit({ id: true, createdAt: true });

export default async function fetchReports(): Promise<ReportIssue[]> {
  const reports = await getAllReportsAsync();

  return reports;
}
