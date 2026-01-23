"use client";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseMessageDate } from "@/lib/dateParser";
import { UserRole, type ChatDto } from "@/types/chat";
import { validateSendMessage } from "@/actions/chat.action";
import { useEffect, useRef, useState } from "react";

export default function AdminChatCard({ chat }: { chat: ChatDto }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chat.messages);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3001");

    ws.current.onopen = () => console.log("WebSocket connected");

    ws.current.onmessage = (event) => {
      try {
        const newMessage = JSON.parse(event.data);

        if (newMessage.chatId === chat.id) {
          setMessages((prev) => [...prev, newMessage]);
        }
      } catch (err) {
        console.warn("Не JSON сообщение:", event.data);
      }
    };

    ws.current.onclose = () => console.log("WebSocket closed");
    return () => {
      ws.current?.close();
      ws.current = null;
    };
  }, [chat.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }

    const formData = new FormData(e.currentTarget);
    await validateSendMessage(Number(chat.id), UserRole.ADMIN, formData);

    //ws
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          chatId: chat.id,
          message: message,
          senderRole: UserRole.ADMIN,
          createdAt: new Date().toISOString(),
        }),
      );
    } else {
      console.warn("WebSocket не готов");
    }

    setMessage("");
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card lg:col-span-2">
      {/* Chat header */}
      <div className="border-border border-b px-5 py-4">
        <p className="font-semibold text-sm">Admin Support Chat</p>
        <p className="text-muted-foreground text-xs">
          Conversation with support team
        </p>
      </div>

      {/* Messages area */}
      {/* Messages area */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              className={`flex ${msg.senderRole === 1 ? "justify-end" : "justify-start"}`}
              key={msg.id ?? `${msg.createdAt}-${Math.random()}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 ${
                  msg.senderRole === 1
                    ? "border border-accent/30 bg-accent/20 text-foreground" // админ подсвечен
                    : "border border-border bg-card text-muted-foreground" // юзер обычный
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="mt-1 text-muted-foreground text-xs">
                  {parseMessageDate(msg.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-24 items-center justify-center text-gray-400 italic">
            <p className="text-sm">No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 border-border border-t p-4">
          <input
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            type="text"
          />
          <Button className="gap-2 bg-accent hover:bg-accent/90" size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
