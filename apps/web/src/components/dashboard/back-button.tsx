"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="mb-6 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      onClick={() => router.back()}
      type="button"
    >
      <ChevronLeft className="h-5 w-5" />
      Back
    </button>
  );
}
