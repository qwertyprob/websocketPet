"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  File,
  MessageSquare,
  Send,
} from "lucide-react";
import BackButton from "@/components/dashboard/back-button";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";

export default function ReportDetail({ params }: { params: { id: string } }) {
  // Mock data - replace with actual data fetching
  const report = {
    id: params.id,
    title: "Button component not responding to clicks",
    description:
      "The primary button in the navigation bar is not responding to click events. This happens consistently on both desktop and mobile browsers.",
    status: "open",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
    files: [
      { id: 1, name: "screenshot-error.png", size: "1.2 MB", type: "image" },
      { id: 2, name: "console-logs.txt", size: "45 KB", type: "text" },
      { id: 3, name: "video-reproduction.mp4", size: "15 MB", type: "video" },
    ],
  };

  const statusConfig = {
    open: { label: "Open", icon: AlertCircle, color: "text-orange-500" },
    "in-progress": {
      label: "In Progress",
      icon: Clock,
      color: "text-blue-500",
    },
    resolved: {
      label: "Resolved",
      icon: CheckCircle2,
      color: "text-green-500",
    },
  };

  const config = statusConfig[report.status as keyof typeof statusConfig];
  const StatusIcon = config.icon;

  return (
    <DashboardLayout>
      <DashboardHeader>
        <BackButton />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <MessageSquare
                  className="h-5 w-6 text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-pretty font-bold text-4xl md:text-5xl">
                Support Chat
              </h1>
            </div>
          </div>
        </div>
      </DashboardHeader>
      <div className="flex-1 px-4 py-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left sidebar - Report info */}
            <div className="space-y-4 overflow-y-auto lg:col-span-1">
              {/* Title and status card */}
              <div className="rounded-lg border border-border bg-card p-5">
                <h1 className="mb-4 text-pretty font-bold text-2xl">
                  <span className="text-pretty font-bold text-2xl text-red-900">
                    Title:{" "}
                  </span>
                  {report.title}
                </h1>

                <div className="space-y-3">
                  <div>
                    <p className="mb-2 text-muted-foreground text-xs">STATUS</p>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`h-5 w-5 ${config.color}`} />
                      <span className={`font-medium text-sm ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>

                  <div className="border-border border-t pt-3">
                    <p className="mb-1 text-muted-foreground text-xs">
                      CREATED
                    </p>
                    <p className="text-sm">{report.createdAt}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-muted-foreground text-xs">
                      UPDATED
                    </p>
                    <p className="text-sm">{report.updatedAt}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="mb-3 font-semibold text-muted-foreground text-xs">
                  DESCRIPTION
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* Files */}
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="mb-3 font-semibold text-muted-foreground text-xs">
                  ATTACHMENTS ({report.files.length})
                </p>
                <div className="space-y-2">
                  {report.files.map((file) => (
                    <div
                      className="group flex items-center justify-between rounded border border-border/50 bg-background/50 p-2 transition-colors hover:border-accent/50"
                      key={file.id}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <div className="flex-shrink-0 rounded bg-accent/10 p-1.5">
                          <File
                            className="h-4 w-4 text-accent"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-xs">
                            {file.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {file.size}
                          </p>
                        </div>
                      </div>
                      <Button className="ml-1 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                        <Download className="h-3 w-3 text-accent" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Chat area */}
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
                    <p className="mt-1 text-muted-foreground text-xs">
                      10:30 AM
                    </p>
                  </div>
                </div>

                {/* Sample message - admin */}
                <div className="flex justify-start">
                  <div className="max-w-xs rounded-lg border border-border bg-card px-4 py-2">
                    <p className="text-muted-foreground text-sm">
                      We are looking into this. Can you provide more details?
                    </p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      10:35 AM
                    </p>
                  </div>
                </div>

                {/* Placeholder for your chat component */}
                <div className="flex h-24 items-center justify-center text-muted-foreground">
                  <p className="text-sm">
                    Replace messages with your chat component
                  </p>
                </div>
              </div>

              {/* Input area */}
              <div className="flex gap-3 border-border border-t p-4">
                <input
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Type your message..."
                  type="text"
                />
                <Button
                  className="gap-2 bg-accent hover:bg-accent/90"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
