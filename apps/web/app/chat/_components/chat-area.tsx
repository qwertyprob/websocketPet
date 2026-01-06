// components/ChatArea.tsx
"use client";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatArea() {
  return (
    <div className="flex flex-1 flex-col px-4 py-8 md:px-8">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
        {/* Messages container */}
        <div className="mb-0 flex-1 rounded-t-lg border border-border border-b-0 bg-card p-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2 text-lg">Your chat component will go here</p>
            <p className="text-sm">
              Replace this section with your message display logic
            </p>
          </div>
        </div>

        {/* Input area */}
        <div className="flex gap-3 rounded-b-lg border border-border bg-card p-4">
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <Button className="gap-2 bg-accent hover:bg-accent/90" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
