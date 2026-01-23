import type { BaseType } from "./baseType";
import type { UserRole } from "./chat";

export interface ChatMessageWS extends BaseType {
  chatId: number;
  message: string;
  senderId: number;
  senderRole: UserRole;
}
