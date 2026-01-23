import type { BaseType } from "./baseType.js";
export interface ChatMessageWS extends BaseType {
    chatId: number;
    message: string;
    senderId: number;
    senderRole: UserRole;
}
export declare const UserRole: {
    readonly USER: 0;
    readonly ADMIN: 1;
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
//# sourceMappingURL=websocket.d.ts.map