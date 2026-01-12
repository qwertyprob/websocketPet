import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import FormReportDialog from "./report-form";

interface ReportDialogProps {
  buttonText?: string;
}

export default function ReportDialog({
  buttonText = "Report an Issue",
}: ReportDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-full bg-primary px-8 py-6 font-semibold text-lg text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl">
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <FormReportDialog />
      </DialogContent>
    </Dialog>
  );
}
