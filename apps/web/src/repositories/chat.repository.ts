import type { Chat, ChatMessage } from "@prisma/client";
import { prisma } from "@/lib/prisma";
//GET
export async function getChatFromReport(
  reportId: number,
): Promise<Chat | null> {
  return await prisma.chat.findFirst({
    where: {
      reportId,
    },
    include: {
      messages: true,
    },
  });
}
export async function getMessagesFromChat(
  chatId: number,
): Promise<ChatMessage[] | null> {
  return await prisma.chatMessage.findMany({
    where: {
      chat_id: chatId,
    },
  });
}
//POST
export async function createMessage(
  chatId: number,
  data: ChatMessage,
): Promise<ChatMessage> {
  const chatMessage = await prisma.chatMessage.create({
    data: {
      message: data.message,
      sender_role: data.sender_role,
      chat_id: chatId,
    },
  });

  return chatMessage;
}
