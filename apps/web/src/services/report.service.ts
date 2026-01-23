import {
  createReport,
  deleteById,
  getAllOpen,
  getAttachmentById,
  getById,
} from "@/repositories/report.repository";
import type { ReportIssue } from "@/types/report";
import { checkIfFileExists, saveFilesAsync } from "./file.service";
import {
  mapReportToCreateEntity,
  mapReportToDto,
  mapReportToDtoWithFiles,
} from "./mapper/report.mapper";

//GET
export async function getAllReportsAsync(): Promise<ReportIssue[]> {
  const reports = await getAllOpen();

  //mapping
  const mappedReports: ReportIssue[] = reports.map((report) =>
    mapReportToDto(report)
  );

  return mappedReports;
}

export async function getReportByIdAsync(
  reportId: number
): Promise<ReportIssue> {
  const report = await getById(reportId);

  const attachment = await getAttachmentById(reportId);

  if (!report) {
    throw new Error("Report not found");
  }

  //mapping
  return mapReportToDtoWithFiles(report, attachment);
}

export async function deleteReportByIdAsync(
  reportId: number
): Promise<boolean> {
  const report = await getById(reportId);
  if (!report) {
    throw new Error("Report not found");
  }
  return await deleteById(reportId);
}

//CREATE
export async function createReportAsync(
  data: ReportIssue,
  files: File[]
): Promise<ReportIssue> {
  try {
    const filesMetaData = await saveFilesAsync(files);
    const mappedReport = mapReportToCreateEntity(data);

    //save in db
    const report = await createReport(mappedReport, filesMetaData);

    return mapReportToDto(report);
    // biome-ignore lint/suspicious/noExplicitAny: <cath service report>
  } catch (error: any) {
    // biome-ignore lint/complexity/noUselessCatch: <error>
    throw error;
  }
}

//deleted files from dir
async function _deleteFiles(report: ReportIssue) {
  const files = report.files ?? [];

  for (const file of files) {
    const exists = await checkIfFileExists(file.file_name);
    if (!exists) {
      if (report.id !== undefined) {
        await deleteReportByIdAsync(report.id);
      }
      break;
    }
  }
}
