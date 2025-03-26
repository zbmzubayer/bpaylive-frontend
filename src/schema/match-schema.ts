import { z } from "zod";

const create = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().max(200).optional(),
  url: z.string().min(1, "URL is required"),
  thumbnail: z.any().refine((file) => {
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
  startTime: z.coerce.date(),
  trending: z.boolean().transform((val) => val ?? false),
  // tags: z.array(z.string().min(1, "At least one tag is required")),
  // hasFakeViews: z.boolean().default(false),
  // viewInterval: z.number().min(1).optional(),
  // minViews: z.number().min(1).optional(),
  // maxViews: z.number().min(1).optional(),
  sportId: z.string().uuid(),
  defaultChannelId: z.string().uuid(),
  channelMatches: z.array(z.string().uuid()).optional(),
});

const update = create.partial();

type CreateMatchDto = z.infer<typeof create>;
type UpdateMatchDto = z.infer<typeof update>;

export type { CreateMatchDto, UpdateMatchDto };

export const matchZodSchema = { create, update };
