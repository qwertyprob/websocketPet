//GET
import type { Chat, ChatMessages } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getChatFromReport(
  reportId: number
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
  chatId: number
): Promise<ChatMessages[] | null> {
  return await prisma.chatMessages.findMany({
    where: {
      chat_id: chatId,
    },
  });
}
