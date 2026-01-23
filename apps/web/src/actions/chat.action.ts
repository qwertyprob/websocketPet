"use server";
import z from "zod";
import { getChat, sendMessage } from "@/services/chat.servivce";
import type { ActionResult } from "@/types/action";
import type { ChatDto } from "@/types/chat";
import { CreateMessageSchema } from "./schemas/chat.schema";

export async function fetchChat(reportId: number): Promise<ChatDto> {
  return await getChat(reportId);
}

export async function validateSendMessage(
  chatId: number,
  sender: number,
  formData: FormData
): Promise<ActionResult> {
  try {
    const message = formData.get("message");

    if (!message || typeof message !== "string" || message.trim() === "") {
      throw new Error("Message cannot be empty");
    }

    const parsedData = CreateMessageSchema.parse({
      message: formData.get("message"),
      senderRole: sender,
    });
    await sendMessage(chatId, parsedData);

    return { success: true } as ActionResult;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const flattened = error.flatten();
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
