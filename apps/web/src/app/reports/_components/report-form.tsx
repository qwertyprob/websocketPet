"use client";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { postReport, validateFileForForm } from "@/actions/report.action";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ActionResult } from "@/types/action";

interface FormReportDialogProps {
  closeDialog: () => void;
}
export default function FormReportDialog({
  closeDialog,
}: FormReportDialogProps) {
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  //submit button with sync validation
  const handleSubmit = async (formData: FormData) => {
    const res = await postReport(formData);

    if (res.success) {
      closeDialog();
      toast.success("Your report is successfully created!");
    } else {
      setErrors(res.fieldErrors ?? null);
    }
  };
  //for input title(clears)
  const validateField = (field: string, value: unknown) => {
    if (field === "title") {
      const text = String(value);

      if (text.length >= 5) {
        setErrors(null);
      }
    }
  };

  //async validation for files
  const [fileValidationResult, setFileValidationResult] =
    useState<ActionResult | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;

    const result = await validateFileForForm(selectedFile);
    setFileValidationResult(result);
  };

  const isSubmitDisabled =
    fileValidationResult?.success === false &&
    !!fileValidationResult.formErrors?.length;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await handleSubmit(formData);
      }}
    >
      <DialogHeader>
        <DialogTitle>Report an issue</DialogTitle>
        <DialogDescription asChild>
          <p className="mb-2 text-start text-neutral-600 text-sm">
            If you've encountered a bug or have a suggestion, we'd love to hear
            from you.
          </p>
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        {/* Title */}
        <div className="grid gap-3">
          <Label htmlFor="reportTitle">Report title</Label>
          <Input
            id="reportTitle"
            name="title"
            onChange={(e) => validateField("title", e.target.value)}
            placeholder="Type title here."
          />
          <AnimatePresence>
            {errors?.report?.[0] && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="my-2 flex items-center gap-2 rounded-md border border-red-500 bg-red-900/50 p-2 text-neutral-100 shadow-sm"
                exit={{ opacity: 0, y: -5 }}
                initial={{ opacity: 0, y: -5 }}
                key="title-error"
                transition={{ duration: 0.5 }}
              >
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span>{errors.report[0]}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Description */}
        <div className="grid gap-3">
          <Label htmlFor="reportDescription">Report description</Label>
          <Textarea
            className="h-30 resize-none"
            id="reportDescription"
            name="description"
            onChange={() => handleSubmit}
            placeholder="Type bug description here."
          />

          {/* Files */}
          <div className="mt-2">
            <Label htmlFor="reportFile">Attach file (optional)</Label>
            <input
              className="mt-1 block w-full py-2 text-gray-700 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-primary-foreground file:text-sm hover:file:bg-primary/90"
              id="reportFile"
              multiple
              name="files"
              onChange={handleFileChange}
              type="file"
            />
            <AnimatePresence>
              {fileValidationResult?.success === false &&
                fileValidationResult.formErrors?.map((msg, i) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="my-2 flex items-center gap-2 rounded-md border border-red-500 bg-red-900/50 p-2 text-neutral-100 shadow-sm"
                    exit={{ opacity: 0, y: -5 }}
                    initial={{ opacity: 0, y: -5 }}
                    // biome-ignore lint/suspicious/noArrayIndexKey: <noArrayIndexKey>
                    key={i}
                    transition={{ duration: 0.5 }}
                  >
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span>{msg}</span>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button disabled={isSubmitDisabled} type="submit">
          Submit
        </Button>
      </DialogFooter>
    </form>
  );
}
