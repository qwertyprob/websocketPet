import z from "zod";

export const CreateReportSchema = z.object({
  report: z.object({
    title: z.string().min(5),
    description: z.string().optional(),
    status: z.literal(0),
  }),
});

export type CreateReport = z.infer<typeof CreateReportSchema>;
