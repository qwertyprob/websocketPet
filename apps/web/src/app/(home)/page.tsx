export const dynamic = "force-dynamic";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import ReportDialog from "@/app/reports/_components/report-dialog";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Grid background effect */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="rounded-lg bg-accent/10 p-4">
            <AlertCircle className="h-12 w-12 text-accent" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-pretty font-bold text-5xl md:text-6xl">
          Found an issue?
        </h1>

        {/* Subheading */}
        <p className="mb-12 text-pretty text-lg text-muted-foreground leading-relaxed md:text-xl">
          We're committed to providing the best experience. If you've
          encountered a bug or have a suggestion, we'd love to hear from you.
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex w-full flex-col gap-4 md:w-50">
          <ReportDialog />

          <Link href="/reports">
            <Button
              className="w-full rounded-full bg-transparent px-8 py-6 font-semibold text-lg"
              size="lg"
              variant="outline"
            >
              View My Reports
            </Button>
          </Link>
          <Link href="/admin/reports">
            <Button
              className="w-full rounded-full bg-transparent px-8 py-6 font-semibold text-lg"
              size="lg"
              variant="outline"
            >
              Admin reports
            </Button>
          </Link>
        </div>

        {/* Footer text */}
        <p className="mt-12 text-muted-foreground text-sm">
          Your feedback helps us build a better product
        </p>
      </div>
    </main>
  );
}
