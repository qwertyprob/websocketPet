import {
  createMessage,
  getChatFromReport,
  getMessagesFromChat,
} from "@/repositories/chat.repository";
import type { ChatDto, MessageDto } from "@/types/chat";
import {
  mapChatToDto,
  mapMessagesToDto,
  mapMessagesToEntity,
} from "./mapper/chat.mapper";

//GET
export async function getChat(reportId: number): Promise<ChatDto> {
  const chat = await getChatFromReport(reportId);

  if (!chat) {
    throw new Error("Chat not found!");
  }

  const messages = (await getMessagesFromChat(chat.id)) ?? [];

  return mapChatToDto(chat, messages);
}

//POST
export async function sendMessage(
  chatId: number,
  data: MessageDto,
): Promise<MessageDto> {
  if (!data.message.trim()) {
    throw new Error("Message cannot be empty");
  }

  const mappedChatMessage = mapMessagesToEntity(data);
  //save in db
  const message = await createMessage(chatId, mappedChatMessage);

  return mapMessagesToDto(message);
}
