"use client";

import { FileText } from "lucide-react";
import BackButton from "@/components/dashboard/back-button";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";

export default function ReportError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <DashboardLayout>
      <DashboardHeader>
        <BackButton />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-destructive/10 p-2">
                <FileText
                  className="h-6 w-6 text-destructive"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-pretty font-bold text-4xl md:text-5xl">
                Something went wrong
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              An error occurred while loading this page.
            </p>
          </div>
        </div>
      </DashboardHeader>

      <div className="flex-1 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-6 rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              {error.message || "Unexpected error"}
            </p>

            <div className="flex justify-center gap-4">
              <Button onClick={() => reset()}>Try again</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
