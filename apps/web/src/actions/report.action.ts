"use server";

import z from "zod";
import {
  createReportAsync,
  getAllReportsAsync,
} from "@/services/report.service";
import type { ActionResult } from "@/types/action";
import type { ReportIssue } from "@/types/report";
import { FileSchemaAsync } from "./schemas/file.schema";
import { CreateReportSchema } from "./schemas/report.schema";

export async function fetchReports(): Promise<ReportIssue[]> {
  const reports = await getAllReportsAsync();
  return reports;
}

export async function postReport(formData: FormData): Promise<ActionResult> {
  try {
    const files = formData
      .getAll("files")
      .filter((f): f is File => f instanceof File);

    const parsedData = CreateReportSchema.parse({
      report: {
        title: formData.get("title"),
        description: formData.get("description") ?? undefined,
        status: 0,
      },
      files,
    });

    await createReportAsync(parsedData.report, files);

    return { success: true } as ActionResult;
  } catch (err) {
    if (err instanceof z.ZodError) {
      const flattened = err.flatten();
      const returnValue = {
        success: false,
        type: "validation",
        formErrors: flattened.formErrors,
        fieldErrors: flattened.fieldErrors,
      } as ActionResult;
      return returnValue;
    }

    return {
      success: false,
      type: "server",
      message: "Something went wrong",
    } as ActionResult;
  }
}

export const validateFileForForm = async (
  file?: File | null
): Promise<ActionResult> => {
  try {
    await FileSchemaAsync.parseAsync(file);
    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const flattened = err.flatten();

      const fieldErrors = flattened.fieldErrors as Record<string, string[]>;

      return {
        success: false,
        type: "validation",
        formErrors:
          flattened.formErrors.length > 0 ? flattened.formErrors : undefined,
        fieldErrors:
          Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
      };
    }

    return {
      success: false,
      type: "server",
      message: "Unknown error during file validation",
    };
  }
};
