import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatCard() {
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
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {/* Sample message - user */}
        <div className="flex justify-end">
          <div className="max-w-xs rounded-lg border border-accent/30 bg-accent/20 px-4 py-2">
            <p className="text-foreground text-sm">
              Can you help me with this button issue?
            </p>
            <p className="mt-1 text-muted-foreground text-xs">10:30 AM</p>
          </div>
        </div>

        {/* Sample message - admin */}
        <div className="flex justify-start">
          <div className="max-w-xs rounded-lg border border-border bg-card px-4 py-2">
            <p className="text-muted-foreground text-sm">
              We are looking into this. Can you provide more details?
            </p>
            <p className="mt-1 text-muted-foreground text-xs">10:35 AM</p>
          </div>
        </div>

        {/* Placeholder for your chat component */}
        <div className="flex h-24 items-center justify-center text-muted-foreground">
          <p className="text-sm">Replace messages with your chat component</p>
        </div>
      </div>

      {/* Input area */}
      <div className="flex gap-3 border-border border-t p-4">
        <input
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
          placeholder="Type your message..."
          type="text"
        />
        <Button className="gap-2 bg-accent hover:bg-accent/90" size="sm">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
