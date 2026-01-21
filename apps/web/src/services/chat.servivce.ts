import {
  getChatFromReport,
  getMessagesFromChat,
} from "@/repositories/chat.repository";
import type { ChatDto } from "@/types/chat";
import { mapChatToDto } from "./mapper/chat.mapper";

//GET
export async function getChat(reportId: number): Promise<ChatDto | null> {
  const chat = await getChatFromReport(reportId);

  if (!chat) {
    return null;
  }

  const messages = (await getMessagesFromChat(chat.id)) ?? [];

  return mapChatToDto(chat, messages);
}
