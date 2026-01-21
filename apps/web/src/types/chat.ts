import type { BaseType } from "./baseType";

export interface ChatDto extends BaseType {
  name: string;
  messages: MessageDto[];

  reportId: number;
}

export interface MessageDto extends BaseType {
  message: string;
  senderRole: UserRole;
}

export const UserRole = {
  USER: 0,
  ADMIN: 1,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
