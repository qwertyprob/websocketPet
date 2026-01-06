"use client";
import { MessageSquare } from "lucide-react";
import BackButton from "@/components/dashboard/back-button";
import ChatArea from "@/components/dashboard/chat-area";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default function SupportChat() {
  return (
    <DashboardLayout>
      <DashboardHeader>
        <BackButton />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <MessageSquare
                  className="h-6 w-6 text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-pretty font-bold text-4xl md:text-5xl">
                Support Chat
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Get help from our support team in real time
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground text-sm">
              Support online
            </span>
          </div>
        </div>
      </DashboardHeader>

      {/* Chat content */}
      <ChatArea />
    </DashboardLayout>
  );
}
