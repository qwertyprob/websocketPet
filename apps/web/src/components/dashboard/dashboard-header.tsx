import type { ReactNode } from "react";

interface DashboardHeaderProps {
  children: ReactNode;
}

export default function DashboardHeader({ children }: DashboardHeaderProps) {
  return (
    <div className="border-border border-b px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}
