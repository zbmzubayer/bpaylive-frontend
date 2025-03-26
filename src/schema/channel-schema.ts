import { z } from "zod";

export const channelZodSchema = z.object({
  title: z.string().min(3),
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
  recommended: z.boolean().default(false),
  streamUrls: z.array(
    z.object({
      value: z.string().url().min(1),
    })
  ),
  sportChannels: z.array(z.string().uuid()).min(1),
});

export type ChannelDto = z.infer<typeof channelZodSchema>;
