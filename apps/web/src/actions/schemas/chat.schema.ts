import { UserRole } from "@/types/chat";
import z, { number, string } from "zod";

export const CreateMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .refine((msg) => msg.trim() !== "", "Message cannot be just spaces"),
  senderRole: z.union([z.literal(0), z.literal(1)]),
});

export type CreateMessage = z.infer<typeof CreateMessageSchema>;
