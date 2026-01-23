import { type Chat, type ChatMessage, Role } from "@prisma/client";
import { type ChatDto, type MessageDto, UserRole } from "@/types/chat";

const roleMap: Record<Role, UserRole> = {
  [Role.ADMIN]: UserRole.ADMIN,
  [Role.USER]: UserRole.USER,
};
const roleReverseMap: Record<number, Role> = {
  0: Role.USER,
  1: Role.ADMIN,
};

export function mapChatToDto(
  chatEntity: Chat,
  chatMessages: ChatMessage[],
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

export function mapMessagesToDto(message: ChatMessage): MessageDto {
  return {
    id: message.id,
    message: message.message,
    senderRole: roleMap[message.sender_role],
    createdAt: message.createdAt.toISOString(),
    updatedAt: message.updatedAt.toISOString(),
  } as MessageDto;
}

export function mapMessagesToEntity(message: MessageDto): ChatMessage {
  return {
    message: message.message,
    sender_role: roleReverseMap[message.senderRole],
  } as ChatMessage;
}
