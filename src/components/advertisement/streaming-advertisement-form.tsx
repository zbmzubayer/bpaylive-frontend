"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  advertisementZodSchema,
  SaveStreamBannerDto as FormValues,
} from "@/schema/advertisement-schema";
import { InputFilePreview } from "@/components/ui/input-file-preview";
import { Alert, Button, Input } from "@heroui/react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getAdvertisement, saveStreamingBanner } from "@/services/advertisement-service";
import { ADVERTISEMENT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { ENV_CLIENT } from "@/config";

export function StreamingAdvertisementForm() {
  const queryClient = getQueryClient();
  const { data } = useSuspenseQuery({ queryKey: [ADVERTISEMENT_KEY], queryFn: getAdvertisement });
  const advertisement = data.data;

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(advertisementZodSchema.saveStreamBanner),
    values: {
      streamBanner: advertisement?.streamBanner ?? undefined,
      streamBannerUrl: advertisement?.streamBannerUrl ?? "",
    },
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: saveStreamingBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADVERTISEMENT_KEY] });
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    if (data.streamBanner instanceof File || typeof data.streamBanner === "string") {
      formData.append("streamBanner", data.streamBanner);
    }
    formData.append("streamBannerUrl", data.streamBannerUrl!);
    await mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="streamBanner"
          render={({ field, fieldState: { error } }) => (
            <InputFilePreview
              type="file"
              label="Stream Banner"
              url={field.value ? `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${field.value}` : undefined}
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
          name="streamBannerUrl"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Stream Banner URL"
              placeholder="https://example.com"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
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
