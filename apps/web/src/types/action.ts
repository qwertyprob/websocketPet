export type ActionResult =
  | { success: true }
  | {
      success: false;
      type: "validation" | "server";
      formErrors?: string[];
      fieldErrors?: Record<string, string[]>;
      message?: string;
    };
