import { z } from "zod";

const create = z.object({
  title: z.string().min(3),
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
  streamUrls: z
    .array(z.string().url({ message: "Invalid URL" }))
    .min(1, { message: "At least one URL is required" }),
  sportChannels: z.array(z.string().uuid()).min(1),
});

const update = create.partial();

type CreateChannelDto = z.infer<typeof create>;
type UpdateChannelDto = z.infer<typeof update>;

export type { CreateChannelDto, UpdateChannelDto };

export const channelZodSchema = { create, update };
