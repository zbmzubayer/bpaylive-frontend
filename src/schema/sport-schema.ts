import { z } from "zod";

const create = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.instanceof(File, { message: "Icon is required" }).refine(
    (file) => {
      const acceptedImageTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/svg+xml",
      ]; // Add more if needed
      return acceptedImageTypes.includes(file.type);
    },
    {
      message: "Please upload a valid image file (JPG, JPEG, PNG, or SVG).",
    }
  ),
});

const update = create;

type CreateSportDto = z.infer<typeof create>;
type UpdateSportDto = z.infer<typeof update>;

export type { CreateSportDto, UpdateSportDto };

export const sportZodSchema = { create, update };
