import { AlertCircle, CheckCircle2, Clock, Download, File } from "lucide-react";
import { parseDateTime } from "@/lib/dateParser";
import { normalizeSize } from "@/lib/fileHelper";
import type { ReportIssue } from "@/types/report";

export default function ReportInfoCard({ report }: { report: ReportIssue }) {
  const statusConfig = {
    0: { label: "Open", icon: AlertCircle, color: "text-orange-500" },
    open: {
      label: "Open",
      icon: Clock,
      color: "text-blue-500",
    },
    1: {
      label: "In progress",
      icon: CheckCircle2,
      color: "text-orange-500",
    },
    2: {
      label: "Resolved",
      icon: CheckCircle2,
      color: "text-green-500",
    },
  };

  const config = statusConfig[report.status as keyof typeof statusConfig];
  const StatusIcon = config.icon;
  return (
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
            <p className="mb-1 text-muted-foreground text-xs">CREATED</p>
            <p className="text-sm">
              {" "}
              {report.createdAt ? parseDateTime(report.createdAt) : "-"}
            </p>
          </div>

          <div>
            <p className="mb-1 text-muted-foreground text-xs">UPDATED</p>
            <p className="text-sm">
              {report.updatedAt ? parseDateTime(report.updatedAt) : "-"}
            </p>
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
          ATTACHMENTS ({report.files?.length})
        </p>
        <div className="space-y-2">
          {report.files?.map((file) => (
            <div
              className="group flex items-center justify-between rounded border border-border/50 bg-background/50 p-2 transition-colors hover:border-accent/50"
              key={file.id}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="shrink-0 rounded bg-accent/10 p-1.5">
                  <File className="h-4 w-4 text-accent" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-xs">
                    {file.file_name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {normalizeSize(file.file_size ?? 0)} MB
                  </p>
                </div>
              </div>

              {/* Кнопка скачивания */}
              <a
                className="ml-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" // путь к файлу
                download={file.file_name} // имя при сохранении
                href={file.file_path}
              >
                <Download className="h-3 w-3 text-accent" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
