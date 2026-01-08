import { AlertCircle } from "lucide-react";
import fetchReports from "@/actions/reports";
import BackButton from "@/components/dashboard/back-button";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { AdminReportDataTable } from "../_components/report-admin-datatable";

export default async function AdminReports() {
  const reports = await fetchReports();

  return (
    <DashboardLayout>
      {/* Header */}
      <DashboardHeader>
        <BackButton />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <AlertCircle
                  className="h-6 w-6 text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-pretty font-bold text-4xl md:text-5xl">
                Reports
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Review and manage all reported issues from users
            </p>
          </div>

          {/* Filter and actions */}
          {/* <div className="flex gap-3">
            <Button
              className="gap-2 whitespace-nowrap bg-transparent"
              size="lg"
              variant="outline"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button
              className="gap-2 whitespace-nowrap bg-transparent"
              size="lg"
              variant="outline"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </DashboardHeader>

      {/* Content area */}
      <div className="flex-1 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Placeholder for admin table */}
          <div className="rounded-lg border border-border bg-card p-8">
            <div className="text-center text-muted-foreground">
              <AdminReportDataTable data={reports} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
