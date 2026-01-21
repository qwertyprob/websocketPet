import z from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1025; // 1gb
const ALLOWED_TYPES = ["image/png", "image/jpeg", "video/mp4"];

export const FileSchemaAsync = z
  .instanceof(File)
  .optional()
  .refine(
    async (file) => {
      if (!file) {
        return true; // optional
      }

      // любая асинхронная проверка
      await new Promise((r) => setTimeout(r, 10)); // пример async
      return file.size <= MAX_FILE_SIZE;
    },
    {
      message: "Each file must be under 5MB",
    }
  )
  .refine(
    (file) => {
      if (!file) {
        return true;
      }
      return ALLOWED_TYPES.includes(file.type);
    },
    {
      message: "Invalid file type. Allowed: png, jpg, mp4",
    }
  );

// Тип
export type FileValidation = z.infer<typeof FileSchemaAsync>;
