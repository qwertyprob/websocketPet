import { type Chat, type ChatMessages, Role } from "@prisma/client";
import { type ChatDto, type MessageDto, UserRole } from "@/types/chat";

const roleMap: Record<Role, UserRole> = {
  [Role.ADMIN]: UserRole.ADMIN,
  [Role.USER]: UserRole.USER,
};

export function mapChatToDto(
  chatEntity: Chat,
  chatMessages: ChatMessages[]
): ChatDto {
  return {
    id: chatEntity.id,
    name: chatEntity.name,
    messages: chatMessages.map((x) => mapMessagesToDto(x)),
    reportId: chatEntity.reportId,
    createdAt: chatEntity.createdAt.toISOString(),
    updatedAt: chatEntity.updatedAt.toISOString(),
  } as ChatDto;
}

export function mapMessagesToDto(message: ChatMessages): MessageDto {
  return {
    id: message.id,
    message: message.message,
    senderRole: roleMap[message.sender_role],
    createdAt: message.createdAt.toISOString(),
    updatedAt: message.updatedAt.toISOString(),
  } as MessageDto;
}
