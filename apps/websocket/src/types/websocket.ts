import type { BaseType } from "./baseType.js";

export interface ChatMessageWS extends BaseType {
  chatId: number;
  message: string;
  senderId: number;
  senderRole: UserRole;
}
export const UserRole = {
  USER: 0,
  ADMIN: 1,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
