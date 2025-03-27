"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Alert, Button, Input } from "@heroui/react";
import { InputFilePreview } from "@/components/ui/input-file-preview";
import {
  advertisementZodSchema,
  SaveCarouselDto as FormValues,
} from "@/schema/advertisement-schema";
import { getAdvertisement, saveCarousel } from "@/services/advertisement-service";
import { ADVERTISEMENT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { ENV_CLIENT } from "@/config";

export function CarouselAdvertisementForm() {
  const queryClient = getQueryClient();
  const { data } = useSuspenseQuery({ queryKey: [ADVERTISEMENT_KEY], queryFn: getAdvertisement });
  const advertisement = data.data;

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(advertisementZodSchema.saveCarouselBanner),
    values: {
      carouselBanner1: advertisement?.carouselBanner1 ?? undefined,
      carouselBanner2: advertisement?.carouselBanner2 ?? undefined,
      carouselBanner3: advertisement?.carouselBanner3 ?? undefined,
      carouselBanner4: advertisement?.carouselBanner4 ?? undefined,
      carouselBanner5: advertisement?.carouselBanner5 ?? undefined,
      carouselBanner1Url: advertisement?.carouselBanner1Url ?? "",
      carouselBanner2Url: advertisement?.carouselBanner2Url ?? "",
      carouselBanner3Url: advertisement?.carouselBanner3Url ?? "",
      carouselBanner4Url: advertisement?.carouselBanner4Url ?? "",
      carouselBanner5Url: advertisement?.carouselBanner5Url ?? "",
    },
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: saveCarousel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADVERTISEMENT_KEY] });
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    if (data.carouselBanner1 instanceof File || typeof data.carouselBanner1 === "string") {
      formData.append("carouselBanner1", data.carouselBanner1);
    }
    if (data.carouselBanner2 instanceof File || typeof data.carouselBanner2 === "string") {
      formData.append("carouselBanner2", data.carouselBanner2);
    }
    if (data.carouselBanner3 instanceof File || typeof data.carouselBanner3 === "string") {
      formData.append("carouselBanner3", data.carouselBanner3);
    }
    if (data.carouselBanner4 instanceof File || typeof data.carouselBanner4 === "string") {
      formData.append("carouselBanner4", data.carouselBanner4);
    }
    if (data.carouselBanner5 instanceof File || typeof data.carouselBanner5 === "string") {
      formData.append("carouselBanner5", data.carouselBanner5);
    }
    formData.append("carouselBanner1Url", data.carouselBanner1Url!);
    formData.append("carouselBanner2Url", data.carouselBanner2Url!);
    formData.append("carouselBanner3Url", data.carouselBanner3Url!);
    formData.append("carouselBanner4Url", data.carouselBanner4Url!);
    formData.append("carouselBanner5Url", data.carouselBanner5Url!);
    await mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 items-center gap-4 rounded-lg bg-content2 p-3 md:grid-cols-2">
          <Controller
            control={control}
            name="carouselBanner1"
            render={({ field, fieldState: { error } }) => (
              <InputFilePreview
                type="file"
                label="Banner 1"
                url={
                  field.value ? `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${field.value}` : undefined
                }
                fileValue={field.value}
                onFileChange={field.onChange}
                accept="image/*"
                description="Upload an image file (JPEG, PNG, Webp, SVG), Recommended: Rectangle size & SVG"
                error={error?.message}
                classNames={{ imgWrapper: "w-32" }}
              />
            )}
          />
          <Controller
            control={control}
            name="carouselBanner1Url"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Banner - 1 URL"
                placeholder="https://example.com"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-4 rounded-lg bg-content2 p-3 md:grid-cols-2">
          <Controller
            control={control}
            name="carouselBanner2"
            render={({ field, fieldState: { error } }) => (
              <InputFilePreview
                type="file"
                label="Banner 2"
                url={
                  field.value ? `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${field.value}` : undefined
                }
                fileValue={field.value}
                onFileChange={field.onChange}
                accept="image/*"
                description="Upload an image file (JPEG, PNG, Webp, SVG), Recommended: Rectangle size & SVG"
                error={error?.message}
                classNames={{ imgWrapper: "w-32" }}
              />
            )}
          />
          <Controller
            control={control}
            name="carouselBanner2Url"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Banner - 2 URL"
                placeholder="https://example.com"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-4 rounded-lg bg-content2 p-3 md:grid-cols-2">
          <Controller
            control={control}
            name="carouselBanner3"
            render={({ field, fieldState: { error } }) => (
              <InputFilePreview
                type="file"
                label="Banner 3"
                url={
                  field.value ? `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${field.value}` : undefined
                }
                fileValue={field.value}
                onFileChange={field.onChange}
                accept="image/*"
                description="Upload an image file (JPEG, PNG, Webp, SVG), Recommended: Rectangle size & SVG"
                error={error?.message}
                classNames={{ imgWrapper: "w-32" }}
              />
            )}
          />
          <Controller
            control={control}
            name="carouselBanner3Url"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Banner - 3 URL"
                placeholder="https://example.com"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-4 rounded-lg bg-content2 p-3 md:grid-cols-2">
          <Controller
            control={control}
            name="carouselBanner4"
            render={({ field, fieldState: { error } }) => (
              <InputFilePreview
                type="file"
                label="Banner 4"
                url={
                  field.value ? `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${field.value}` : undefined
                }
                fileValue={field.value}
                onFileChange={field.onChange}
                accept="image/*"
                description="Upload an image file (JPEG, PNG, Webp, SVG), Recommended: Rectangle size & SVG"
                error={error?.message}
                classNames={{ imgWrapper: "w-32" }}
              />
            )}
          />
          <Controller
            control={control}
            name="carouselBanner4Url"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Banner - 4 URL"
                placeholder="https://example.com"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-4 rounded-lg bg-content2 p-3 md:grid-cols-2">
          <Controller
            control={control}
            name="carouselBanner5"
            render={({ field, fieldState: { error } }) => (
              <InputFilePreview
                type="file"
                label="Banner 5"
                url={
                  field.value ? `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${field.value}` : undefined
                }
                fileValue={field.value}
                onFileChange={field.onChange}
                accept="image/*"
                description="Upload an image file (JPEG, PNG, Webp, SVG), Recommended: Rectangle size & SVG"
                error={error?.message}
                classNames={{ imgWrapper: "w-32" }}
              />
            )}
          />
          <Controller
            control={control}
            name="carouselBanner5Url"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Banner - 5 URL"
                placeholder="https://example.com"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
      </div>
      <Alert
        color="danger"
        title="Something went wrong"
        description={error?.message}
        isVisible={!!error}
        classNames={{ base: "mt-3" }}
      />
      <div className="mt-5">
        <Button
          type="submit"
          color="primary"
          isLoading={isPending}
          isDisabled={!formState.isValid || !formState.isDirty || isPending}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
