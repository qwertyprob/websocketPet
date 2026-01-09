// components/report-dialog.tsx
"use client";
import { postReport } from "@/actions/reports";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

      <DialogContent className="sm:max-w-[425px]">
        <form action={postReport}>
          <DialogHeader>
            <DialogTitle>Report an issue</DialogTitle>
            <DialogDescription>
              If you've encountered a bug or have a suggestion, we'd love to
              hear from you.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="reportTitle">Report title</Label>
              <Input
                id="reportTitle"
                name="title"
                placeholder="Type title here."
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="reportDescription">Report description</Label>
              <Textarea
                className="h-30 resize-none"
                id="reportDescription"
                name="description"
                placeholder="Type bug description here."
              />
              <div className="mt-2">
                <Label htmlFor="reportFile">Attach file (optional)</Label>
                <input
                  className="mt-1 block w-full py-2 text-gray-700 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-primary-foreground file:text-sm hover:file:bg-primary/90"
                  id="reportFile"
                  multiple
                  name="files"
                  type="file"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
