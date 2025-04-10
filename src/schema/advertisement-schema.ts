import { string, z } from "zod";

const fileSchema = z.any().refine((file) => {
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
}, "Invalid file type");

// Carousel
const saveCarouselBanner = z.object({
  carouselBanner1: fileSchema.optional(),
  carouselBanner2: fileSchema.optional(),
  carouselBanner3: fileSchema.optional(),
  carouselBanner4: fileSchema.optional(),
  carouselBanner5: fileSchema.optional(),
  carouselBanner1Url: string().trim().optional(),
  carouselBanner2Url: string().trim().optional(),
  carouselBanner3Url: string().trim().optional(),
  carouselBanner4Url: string().trim().optional(),
  carouselBanner5Url: string().trim().optional(),
});

// Popup Banner
const savePopupBanner = z.object({
  popupBanner: fileSchema.optional(),
  popupBannerUrl: string().trim().optional(),
});

// Stream Banner
const saveStreamBanner = z.object({
  streamBanner: fileSchema.optional(),
  streamBannerUrl: string().trim().optional(),
});

type SaveCarouselDto = z.infer<typeof saveCarouselBanner>;
type SavePopupBannerDto = z.infer<typeof savePopupBanner>;
type SaveStreamBannerDto = z.infer<typeof saveStreamBanner>;

export type { SaveCarouselDto, SavePopupBannerDto, SaveStreamBannerDto };

export const advertisementZodSchema = {
  saveCarouselBanner,
  savePopupBanner,
  saveStreamBanner,
};
