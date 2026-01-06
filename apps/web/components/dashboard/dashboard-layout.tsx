
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Grid background effect */}
      <div className="linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px), bg-size-[40px_40px] opacity-20" />

      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </main>
  );
}
