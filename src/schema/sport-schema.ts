import { z } from "zod";

export const sportZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.any().refine((file) => {
    if (file instanceof File) {
      const acceptedImageTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/svg+xml",
      ]; // Add more if needed
      return acceptedImageTypes.includes(file.type);
    } else if (typeof file === "string") {
      const acceptedImageTypes = ["jpg", "jpeg", "png", "webp", "svg"]; // Add more if needed
      const fileExtension = file.split(".").pop();
      return acceptedImageTypes.includes(fileExtension!);
    }
    return false;
  }, "Invalid file type"),
});

export type SportDto = z.infer<typeof sportZodSchema>;
