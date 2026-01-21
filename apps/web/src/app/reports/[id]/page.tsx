import { MessageSquare } from "lucide-react";
import { fetchReportById } from "@/actions/report.action";
import ChatCard from "@/app/reports/_components/chat";
import BackButton from "@/components/dashboard/back-button";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import type { ReportIssue } from "@/types/report";
import ReportInfoCard from "../_components/report-info";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const report: ReportIssue = await fetchReportById(Number(resolvedParams.id));

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
            <ReportInfoCard report={report} />

            {/* Center - Chat area */}
            <ChatCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
